Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T143117Z-b59006fe

# Define Dashboard Summary Card Freshness Hint Rule

## Goal

Define whether summary cards should show a lightweight freshness hint so users
can tell which high-level dashboard areas reflect newer or older state.

## Focus

- card-level freshness hint scope
- relationship to the main last-updated label
- when card hints should stay hidden to avoid noise

## Acceptance

- one bounded summary-card freshness packet exists
- it fits the last-updated label and stale-state rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a single lightweight freshness hint for the summary card instead of
  field-by-field freshness noise
- kept the hint subordinate to the updated timestamp and shared stale-state
  behavior
- documented when the hint may collapse visually without removing summary trust
  cues entirely

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_HINT_RULE_2026-03-15.md`
