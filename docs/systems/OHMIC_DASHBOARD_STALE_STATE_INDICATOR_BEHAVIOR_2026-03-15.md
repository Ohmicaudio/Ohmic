# Ohmic Dashboard Stale State Indicator Behavior

Date: 2026-03-15
Status: working contract

## Purpose

Define how the dashboard should indicate that `agent_state.json` is fresh,
stale, reconciling, or unknown without confusing summary staleness with fatal
failure.

This is a lightweight behavior rule, not a full visual system.

## Core Principle

Freshness is about summary trust, not system survival.

So the indicator must answer:

- is the current summary safe to trust at a glance?

It must not imply:

- the agent is dead
- the queue is empty forever
- a stale summary means irreversible failure

## Indicator States

Use four indicator states:

1. `fresh`
2. `reconciling`
3. `stale`
4. `unknown`

## State Meanings

### `fresh`

Meaning:

- the visible summary matches current repo-backed or generated source truth well
  enough for normal dashboard use

Show:

- neutral or positive freshness badge
- short text like `Summary current`

### `reconciling`

Meaning:

- a refresh pass is underway or expected shortly
- the last visible summary may still be usable, but a newer one is being built

Show:

- non-alarm in-progress badge
- short text like `Refreshing summary`

Do not:

- treat this as a failure state

### `stale`

Meaning:

- the summary is older than expected or disagrees with stronger sources

Show:

- warning badge
- short text like `Summary may be out of date`

Do not:

- call the system failed
- collapse the dashboard into an error screen

### `unknown`

Meaning:

- the dashboard cannot determine freshness because the summary or summary export
  is missing

Show:

- caution badge
- short text like `Summary freshness unknown`

Do not:

- infer that the queue count is zero
- infer that no work exists

## Source Inputs

Primary freshness inputs:

- `agent_state.json.session.updated_at`
- `ready_tasks.json.staleness.status`
- `active_claims.json.staleness.status`
- `agent_runtime.json.health.stale_state_detected`

Supporting inputs:

- wrapper-side reconciliation status if available
- last known successful generation timestamp

## Evaluation Rule

Use the strongest available freshness signal in this order:

1. explicit reconciliation-in-progress flag
2. explicit stale flags from summary exports or runtime health
3. age of the last successful summary refresh
4. fallback to `unknown`

## Recommended Mapping

### Show `fresh` when

- summary exports are `fresh`
- runtime does not report stale state
- the last update timestamp is within the normal refresh window

### Show `reconciling` when

- a reconciliation or refresh pass is currently running
- or the wrapper has intentionally marked the summary mid-refresh

### Show `stale` when

- `ready_tasks.json.staleness.status = stale`
- or `active_claims.json.staleness.status = stale`
- or `agent_runtime.json.health.stale_state_detected = true`
- or the summary age exceeds the accepted freshness window

### Show `unknown` when

- freshness inputs are missing
- the summary file exists but freshness metadata cannot be trusted
- generation never completed successfully

## Dashboard Placement

The stale-state indicator should appear:

- in the summary card header
- or as a small shared page-level status chip near the top of the dashboard

It should not require its own full-width panel in V1.

## Message Rules

Keep the text short and operational.

Good:

- `Summary current`
- `Refreshing summary`
- `Summary may be out of date`
- `Summary freshness unknown`

Bad:

- `Everything is broken`
- `No work exists`
- `Fatal`
- `All done forever`

## Interaction With Other Cards

- the queue health card may still show the last known counts while the freshness
  badge is stale
- the blockers and risk card should carry actual runtime or queue problems
- do not overload the stale indicator with unrelated blocker text

## Failure Separation Rule

Use the stale indicator only for freshness confidence.

Use the blockers and risk card for:

- runtime errors
- claim collisions
- queue drift details
- actual blocked-work explanations

That keeps `stale` from being mistaken for `crashed`.

## Minimal Example

```text
fresh       -> green/neutral badge + "Summary current"
reconciling -> blue/neutral badge + "Refreshing summary"
stale       -> amber badge + "Summary may be out of date"
unknown     -> gray/amber badge + "Summary freshness unknown"
```

## Guardrails

- do not make stale imply fatal
- do not hide the last known summary just because freshness is stale
- do not infer "no work" from a missing summary file
- do not let one stale summary export override a stronger repo-backed truth check

## Follow-On Dependencies

This behavior should feed:

- `define-dashboard-empty-and-no-work-state`
- `define-dashboard-command-box-behavior`
- `define-dashboard-refresh-cadence-rule`
