# Ohmic Runner Wrapper Cycle For JSON Agent Loop

Date: 2026-03-15
Status: working contract

## Purpose

Define the external wrapper cycle that invokes the agent against the live JSON
mailbox/state model.

This is the first implementation-facing packet for a future UI or runner.

## Core Rule

The wrapper owns the loop.

The agent does not self-wake forever.

So the wrapper is responsible for:

- reading current live state
- deciding when to invoke
- passing the current context in
- receiving the updated response/state
- deciding whether to continue, back off, sleep, or stop

## Inputs

Recommended live inputs:

- `agent_state.json`
- `agent_inbox.jsonl`
- `agent_outbox.jsonl`
- `agent_locks.json`
- `agent_runtime.json`
- repo-backed queue and claim files

## Outputs

The wrapper should refresh or write:

- `agent_state.json`
- `agent_outbox.jsonl`
- `agent_locks.json`
- `agent_runtime.json`

It may also regenerate:

- `ready_tasks.json`
- `active_claims.json`

## Wrapper Cycle

Recommended cycle:

1. load current repo-backed queue and claim truth
2. load current JSON files
3. validate or repair obvious stale runtime state
4. determine current actionable inbox head
5. determine whether an orchestrator lease exists
6. decide whether to invoke in `orchestrate`, `perform`, `mixed`, or `idle`
   mode
7. invoke the agent with current state and input summary
8. collect updated response/state output
9. persist updated JSON surfaces
10. re-check queue floor, stale leases, and pending events
11. decide:
    - continue immediately
    - continue after short backoff
    - sleep
    - stop

## Wrapper Responsibilities

The wrapper should own:

- wake/sleep timing
- invocation cadence
- input event pickup
- stale lease detection
- idle counter/backoff
- crash restart behavior
- environment-specific launching details

## Agent Responsibilities

The agent should own:

- interpreting the designated current input
- deciding what to do next
- performing work or orchestration
- updating response/state content
- feeding new work back into the queue when needed

## Invocation Decision Logic

Recommended decision order:

1. if a stop event exists:
   - stop
2. else if a pause event exists:
   - sleep and wait
3. else if no valid orchestrator exists and board health is thin or stale:
   - invoke in `orchestrate` or `mixed`
4. else if a high-priority ready task is open and unclaimed:
   - invoke in `perform`
5. else if stable idle is not yet confirmed:
   - invoke or recheck after backoff
6. else:
   - sleep or stop by wrapper policy

## Minimal Pseudocode

```text
loop:
  load repo truth
  load json state
  reconcile stale leases
  inbox_head = oldest unhandled actionable event
  mode = choose_mode(repo_truth, json_state, inbox_head)
  if mode == stop:
    write outbox status
    exit
  if mode == sleep:
    sleep(backoff)
    continue
  invoke agent(mode, repo_truth, json_state, inbox_head)
  persist updated state/output
  if stable_idle_confirmed:
    sleep_or_stop_by_policy
  else:
    continue
```

## Continue Vs Backoff Vs Sleep

### Continue immediately

Use when:

- new input arrived
- queue changed
- a task just completed and follow-on work must be staged
- stale claims or stale leases need immediate cleanup

### Back off briefly

Use when:

- no new work is visible yet
- but stable idle has not been confirmed

### Sleep

Use when:

- stable idle is confirmed
- and wrapper policy says long-running watch mode

### Stop

Use when:

- wrapper policy is one-shot
- explicit stop requested
- fatal unrecoverable environment issue

## Crash Recovery In Wrapper Terms

After restart, the wrapper should:

1. reload all JSON files
2. reload queue and claims
3. mark stale leases
4. rebuild the live `agent_state.json` summary
5. resume from the oldest unhandled actionable inbox event
6. if no actionable event exists, run one audit cycle before declaring idle

## Minimum Runtime Fields The Wrapper Needs

The wrapper should track at least:

- `last_cycle_started_at`
- `last_cycle_finished_at`
- `idle_counter`
- `last_sleep_seconds`
- `last_mode`
- `last_error`

These can live in `agent_runtime.json`.

## Guardrails

- do not let the wrapper overwrite append-only event history
- do not let wrapper convenience replace repo-backed truth
- do not let the wrapper skip queue/claim inspection
- do not assume “no chat output” means no work remains

## Follow-On Dependencies

This cycle definition should feed:

- `define-agent-runtime-json-contract`
- `define-json-dashboard-render-surface`
- `define-json-dashboard-input-writeback-flow`
