# Ohmic Dashboard Command Pending Timeout Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define what the dashboard should do when a command stays in accepted or pending
state longer than expected without implying failure too early or teaching users
to distrust the queue.

## Core Principle

Pending for a while is not the same as failed.

The dashboard should first stay calm, then surface mild delay context, and only
escalate to stronger concern when delay is materially abnormal or stale-state
signals agree.

## Recommended Timeout Tiers

### `normal_wait`

Expected early pending window.

Recommended duration:

- first `30` seconds after acceptance

UI behavior:

- show normal pending acknowledgement
- no warning styling
- no failure hint

### `delayed_but_normal`

Longer than ideal, but still plausible.

Recommended duration:

- after `30` seconds
- through roughly `2` minutes

UI behavior:

- keep pending state
- add mild delay copy such as `Still waiting for response`
- do not imply error

### `attention_needed`

Delay is long enough to deserve user-facing context.

Recommended duration:

- after `2` minutes
- or sooner if stale-state indicators also fire

UI behavior:

- keep the command visible
- show a higher-visibility delay note
- suggest refresh or state check only if the rest of the dashboard also hints
  at staleness

### `suspected_stale_or_stuck`

Delay is abnormal enough that the dashboard should stop pretending this is just
routine waiting.

Recommended duration:

- after `5` minutes
- or earlier if:
  - stale-state indicator is active
  - last-updated label is materially old
  - reconciliation disagrees with current pending state

UI behavior:

- mark the command as delayed or possibly stale
- encourage reconciliation or review
- do not silently leave it looking like fresh normal waiting

## State Names

Recommended user-facing states:

- `pending`
- `waiting longer than expected`
- `delayed`
- `possibly stale`

Avoid using:

- `failed`
- `broken`
- `timed out`

unless the loop or transport actually returned a real failure outcome.

## Timeout Escalation Rule

Timeout alone should not create a fake failure state.

Escalation should consider:

- elapsed time since acceptance
- stale-state indicator
- last-updated freshness
- whether newer commands or outputs are arriving
- whether reconciliation still confirms the pending command as current

If newer work is clearly moving, the dashboard may keep the current command in a
lower-intensity delayed state rather than jumping straight to suspected failure.

## Recommended UX Copy Direction

Early delay:

- `Still waiting for agent response.`

Later delay:

- `This is taking longer than expected.`

Suspected stale state:

- `This command may be delayed or the dashboard may need refresh.`

Keep the tone factual and non-dramatic.

## Relationship To Refresh And Reconciliation

When the timeout crosses into `attention_needed` or beyond:

- allow an immediate refresh
- and, if staleness indicators agree, trigger reconciliation rather than only
  repeating light polling

Timeout escalation should feed refresh behavior, not replace it.

## Relationship To Command History

The delayed pending command should remain pinned above older history entries.

Do not let timeout handling bury the current pending item under historical
commands.

## Minimal Example

```text
0s accepted -> pending
45s -> still waiting, mild delay copy
2m30s -> delayed, stronger visibility
5m + stale signals -> possibly stale, recommend refresh/reconciliation
```

## Guardrails

- do not imply failure too early
- do not leave an obviously stale command looking fresh forever
- do not show scary red-error styling without actual failure evidence
- do not make timeout behavior independent from stale-state and refresh logic

## Follow-On Dependencies

This timeout rule should feed:

- `define-dashboard-pending-warning-copy-rule`
- `define-dashboard-stale-state-indicator-behavior`
- `define-dashboard-immediate-refresh-trigger-rule`
- `define-dashboard-last-updated-label-rule`
