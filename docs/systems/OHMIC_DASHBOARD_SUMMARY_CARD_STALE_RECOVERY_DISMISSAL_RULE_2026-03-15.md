# Ohmic Dashboard Summary Card Stale Recovery Dismissal Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when a summary card should fully dismiss stale-recovery language instead
of continuing to show residual recovery wording after trust has normalized.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_TIMING_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_COPY_RULE_2026-03-15.md`

## Core Principle

Once recovery has been acknowledged and local trust is stable again, the card
should return to normal freshness language without leaving a recovery tail
behind.

## Recommended Dismissal Rule

Dismiss the recovery copy when both are true:

- the brief recovery timing window has elapsed
- the card still looks locally trustworthy

After dismissal:

- return to the normal freshness hint or neutral state

## Early Dismissal Rule

Allow earlier dismissal when:

- higher-priority card or page state needs the space
- the recovery wording would crowd the card
- the user has already received the recovery signal and the card is clearly
  stable

## Do Not Dismiss Yet When

Do not dismiss recovery copy yet if:

- the card is still wobbling between stale and recovered states
- the trust signal is not yet stable
- the UI would immediately bounce back into stale wording

## Guardrails

- do not let recovery wording become a sticky permanent state
- do not remove recovery wording before the user had a fair chance to notice it
- do not dismiss into neutral if the card is still unstable

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-recovery-copy-suppression-rule`
