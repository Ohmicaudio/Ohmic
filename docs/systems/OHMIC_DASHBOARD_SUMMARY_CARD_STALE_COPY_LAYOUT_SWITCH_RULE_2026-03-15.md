# Ohmic Dashboard Summary Card Stale Copy Layout Switch Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when the dashboard should switch between short-form and long-form local
stale copy based on available card space and layout density.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_SHORT_FORM_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_LONG_FORM_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_TITLE_ROW_CROWDING_FALLBACK_RULE_2026-03-15.md`

## Core Principle

Copy length should switch based on layout fit first, not because the meaning of
the stale state changed.

Severity and layout are separate concerns.

## Default Choice

Use long-form local stale copy when the card has enough space to show it
without crowding the title or metadata rows.

Use short-form local stale copy when the longer phrase would make the card
harder to scan.

## Switch Conditions

Switch from long-form to short-form when any of these are true:

- the title row is already crowded
- the metadata row would wrap awkwardly with long-form copy
- the card is in a narrow or stacked layout
- the card already carries another essential badge or status cue

## When To Prefer Long Form

Prefer long-form stale copy when:

- the card is wide enough to show it cleanly
- the card is a primary trust surface
- the extra scope clarification improves comprehension

Examples:

- larger desktop summary card
- expanded inspection layout

## When To Prefer Short Form

Prefer short-form stale copy when:

- the card is narrow
- the title row already contains essential status elements
- the design needs a compact local trust cue

Examples:

- mobile or narrow-column cards
- dense top-row summary cards

## Meaning Preservation Rule

Switching between long-form and short-form must not change the underlying
meaning.

The shorter version should express the same local stale idea with less space,
not a weaker or stronger trust judgment by itself.

## Placement Interaction

If the title row is crowded:

- use the title-row crowding fallback first
- then choose short-form or long-form for the destination slot based on the new
  available space

Do not keep long-form copy in the title row just because long-form is the
default preference.

## What Not To Use As The Switch

Do not switch copy length only because:

- time has passed
- the stale condition feels emotionally more important
- the card was rendered in a different order

Those belong to severity or layout-independent logic, not the layout switch.

## Compact Example

Wide card:

```text
Updated 12m ago
Card data may not reflect the latest dashboard state.
```

Narrow card:

```text
Updated 12m ago | May be stale
```

## Guardrails

- do not let long-form stale copy crowd out the card title
- do not change the message meaning just because space shrank
- do not use short-form when there is obvious room for clearer local copy
- do not treat layout switching as severity escalation

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-copy-transition-rule`
- `define-dashboard-summary-card-metadata-line-priority-rule`
