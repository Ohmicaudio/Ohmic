# Ohmic Dashboard Routine Status Decay Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how quickly low-consequence routine status should fade or de-emphasize
after appearing in the recent-output surface.

## Core Principle

Routine status is useful briefly, then it should get out of the way.

The dashboard should keep fresh routine output visible long enough to confirm
activity, then reduce its emphasis so more important states stay readable.

## What Counts As Routine Status

Routine status includes:

- refresh completed
- queue summary updated
- idle check passed
- light heartbeat/progress chatter

It does not include:

- blocked
- needs-input
- major warning
- meaningful completion that still deserves foreground space

## Recommended Decay Model

### `fresh`

Immediately after arrival:

- normal low-emphasis visibility

### `fading`

After a short interval:

- reduce contrast or emphasis
- keep still readable

### `collapsed_or_grouped`

After more routine noise arrives:

- allow grouping or collapse
- stop presenting each event as primary content

## Recommended Timing

Suggested default pattern:

- first `10-20` seconds: visible but low-emphasis
- after that: increasingly faded
- once repeated or superseded: grouped/collapsed

Exact UI timing may vary, but the lifecycle should stay short.

## Higher-Priority Override Rule

If a higher-priority event appears:

- routine status should decay faster
- it should yield screen space immediately where needed

## Completion Relationship Rule

Routine status should decay faster than meaningful completion messages.

Completions may deserve slightly longer visibility even if they later yield to
blocked or needs-input output.

## Guardrails

- do not keep routine status visually fresh for too long
- do not fade so aggressively that activity looks dead
- do not treat blocked or warning output as routine
- do not let routine decay compete with grouped output logic

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-routine-status-fade-timing-rule`
- `define-dashboard-output-event-collapse-rule`
- `define-dashboard-output-priority-visibility-rule`
