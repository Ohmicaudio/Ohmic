# Ohmic Dashboard Recent Output Pane Behavior

Date: 2026-03-15
Status: working contract

## Purpose

Define how the dashboard should show the latest outbox and status activity
without turning the page into a noisy event log.

## Core Principle

The recent-output pane should answer:

- what just happened
- what is happening now
- whether anything needs attention

It should not try to show the full event history inline.

## Default Display Rule

Show only a small rolling window of recent meaningful output.

Recommended default:

- latest `3` to `5` meaningful items

## Preferred Event Types To Show

Prioritize these outbox event types:

- `blocked`
- `needs_input`
- `completion`
- `status`
- `result`

Lower priority:

- routine audit or housekeeping output unless it affects the visible state

## Ordering Rule

Show newest first.

If the pane includes timestamps:

- keep them short and readable

## Collapsing Rule

Older items should collapse behind a simple “more” or “history” affordance.

Do not show:

- the full outbox log by default

## Message Length Rule

Prefer:

- one short title or status line
- optional one short supporting line

Do not dump long raw payloads into the pane.

## Suggested Item Shape

Each visible item should carry:

- event type
- message summary
- timestamp
- optional importance flag

## Special Cases

### Blocked or needs-input

Keep these visible longer than routine status events.

### Completion

Show enough context to tell what finished, but avoid changelog sprawl.

### Routine status

May roll off faster when newer, more important messages arrive.

## Empty Pane Behavior

If no recent meaningful output exists:

- show a calm empty state
- do not imply failure

## Relationship To Main Response Card

The main response card should show the current active summary.

The recent-output pane should show:

- the short recent trail behind that summary

So:

- response card = current now
- recent-output pane = what just happened

## What Not To Do

- do not show raw JSON blobs by default
- do not display dozens of low-value status lines
- do not let routine chatter bury blocked or needs-input events

## Follow-On Dependencies

This pane behavior should feed:

- `define-dashboard-command-history-visibility-rule`
- `define-dashboard-empty-and-no-work-state`
- `define-dashboard-output-priority-visibility-rule`
