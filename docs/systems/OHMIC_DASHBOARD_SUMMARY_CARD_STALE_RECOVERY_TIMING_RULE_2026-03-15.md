# Ohmic Dashboard Summary Card Stale Recovery Timing Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how quickly a summary card should step back from stale recovery messaging
to neutral freshness once local trust has stabilized again.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_RECOVERY_COPY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_DEESCALATION_RULE_2026-03-15.md`

## Core Principle

Recovery messaging should stay long enough to reassure, but not so long that it
becomes another stale-looking badge.

## Recommended Timing

After the card has stepped down from stale wording and entered recovery copy:

- show the recovery copy briefly
- then return to the normal freshness hint

Suggested default window:

- `8-15` seconds

## Why

- this is long enough for the user to notice the recovery
- short enough to avoid making recovery look like a permanent state

## Relationship To Deescalation

Use this timing only after stale wording has already stepped down
appropriately.

Do not use recovery copy as a shortcut around the normal deescalation path.

## Quiet Surface Rule

If the dashboard is otherwise calm:

- the recovery copy may remain for the full suggested window

If the surface becomes busy with new higher-priority state:

- allow the recovery copy to clear sooner

## Guardrails

- do not let recovery copy linger longer than needed
- do not dismiss it so fast that the user misses the trust recovery
- do not use timing alone to fake recovery if trust has not actually stabilized

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-recovery-dismissal-rule`
