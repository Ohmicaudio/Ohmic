# Ohmic Dashboard History Count Token Overflow Fallback Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the fallback order when the hidden-count token becomes too large for the
history toggle's compact layout.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_COMPACT_PRIORITY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_WIDTH_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_TRUNCATION_RULE_2026-03-15.md`

## Core Principle

Overflow should simplify the token step by step instead of collapsing it into a
hard-to-read badge.

## Recommended Overflow Fallback Order

When the count token becomes too large:

1. keep the normal token if it still fits
2. move to the compact abbreviation form
3. move to the truncation form such as `99+`
4. if the count is zero, hide the token entirely

## Why

- preserves meaning for as long as possible
- keeps the control readable
- avoids abrupt jumps from normal display to heavily compressed fallback

## Overflow Rule

Treat the token as overflowing when:

- it visually crowds the action label
- it pushes the toggle toward poor wrapping
- the compact control no longer reads as one coherent unit

## Guardrails

- do not skip the abbreviation step if it would still fit
- do not let truncation become the default
- do not use overflow behavior to suppress a meaningful non-zero count
- do not let the fallback path behave differently for identical layout pressure

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-hint-vs-count-balance-rule`
