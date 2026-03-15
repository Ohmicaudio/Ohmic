# Ohmic Dashboard Output Event Collapse Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how lower-priority or repetitive output events should collapse so the
recent-output area stays readable when the system produces a lot of status
traffic.

## Core Principle

Output should compress repetition, not consequence.

Collapse low-value repetition first and preserve full visibility for blocked,
needs-input, or otherwise high-priority events.

## What Should Collapse

Candidates for collapse:

- repeated routine status
- repeated refresh/heartbeat confirmations
- repeated identical progress notes
- repeated low-consequence queue summaries

Do not collapse away the only visible blocked or needs-input event.

## Collapse Threshold Rule

Recommended threshold:

- after `2` or `3` substantially similar low-priority events

At that point:

- replace the visible stack with a grouped/collapsed summary

## Grouping Rule

Grouped collapsed output should summarize:

- event family or short label
- repeat count
- latest timestamp or freshness

Examples:

- `Routine refresh completed x4`
- `Queue summary updated x3`

## Expansion Rule

Collapsed groups may expand on demand, but expansion is secondary.

The default output surface should stay compact and readable first.

## Priority Interaction Rule

Collapse behavior must obey output priority:

- never let grouped routine events outrank pinned blocked output
- never collapse the only meaningful warning into invisibility
- collapse routine chatter more aggressively while unresolved higher-priority
  state exists

## Completion Interaction Rule

Meaningful completion events may stay visible briefly even when routine events
around them collapse.

Completions are not routine noise, but they still yield to blocked or input
required conditions.

## Reset Rule

If a new high-priority event appears:

- keep the collapse groups below it
- allow the grouped routine count to continue or reset based on the event family

If the event family changes materially:

- start a new group instead of forcing unrelated events into one bucket

## Guardrails

- do not collapse important warnings into vague summaries
- do not create one giant mixed bag of unrelated output
- do not require expansion just to see the current most important event
- do not preserve repetitive low-value noise at full size forever

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-routine-status-decay-rule`
- `define-dashboard-repeated-event-grouping-rule`
- `define-dashboard-recent-output-pane-behavior`
