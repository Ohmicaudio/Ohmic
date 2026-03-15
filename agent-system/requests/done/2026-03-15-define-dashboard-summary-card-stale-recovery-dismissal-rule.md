Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150929Z-e23f1f1d

# Define Dashboard Summary Card Stale Recovery Dismissal Rule

## Goal

Define when a summary card should fully dismiss stale-recovery language instead
of continuing to show residual recovery wording after trust has normalized.

## Focus

- dismissal conditions
- relationship to stale recovery timing
- return to neutral freshness

## Acceptance

- one bounded stale-recovery-dismissal packet exists
- it fits the stale recovery rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the dismissal conditions that end recovery wording and return the card
  to normal freshness
- prevented recovery copy from becoming a sticky permanent state
- kept dismissal dependent on stable trust recovery rather than time alone

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_DISMISSAL_RULE_2026-03-15.md`
