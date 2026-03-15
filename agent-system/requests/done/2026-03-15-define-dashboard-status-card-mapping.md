Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T135637Z-d4b34ab0

# Define Dashboard Status Card Mapping

## Goal

Define how live agent JSON state should map into a small set of dashboard cards
or panes without exposing raw internal detail everywhere.

## Focus

- summary card
- queue health card
- current action card
- blockers or risk card

## Acceptance

- one simple dashboard-mapping packet exists
- it fits the current JSON contracts
- it stays UI-light and contract-first

## Outcome

Completed on 2026-03-15.

Result:

- mapped the first dashboard surface into four contract-first cards
- fixed explicit source priority and fallback rules for each card
- carried freshness/staleness handling into the card layer instead of leaving
  it implicit

## Artifact

- `docs/systems/OHMIC_DASHBOARD_STATUS_CARD_MAPPING_2026-03-15.md`
