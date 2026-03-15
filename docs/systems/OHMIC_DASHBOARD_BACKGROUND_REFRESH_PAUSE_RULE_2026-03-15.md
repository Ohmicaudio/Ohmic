# Ohmic Dashboard Background Refresh Pause Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the dashboard should reduce refresh activity while backgrounded,
hidden, or otherwise not the active visible surface.

## Core Principle

A hidden dashboard should stay informed, not busy.

Reduce background work enough to avoid waste, but preserve enough freshness to
recover quickly when the user returns.

## Visibility Tiers

### `foreground_active`

Dashboard is visible and in active use.

Behavior:

- normal refresh cadence applies
- immediate refresh triggers remain enabled

### `foreground_idle`

Dashboard is still visible but currently quiet.

Behavior:

- use the slower visible cadence tier

### `background_hidden`

Tab or surface is hidden or not primary.

Behavior:

- suppress hot polling
- stretch refresh interval into the background range
- keep only meaningful wake-up or major-state triggers

## Recommended Background Behavior

When hidden:

- do not poll at the foreground-active rate
- prefer `30-60s` background cadence
- allow a strong event marker to be picked up on the next background check

Do not fully detach from state unless wrapper policy explicitly chooses that.

## Focus Return Behavior

When the dashboard returns to visible focus:

- run one immediate refresh
- if needed, escalate to reconciliation
- then resume the foreground cadence tier

The user should not have to manually refresh after switching back.

## Pause Rule

Background mode should pause only the aggressive cadence, not state truth.

Do not:

- clear the current command state just because the page was hidden
- lose the last visible answer
- discard stale-state indicators

## Mobile / Suspended Surface Rule

On surfaces that aggressively suspend background work:

- accept slower passive refresh while hidden
- force an immediate refresh on return
- allow reconciliation if the freshness gap is large

## Relationship To Immediate Triggers

While hidden:

- collapse most immediate triggers
- record that meaningful change happened
- replay a single immediate refresh or reconciliation on focus return

This prevents background churn while preserving correctness.

## Guardrails

- do not keep full foreground polling in hidden mode
- do not pause so hard that return feels broken or stale
- do not discard meaningful waiting or blocked state while hidden
- do not rely only on manual refresh after focus return

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-focus-return-refresh-rule`
- `define-dashboard-refresh-cadence-rule`
- `define-dashboard-stale-state-indicator-behavior`
