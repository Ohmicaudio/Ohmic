Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150302Z-46a0e011

# Define Dashboard Summary Card Stale Recovery Copy Rule

## Goal

Define how a summary card should communicate recovery after a local stale state
improves so the UI feels honest without lingering in warning language.

## Focus

- recovery wording
- relationship to stale-copy deescalation
- transition back to neutral freshness

## Acceptance

- one bounded stale-recovery-copy packet exists
- it fits the stale-copy deescalation rule
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined short local recovery phrases that acknowledge improvement without
  sounding global or dramatic
- made recovery copy a brief transitional confirmation rather than a new
  permanent label
- tied recovery messaging to the deescalation path back toward neutral

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_COPY_RULE_2026-03-15.md`
