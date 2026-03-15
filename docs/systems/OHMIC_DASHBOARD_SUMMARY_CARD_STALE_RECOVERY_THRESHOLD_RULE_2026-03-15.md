# Ohmic Dashboard Summary Card Stale Recovery Threshold Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define what evidence or stability threshold should count as sufficient local
recovery before a summary card begins stepping down from stale language.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_DEESCALATION_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_COPY_RULE_2026-03-15.md`

## Core Principle

Recovery should begin only when local trust has actually stabilized, not just
because the card looks a little newer for a moment.

## Recommended Recovery Threshold

Begin stale recovery only when both are true:

- the local evidence that justified the stale state has materially cleared
- the card has remained locally trustworthy long enough to avoid immediate
  bounce-back

## Acceptable Evidence

Examples of sufficient recovery evidence:

- the card is aligned again with nearby dashboard state
- the local mismatch or lag signal is gone
- fresher supporting signals no longer contradict the card

## Insufficient Evidence

Do not start recovery only because:

- one refresh cycle happened
- a few seconds passed
- the user resized the layout
- the card temporarily looks better but still conflicts with stronger signals

## Stability Rule

Require a short stability window before beginning recovery messaging.

Suggested default:

- at least one stable refresh cycle or equivalent confirmation interval

The exact implementation may vary, but it must be enough to prevent obvious
stale/recovered flicker.

## Guardrails

- do not begin recovery while the card is still oscillating
- do not treat layout-only changes as recovery evidence
- do not hand back to freshness before the card is actually trustworthy again

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-recovery-freshness-handback-rule`
- `define-dashboard-summary-card-stale-recovery-timing-rule`
