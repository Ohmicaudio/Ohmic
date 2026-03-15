# Ohmic Dashboard Immediate Refresh Debounce Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how nearby immediate-refresh triggers should collapse into a single
refresh burst so meaningful events stay snappy without causing refresh thrash.

## Core Principle

Fast should not mean noisy.

Multiple meaningful events that occur nearly together should usually result in
one fresh dashboard update, not a pile of redundant redraws.

## Recommended Debounce Window

Recommended default:

- `500ms` to `1000ms`

This is short enough to feel instant to the user but long enough to absorb
small bursts of related events.

## Coalescing Rule

If multiple immediate-refresh triggers fire inside the debounce window:

- collapse them into one immediate refresh pass
- keep the strongest refresh reason

Example strongest reasons:

- `reconciliation_needed`
- `new_result_arrived`
- `focus_return`
- `command_accepted`

## Escalation Rule

If any coalesced trigger implies stale or contradictory state:

- the resulting refresh may escalate to reconciliation
- do not let a weaker co-trigger downgrade it back to light refresh

## Repeat Burst Rule

If meaningful new events continue after the debounce window closes:

- allow another refresh burst

The goal is coalescing nearby events, not suppressing real ongoing change.

## Guardrails

- do not run one refresh per tiny event in a fast burst
- do not debounce so long that the dashboard feels laggy
- do not let weaker triggers override stronger stale/reconciliation triggers
- do not use debounce to hide real event order in logs or history

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-immediate-refresh-trigger-rule`
- `define-dashboard-refresh-cadence-rule`
