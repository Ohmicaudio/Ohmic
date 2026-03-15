# Ohmic Dashboard Repeated Event Grouping Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how repeated similar output events should be grouped into one readable
summary instead of appearing as a noisy stack of near-duplicates.

## Core Principle

Repeated output should accumulate meaning, not visual clutter.

When the same low-consequence event family keeps firing, the dashboard should
group it into one compact summary with a count and latest freshness.

## Similarity Rule

Events may group together when they share:

- the same low-priority event family
- materially similar meaning
- no higher-priority distinction the user needs to see separately

Examples:

- repeated routine refresh completions
- repeated queue summary updates
- repeated progress heartbeat lines

Do not group events together just because they occurred close in time if their
meaning is materially different.

## Group Summary Rule

A grouped line should show:

- short family label
- repeat count
- latest freshness or timestamp hint

Example forms:

- `Routine refresh completed x4`
- `Queue summary updated x3`

## Grouping Threshold

Recommended default:

- show the first one or two events normally
- group once the event family repeats beyond that threshold

This keeps the pane readable without hiding that repetition happened.

## Reset Rule

Start a new group when:

- the event family changes materially
- a higher-priority event interrupts the flow
- enough time passes that the new event should feel like a fresh burst rather
  than continuation

## Priority Rule

Never let grouped routine events outrank:

- blocked output
- needs-input output
- meaningful warning output
- the latest major completion if it still deserves visibility

Grouping is for low-value repetition, not for compressing important state.

## Expansion Rule

Groups may expand on demand, but the default grouped row should remain
dashboard-friendly and compact.

Do not require expansion just to understand the current top issue.

## Guardrails

- do not group unrelated events into one vague bucket
- do not hide high-priority warnings inside grouped routine output
- do not keep printing every repeated event at full size forever
- do not make grouped wording longer than the events it replaces

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-output-group-summary-wording-rule`
- `define-dashboard-output-group-reset-threshold-rule`
- `define-dashboard-output-event-collapse-rule`
