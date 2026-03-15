Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150302Z-46a0e011

# Define Dashboard Summary Card Stale Copy Deescalation Rule

## Goal

Define how a summary card should step stale wording back down once local trust
improves so the UI does not stay alarmed after recovery.

## Focus

- deescalation conditions
- wording step-down behavior
- relationship to stale-copy severity transitions

## Acceptance

- one bounded stale-copy-deescalation packet exists
- it fits the stale-copy severity and transition rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a stable step-down order from strong stale wording back toward
  neutral freshness
- kept deescalation tied to recovering trust evidence instead of elapsed time
  alone
- prevented abrupt jumps from strong stale copy straight to calm neutral copy

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_DEESCALATION_RULE_2026-03-15.md`
