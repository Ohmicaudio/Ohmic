# Ohmic Dashboard Output Group Summary Wording Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how grouped repeated-output summaries should be worded so they stay short
and readable while still conveying the event family and repeat count.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_REPEATED_EVENT_GROUPING_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_ROUTINE_STATUS_DECAY_RULE_2026-03-15.md`

## Core Principle

Grouped wording should tell the user what kind of event repeated and how often,
using fewer words than the repeated raw lines would have used.

## Required Elements

A grouped summary line should contain:

- a short event-family label
- the repeat count

It may also contain:

- a small freshness hint

Only include a freshness hint if it helps the user understand whether the group
is still current.

## Recommended Word Order

Use this default order:

```text
[family label] x[count]
```

Examples:

- `Routine refresh completed x4`
- `Queue summary updated x3`
- `Heartbeat received x6`

This order keeps the event meaning visible first and the count easy to scan at
the end.

## Count Style Rule

Use compact count notation:

- `x3`
- `x12`

Do not use:

- `(3 times)`
- `repeated 3 times`
- `count: 3`

The grouped line must stay compact.

## Family Label Rule

The family label should describe the event meaning, not the grouping mechanic.

Good:

- `Routine refresh completed x4`
- `Queue summary updated x3`

Bad:

- `Grouped event x4`
- `Routine messages x4`
- `Repeated stuff x4`

## Tense And Voice Rule

Prefer short past-tense or stable state labels that read naturally:

- `completed`
- `updated`
- `received`
- `checked`

Avoid verbose helper phrases like:

- `has been updated`
- `was completed`
- `events were received`

## Tight Layout Rule

On tight layouts:

- preserve the family label first
- keep the count visible
- drop optional freshness text before shortening the main label too aggressively

If shortening is required, shorten the label carefully:

- `Queue updated x3`
- `Routine refresh x4`

Do not reduce the line to a bare count with no event meaning.

## Freshness Hint Rule

If a grouped line also carries a freshness hint, keep it secondary.

Example:

```text
Queue summary updated x3
Latest 2m ago
```

Do not fold that into one overlong line unless space comfortably allows it.

## What To Avoid

Do not:

- repeat the full raw event text inside the summary
- include timestamps inline unless the design has space for them
- use punctuation-heavy phrasing
- make grouped wording longer than the original routine event lines

## Recommended Examples

Good:

- `Routine refresh completed x4`
- `Queue summary updated x3`
- `Light progress heartbeat x5`

Acceptable compact forms:

- `Routine refresh x4`
- `Queue updated x3`

Bad:

- `Queue summary updated 3 separate times recently`
- `Routine refresh completed (x4 occurrences)`
- `A repeated series of refresh completion events x4`

## Guardrails

- keep grouped wording compact and literal
- keep the event family visible before the count
- do not hide higher-priority events inside routine grouped wording
- do not invent vague bucket labels that force expansion to understand the row

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-output-group-reset-threshold-rule`
- `define-dashboard-routine-status-fade-timing-rule`
- `define-dashboard-output-event-collapse-rule`
