Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T151221Z-b4b69827

# Define Dashboard Summary Card Stale Recovery Threshold Rule

## Goal

Define what evidence or stability threshold should count as sufficient local
recovery before a summary card begins stepping down from stale language.

## Focus

- recovery threshold
- confidence requirements
- relationship to deescalation timing

## Acceptance

- one bounded stale-recovery-threshold packet exists
- it fits the stale recovery rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the evidence and stability threshold needed before a card can begin
  stale recovery
- blocked false recovery starts from one-off refreshes, minor time passage, or
  layout-only changes
- required local trust stabilization before deescalation and handback begin

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_THRESHOLD_RULE_2026-03-15.md`
