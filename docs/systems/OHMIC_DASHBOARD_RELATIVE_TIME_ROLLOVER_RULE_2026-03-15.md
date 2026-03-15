# Ohmic Dashboard Relative Time Rollover Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how dashboard freshness labels should roll from seconds to minutes to
hours so the timing stays readable without flicker or awkward over-precision.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_FRESHNESS_TIMESTAMP_FORMAT_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_STALE_STATE_INDICATOR_BEHAVIOR_2026-03-15.md`

## Core Principle

Freshness text should feel calm and readable.

Users need a quick confidence signal, not a stopwatch.

## Primary Units

Use only these relative freshness units in the main dashboard surface:

- seconds
- minutes
- hours

Do not show days in the primary label.

If freshness ages beyond hours, the stale-state copy should carry most of the
meaning.

## Rollover Thresholds

### 1. Seconds range

Show seconds for ages under `60` seconds.

Examples:

- `Updated just now`
- `Updated 12s ago`
- `Updated 42s ago`

Recommended wording rule:

- use `Updated just now` for the first `0-5` seconds
- use `Updated {n}s ago` for `6-59` seconds

### 2. Minutes range

Roll to minutes at `60` seconds.

Examples:

- `Updated 1m ago`
- `Updated 8m ago`
- `Updated 42m ago`

Round down to whole minutes.

Do not show mixed formats like:

- `1m 12s ago`
- `8 minutes 14 seconds ago`

### 3. Hours range

Roll to hours at `60` minutes.

Examples:

- `Updated 1h ago`
- `Updated 2h ago`
- `Updated 5h ago`

Round down to whole hours.

Do not show mixed formats like:

- `1h 13m ago`
- `2 hours 7 minutes ago`

## Update Cadence Rule

The label should update only when the visible unit changes.

That means:

- second labels may update once per second
- minute labels should update once per minute
- hour labels should update once per hour

Do not re-render faster than the visible wording requires.

## Stale-State Interaction

Relative freshness text should still appear when state is stale.

Examples:

- `Updated 18m ago`
- `Updated 2h ago`

The stale-state badge or caution text should carry the warning layer.

Do not rewrite the relative label itself into alarm language on every tick.

Good pairing:

- `Updated 18m ago` + `Summary may be out of date`

Bad pairing:

- `Dangerously stale 18m ago`

## Exact Time Interaction

If exact timestamps are shown in hover, detail, or debug views:

- keep those precise
- do not let exact timestamps change the primary relative rollover rules

## Label Simplicity Rule

Prefer compact wording in the main dashboard surface:

- `Updated just now`
- `Updated 9s ago`
- `Updated 14m ago`
- `Updated 2h ago`

Avoid:

- `Updated 0 minutes ago`
- `Last synchronized 00:14:22 ago`
- `Updated approximately 2 hours ago`

## Guardrails

- do not over-update the label once it has entered minutes or hours
- do not mix units in the primary label
- do not let rollover wording fight with the stale-state badge
- do not treat very old state as precise just because the clock can calculate it

## Minimal Mapping

```text
0-5s     -> Updated just now
6-59s    -> Updated {n}s ago
1-59m    -> Updated {n}m ago
1h+      -> Updated {n}h ago
```

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-freshness-hint-rule`
- `define-dashboard-return-from-sleep-reconciliation-rule`
- `define-dashboard-last-updated-label-rule`
