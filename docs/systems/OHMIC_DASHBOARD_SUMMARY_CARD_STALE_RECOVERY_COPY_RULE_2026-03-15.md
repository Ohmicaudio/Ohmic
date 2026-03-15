# Ohmic Dashboard Summary Card Stale Recovery Copy Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how a summary card should communicate recovery after a local stale state
improves so the UI feels honest without lingering in warning language.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_DEESCALATION_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_HINT_RULE_2026-03-15.md`

## Core Principle

Recovery copy should confirm that the card is improving without pretending the
warning never existed.

## Recommended Recovery Behavior

When the card begins recovering from a stale state:

- step down the stale wording first
- then allow a brief recovery cue
- then return to the normal freshness hint

## Recovery Copy Direction

Use short, calm recovery phrasing.

Good examples:

- `Card refreshed`
- `Card back in sync`
- `Card current again`

These work because they:

- acknowledge improvement
- stay local in scope
- do not sound like a major success banner

## What To Avoid

Do not use:

- `Fixed`
- `Recovered from failure`
- `All clear`
- `Everything current`

Why:

- too broad
- too global
- too dramatic for a small local recovery event

## Relationship To Neutral State

Recovery copy should be temporary.

After a brief confirmation window:

- remove the recovery wording
- return to the normal freshness hint or neutral state

The goal is to reassure, not to create a new permanent label.

## Local Scope Rule

Recovery copy must stay clearly local to the card.

Good:

- `Card current again`

Bad:

- `Dashboard recovered`

## Compact Example

```text
strong stale -> moderate stale -> mild stale -> Card current again -> normal freshness
```

## Guardrails

- do not skip straight from strong stale to triumphant recovery copy
- do not let recovery copy linger longer than the stale wording it replaced
- do not use global recovery language for a local card
- do not keep both strong stale and recovery wording visible at once

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-recovery-copy-dwell-rule`
- `define-dashboard-summary-card-recovery-copy-suppression-rule`
