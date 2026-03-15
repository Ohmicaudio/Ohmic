Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T151221Z-b4b69827

# Define Dashboard Summary Card Stale Recovery Freshness Handback Rule

## Goal

Define how a summary card should hand back from recovery language into normal
freshness hinting once local trust has recovered.

## Focus

- recovery-to-freshness transition
- wording handback behavior
- relationship to dismissal timing

## Acceptance

- one bounded recovery-handback packet exists
- it fits the stale recovery rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the handback from temporary recovery copy into the normal freshness
  hint system
- kept recovery acknowledgement local to the card instead of implying
  whole-dashboard recovery
- prevented stale-recovery wording from lingering after the card returned to
  ordinary freshness behavior

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_FRESHNESS_HANDBACK_RULE_2026-03-15.md`
