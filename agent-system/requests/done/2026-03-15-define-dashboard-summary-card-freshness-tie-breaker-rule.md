Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T144848Z-47336fd0

# Define Dashboard Summary Card Freshness Tie Breaker Rule

## Goal

Define how the dashboard should choose between equally eligible summary cards
when freshness density limits allow only one or a few hints.

## Focus

- tie-break heuristics
- trust impact ordering
- small-surface decision rules

## Acceptance

- one bounded freshness tie-break packet exists
- it fits the summary-card freshness priority order rule
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a deterministic tie-break order for equally eligible summary cards
  under freshness-density limits
- put trust impact and local divergence ahead of layout convenience
- kept decorative symmetry and render order out of the selection logic

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_TIE_BREAKER_RULE_2026-03-15.md`
