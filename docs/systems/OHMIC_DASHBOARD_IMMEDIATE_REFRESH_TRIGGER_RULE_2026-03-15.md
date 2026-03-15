# Ohmic Dashboard Immediate Refresh Trigger Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the exact events that should trigger a near-immediate dashboard refresh
instead of waiting for the normal polling cadence.

## Core Principle

Immediate refresh is for meaningful state change, not for every local twitch.

Use it to reduce perceived lag after important events while keeping the
dashboard out of hot-loop behavior.

## Qualifying Events

Trigger an immediate refresh when any of the following occurs:

- inbox append succeeds for a submitted command
- a new outbox event appears
- response status changes for the current command
- the ready-count or active-claim summary changes materially
- the dashboard regains focus after being backgrounded
- a stale-state warning clears or becomes active
- reconciliation completes after previously stale state

## Non-Qualifying Events

Do not trigger immediate refresh for:

- typing inside the command box
- hover or focus styling changes
- local panel expand/collapse with no state change
- cosmetic animation completion
- heartbeat updates that do not change visible meaning

## Burst Control Rule

Immediate refresh should be allowed to fire promptly, but nearby triggers should
collapse into one refresh burst.

Recommended rule:

- allow one immediate refresh
- collapse additional triggers inside a short debounce window

Recommended debounce window:

- `500ms` to `1000ms`

## Relationship To Reconciliation

Immediate refresh is still lighter than reconciliation.

If the trigger also implies stale or contradictory summary state:

- escalate to reconciliation refresh
- do not simply repeat a fast light poll

## Focus Return Rule

When the dashboard returns to focus:

- run an immediate refresh once
- then return to the normal cadence tier

If state appears stale on focus return:

- reconciliation may replace the simple immediate refresh

## Command Submission Rule

After a successful command submit:

- run an immediate refresh so the acknowledgement state appears quickly
- do not wait for the next cadence tick to show accepted/pending state

## Output Arrival Rule

When a new output/result arrives:

- run an immediate refresh so the dashboard can replace stale waiting state with
  the newest answer

## Guardrails

- do not turn every event into repeated immediate refresh bursts
- do not use immediate refresh to paper over stale summaries
- do not block the command surface waiting for a perfect full refresh
- do not let low-value routine events fire as often as real state change

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-immediate-refresh-debounce-rule`
- `define-dashboard-background-refresh-pause-rule`
- `define-dashboard-command-acknowledgement-state`
- `define-dashboard-command-pending-timeout-rule`
