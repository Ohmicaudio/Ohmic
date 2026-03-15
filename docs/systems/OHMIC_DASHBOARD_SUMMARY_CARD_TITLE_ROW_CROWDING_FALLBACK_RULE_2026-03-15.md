# Ohmic Dashboard Summary Card Title Row Crowding Fallback Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define where the freshness hint should move when the summary-card title row is
already too crowded for clean adjacency.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_HINT_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_SHORT_FORM_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_TIE_BREAKER_RULE_2026-03-15.md`

## Core Principle

When the title row gets crowded, move freshness and stale cues in a stable order
instead of letting them fight the card title.

## Crowding Triggers

Treat the title row as crowded when any of these are true:

- the title wraps awkwardly
- the stale or freshness hint forces the title into a second noisy line
- status badges plus the title plus the hint no longer fit comfortably
- the title row becomes harder to scan than the metadata row below it

## Fallback Order

Use this fallback order:

1. keep the title intact
2. keep essential blocked or higher-priority status badges in the title row
3. move freshness or local stale hint to the metadata row
4. shorten the hint using the approved short-form stale/freshness copy
5. suppress the lower-value hint only if the metadata row is also crowded

## Preferred Fallback Placement

When the title row is crowded, move the freshness or stale cue to:

- the `Updated` metadata row
- or a compact line directly beneath the title

Preferred example:

```text
Summary
Updated 12m ago  |  May be stale
```

This keeps the title clean while preserving trust cues nearby.

## What Stays In The Title Row

Keep in the title row first:

- the card title
- essential blocked or needs-input badges

Do not prioritize freshness hints over higher-priority state badges.

## Shortening Rule

If the hint must move and space is still tight:

- use the approved short-form copy
- keep the wording local and compact

Examples:

- `May be stale`
- `Possibly stale`
- `Current`

Avoid verbose fallback phrases in crowded rows.

## Suppression Rule

If both the title row and metadata row are too crowded:

- suppress the lower-value freshness hint
- keep the `Updated` label if possible
- preserve stronger stale or blocked messaging over soft freshness decoration

Do not suppress the title or critical status badges just to keep a freshness
hint visible.

## Small-Surface Rule

On very small layouts:

- title first
- blocked/needs-input badge second
- `Updated` row third
- freshness/stale hint only if it still fits without crowding the metadata line

This keeps the fallback predictable across narrow surfaces.

## Guardrails

- do not let the title row become a crowded badge strip
- do not move freshness cues far away from the summary card they describe
- do not preserve low-value freshness hints at the expense of title readability
- do not drop higher-priority state badges before softer trust cues

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-title-row-compression-rule`
- `define-dashboard-summary-card-metadata-line-priority-rule`
