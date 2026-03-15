# Ohmic Dashboard Summary Card Stale Recovery Freshness Handback Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how a summary card should hand back from recovery language into normal
freshness hinting once local trust has recovered.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_COPY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_DISMISSAL_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_HINT_RULE_2026-03-15.md`

## Core Principle

Once local recovery has been acknowledged and the recovery copy has done its
job, the card should rejoin the normal freshness system without a jarring copy
jump.

## Recommended Handback Rule

After recovery copy is dismissed:

- return the card to the standard freshness hint model
- do not leave a separate recovery label behind

This means the card should look like any other healthy summary card again.

## Preferred Handback Sequence

```text
stale wording
-> recovery copy
-> normal freshness hint
```

Do not jump from stale wording directly to a fresh-looking neutral state unless
the recovery confirmation was already shown briefly and clearly.

## Freshness Behavior After Handback

Once handed back:

- use the ordinary freshness hint rules
- let age and freshness work normally again
- stop treating the card as a special recovery surface

## Scope Rule

The handback is local to the card.

It should not imply:

- whole-dashboard recovery
- a broader runtime success banner

## Guardrails

- do not keep recovery wording and normal freshness hint visible together for
  long
- do not leave a stale-recovery label stuck after the card is healthy again
- do not skip the recovery acknowledgement entirely if the card was strongly
  stale moments earlier

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-freshness-priority-order-rule`
- `define-dashboard-summary-card-title-row-crowding-fallback-rule`
