# Ohmic Dashboard Summary Card Stale Copy Deescalation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how a summary card should step stale wording back down once local trust
improves so the UI does not stay alarmed after recovery.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_TRANSITION_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_ESCALATION_THRESHOLD_RULE_2026-03-15.md`

## Core Principle

Local stale wording should relax when trust improves, but it should do so in a
stable step-down sequence rather than snapping unpredictably between extremes.

## Recommended Deescalation Order

Step stale wording down in one direction:

```text
strong -> moderate -> mild -> neutral freshness
```

Do not jump from strong local stale copy directly to a fully neutral state
unless the card has clearly recovered and the UI has an explicit recovery
moment.

## Deescalation Trigger

Step the wording down when:

- the local evidence that justified the stronger wording is no longer present
- the card looks more aligned with nearby dashboard state
- the card is regaining normal trust without needing a global stale warning

## Evidence Rule

Use the same kind of evidence for stepping down that was required for stepping
up.

Meaning:

- remove strong wording only when strong local mistrust is no longer justified
- remove moderate wording only when the card is no longer materially behind

Do not deescalate simply because a few seconds passed.

## Pace Rule

Deescalation should be calmer than escalation.

Why:

- stale states should alert quickly when trust drops
- recovery should feel honest and stable, not flickery or overeager

## What To Avoid

Do not:

- jump between strong and mild wording repeatedly on minor signal changes
- return to neutral before the card actually looks trustworthy again
- keep strong stale wording after the supporting evidence is gone

## Compact Example

```text
strong   -> Card data may not reflect current state
moderate -> Card data may be behind current state
mild     -> Card may be stale
neutral  -> freshness hint only
```

## Guardrails

- deescalate one step at a time unless recovery is clearly complete
- do not tie deescalation to layout changes
- do not let the card stay alarmed after local trust has recovered
- do not let the wording oscillate under small noisy state changes

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-recovery-copy-rule`
- `define-dashboard-summary-card-stale-recovery-dwell-rule`
