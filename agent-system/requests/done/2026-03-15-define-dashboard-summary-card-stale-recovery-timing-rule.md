Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150929Z-e23f1f1d

# Define Dashboard Summary Card Stale Recovery Timing Rule

## Goal

Define how quickly a summary card should step back from stale recovery messaging
to neutral freshness once local trust has stabilized again.

## Focus

- recovery timing
- deescalation pacing
- relationship to stale recovery copy

## Acceptance

- one bounded stale-recovery-timing packet exists
- it fits the stale recovery and deescalation rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a short recovery-display window so stale recovery is visible but not
  sticky
- let busy higher-priority surfaces clear recovery wording sooner when needed
- tied timing to actual trust stabilization instead of using it as a fake
  recovery signal

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_TIMING_RULE_2026-03-15.md`
