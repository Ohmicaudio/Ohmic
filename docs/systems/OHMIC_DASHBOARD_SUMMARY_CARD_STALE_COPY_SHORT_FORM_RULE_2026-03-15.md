# Ohmic Dashboard Summary Card Stale Copy Short Form Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the shortest acceptable local stale wording for cramped summary-card
surfaces where full cautionary copy would overcrowd the UI.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_LOCAL_VS_GLOBAL_STALE_COPY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_HINT_RULE_2026-03-15.md`

## Core Principle

Short-form stale copy should stay narrow, readable, and obviously local even
when space is tight.

## Recommended Short Forms

Preferred short-form options:

- `Possibly stale`
- `May be stale`
- `Card may be stale`

These are acceptable because they:

- fit tight card headers
- keep the scope local
- avoid sounding like system-wide failure

## Default Preference Order

Use this order when space shrinks:

1. `Card may be stale`
2. `May be stale`
3. `Possibly stale`

Why:

- `Card may be stale` is clearest when space allows
- `May be stale` is the shortest clear fallback
- `Possibly stale` works when tone needs to stay softer

## What To Avoid

Do not use these as short-form local stale copy:

- `Stale`
- `Outdated`
- `Invalid`
- `Broken`
- `Needs refresh now`

Why:

- too abrupt
- too global-sounding
- too easy to confuse with runtime or full-dashboard failure

## Relationship To Global Stale Copy

Short-form local copy must stay weaker and narrower than global stale copy.

Good distinction:

- local: `May be stale`
- global: `Dashboard state may be stale`

Bad distinction:

- local: `State may be stale`
- global: `State may be stale`

Local and global copy should not collapse into the same phrase.

## Placement Rule

Short-form stale copy belongs:

- in the summary card header
- or beside the card-level freshness hint

It should not replace the full page-level stale indicator.

## Density Rule

Use short-form stale copy only when:

- the layout is too cramped for the fuller local copy
- the card already carries other essential header content
- the longer phrase would crowd out the updated label or title

If there is room, prefer the fuller local stale wording defined elsewhere.

## Guardrails

- keep short-form stale copy clearly local
- do not let the shortest version look like a hard error label
- do not replace the global stale indicator with local shorthand
- do not make the copy so soft that it stops communicating caution

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-copy-severity-step-rule`
- `define-dashboard-summary-card-title-row-crowding-fallback-rule`
