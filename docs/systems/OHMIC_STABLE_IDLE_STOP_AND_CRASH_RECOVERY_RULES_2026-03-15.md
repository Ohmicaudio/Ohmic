# Ohmic Stable Idle Stop And Crash Recovery Rules

Date: 2026-03-15
Status: working contract

## Purpose

Define when the live JSON loop should keep running, sleep, or stop, and how it
should recover after interruption without losing work.

## Core Principle

Do not stop just because the queue looks quiet for one instant.

Stop or sleep only after a stable idle state is confirmed.

## Stable Idle Definition

Treat the system as stably idle only when all of the following are true:

- no pending inbox event exists
- no mandatory unclaimed task exists
- no queue-floor replenishment debt exists
- no expired orchestrator or worker lease exists
- no stale generated state or obvious queue drift exists
- no immediate verification debt remains on just-completed work
- no pending worker audit is due

If any of those fail, the system is not truly idle.

## Temporary Quiet Vs Stable Idle

### Temporary quiet

Examples:

- queue is briefly empty while another agent is closing a task
- no current inbox message is visible, but stale claims still exist
- the board has dropped under the floor and needs replenishment
- the runner just completed a task and has not audited follow-ons yet

Action:

- keep looping
- audit
- replenish
- re-check

### Stable idle

Examples:

- inbox empty
- queue healthy or honestly exhausted
- leases healthy or absent
- no underfoot task completions still waiting to be reflected

Action:

- increment idle counter
- back off
- sleep or stop only after the idle threshold is reached

## Recommended Idle Counter Model

Use a small backoff ladder instead of a hot spin.

Recommended pattern:

1. first clear cycle:
   - wait `5` seconds
2. second clear cycle:
   - wait `15` seconds
3. third clear cycle:
   - wait `30` seconds
4. later clear cycles:
   - wait `60` seconds max

Reset the idle counter immediately when any real work appears.

## Recommended Stop Rule

Stop only when:

- stable idle has held through multiple backoff windows
- and the wrapper policy allows exit instead of sleep

Recommended default:

- sleep after stable idle
- stop only on explicit wrapper policy or shutdown request

## Explicit Stop Events

The loop may stop immediately when:

- a `pause` or `stop` control event requests it
- wrapper policy says one-shot execution only
- a fatal unrecoverable environment failure prevents progress

Even then:

- write an outbox status before exiting when possible

## Crash Recovery Inputs

Recovery should use:

- `agent_inbox.jsonl`
- `agent_outbox.jsonl`
- `agent_locks.json`
- `agent_state.json`
- repo-backed queue and claim files

Do not rely on any one JSON file alone.

## Crash Recovery Sequence

Recommended sequence after restart:

1. reload repo-backed queue and claims
2. reload `agent_locks.json`
3. mark clearly expired leases as stale candidates
4. inspect inbox for oldest unhandled actionable event
5. inspect outbox for the latest emitted status/result
6. rebuild `agent_state.json` summary from current truth
7. resume from the oldest still-actionable unhandled event

## Stale Lease Cleanup Rule

Expired orchestrator or worker leases should not be silently trusted.

Recommended rule:

- if `expires_at` is past and `heartbeat_at` is stale, mark the lease stale
- do not immediately delete it without recording why
- allow takeover only after queue and claim reality are rechecked

## Queue Floor Recovery Rule

If the queue drops under the minimum floor during recovery:

- do not declare idle
- replenish from the just-finished subsystem or current horizon
- then continue normal loop evaluation

## Verification Debt Rule

If a task was just completed but:

- verification has not been recorded
- or queue state has not been updated

then the loop is not idle.

It still has closeout debt.

## Example Runtime States

### Continue working

```json
{
  "idle_state": "active",
  "idle_counter": 0,
  "reason": "pending inbox event and unclaimed mandatory task"
}
```

### Backoff but stay alive

```json
{
  "idle_state": "candidate_idle",
  "idle_counter": 2,
  "next_wake_in_seconds": 15,
  "reason": "no pending work after full audit cycle"
}
```

### Safe sleep

```json
{
  "idle_state": "stable_idle",
  "idle_counter": 4,
  "next_wake_in_seconds": 60,
  "reason": "stable idle confirmed across repeated checks"
}
```

## Guardrails

- do not confuse “no ready tasks” with “nothing to do”
- do not stop while stale leases or stale queue state still exist
- do not spin forever at full speed when the system is quiet
- do not lose inbox intent because of one mutable state packet

## Follow-On Dependencies

This rule set should feed:

- `define-runner-wrapper-cycle-for-json-agent-loop`
- `define-agent-runtime-json-contract`
- `define-json-dashboard-input-writeback-flow`
