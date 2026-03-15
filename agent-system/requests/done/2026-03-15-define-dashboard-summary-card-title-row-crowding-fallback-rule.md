Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T145047Z-2e80d9f6

# Define Dashboard Summary Card Title Row Crowding Fallback Rule

## Goal

Define where the freshness hint should move when the summary-card title row is
already too crowded for clean adjacency.

## Focus

- fallback placement order
- crowding triggers
- relationship to status badges and metadata rows

## Acceptance

- one bounded title-row fallback packet exists
- it fits the summary-card title adjacency rule
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a stable fallback order for freshness and stale cues when the summary
  title row gets crowded
- kept the title and higher-priority status badges ahead of softer freshness
  hints
- moved the preferred fallback placement to the updated/metadata row instead of
  improvising per layout

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_TITLE_ROW_CROWDING_FALLBACK_RULE_2026-03-15.md`
