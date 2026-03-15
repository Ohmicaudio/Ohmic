# Ohmic Dashboard Empty And No-Work State

Date: 2026-03-15
Status: working contract

## Purpose

Define how the dashboard should look and speak when there is no pending input
and the loop is in a stable idle or no-work state.

The main goal is to avoid the false message:

- "everything is done forever"

## Core Principle

An empty-looking board is not automatically a finished system.

The dashboard should only show a true no-work state when:

- input is not pending
- active work is not present
- ready work is not present
- freshness is trustworthy enough to say so

If any of those are uncertain, the dashboard should show a softer
waiting/rechecking state instead of a triumphant empty state.

## Two Distinct States

Use two lightweight display states:

1. `stable_idle`
2. `temporarily_clear`

Do not use a single generic "all done" message.

## `stable_idle`

Meaning:

- the loop has passed the stable-idle checks
- no pending input exists
- no ready tasks exist
- no active claims exist
- freshness is good enough to trust the summary

Primary inputs:

- `agent_runtime.json.idle.idle_state`
- `agent_state.json.input.pending`
- `agent_state.json.state.ready_count`
- `agent_state.json.state.active_claim_count`
- dashboard stale-state indicator result

Show:

- calm no-work message
- reassurance that the loop is idle for now
- optional next check or wake hint if available

Recommended copy:

- `No work queued right now.`
- `The loop is idle and waiting for new input.`

Optional supporting line:

- `The system will wake again if new work appears.`

## `temporarily_clear`

Meaning:

- the board looks quiet, but the system is still confirming that nothing new is
  pending
- or freshness is not strong enough to claim a true no-work state

Show:

- soft waiting/recheck message
- avoid absolute wording

Recommended copy:

- `No immediate work is visible.`
- `The dashboard is rechecking for fresh work.`

Use this state when:

- freshness is `reconciling`
- freshness is `stale`
- freshness is `unknown`
- idle state is only `candidate_idle`

## When Not To Show Empty State

Do not show the empty/no-work treatment when any of these are true:

- `agent_state.json.input.pending = true`
- `agent_state.json.state.ready_count > 0`
- `agent_state.json.state.active_claim_count > 0`
- blockers or risk card has a real warning that needs attention

In those cases, show the normal cards instead.

## Recommended Display Logic

### Show `stable_idle` when

- `idle_state = stable_idle`
- `input.pending = false`
- `ready_count = 0`
- `active_claim_count = 0`
- stale indicator is `fresh`

### Show `temporarily_clear` when

- `idle_state = candidate_idle`
- or stale indicator is `reconciling`
- or stale indicator is `stale`
- or stale indicator is `unknown`
- and there is still no visible pending input, ready task, or active claim

### Show normal dashboard instead when

- any work or blocker is visible

## Tone Rules

Good tone:

- calm
- temporary
- operational

Bad tone:

- celebratory
- final
- absolute

Avoid phrases like:

- `All done`
- `Nothing left to do`
- `Everything is complete`
- `No more work exists`

Prefer phrases like:

- `No work queued right now`
- `Waiting for new input`
- `Rechecking for fresh work`

## Placement

Use the empty/no-work message as a lightweight overlay or replacement state for
the dashboard body when the conditions are met.

Keep the stale/fresh badge visible near the top so users can still tell whether
the calm state is trustworthy.

## Minimal Example

### Trusted idle

```text
No work queued right now.
The loop is idle and waiting for new input.
```

### Quiet but still reconciling

```text
No immediate work is visible.
The dashboard is rechecking for fresh work.
```

## Guardrails

- do not treat stale summaries as proof of no work
- do not show a victory-state message just because counts are temporarily zero
- do not hide the freshness badge in empty states
- do not hide active blockers behind a calm empty-state panel

## Follow-On Dependencies

This empty-state rule should feed:

- `define-dashboard-refresh-cadence-rule`
- `define-dashboard-command-history-visibility-rule`
- `define-next-public-trust-cleanup-slice-after-freeze-boundary`
