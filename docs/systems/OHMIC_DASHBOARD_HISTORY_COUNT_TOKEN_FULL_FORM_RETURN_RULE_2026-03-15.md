# Ohmic Dashboard History Count Token Full Form Return Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the hidden-count token should return from compact fallback back to
its fuller normal presentation once space pressure has eased.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_COMPACT_PRIORITY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_COLLAPSE_THRESHOLD_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_RECOVERY_RULE_2026-03-15.md`

## Core Principle

Return to the fuller form only after the layout has enough stable room to keep
it readable.

## Recommended Return Rule

When space pressure eases:

1. leave the token in its current compact form long enough to confirm the
   crowding has actually passed
2. step back up to the next fuller form
3. restore the full normal token only when it can fit without immediately
   collapsing again

## Why

- prevents flicker between normal and compact states
- restores clarity when the space is truly available again
- keeps the recovery path consistent with the earlier fallback order

## Guardrails

- do not jump directly from truncation to full form if the abbreviation tier is
  the safer intermediate step
- do not restore the full token on a brief layout wobble
- do not keep the compact form longer than needed once the control can breathe
  again

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-recovery-rule`
