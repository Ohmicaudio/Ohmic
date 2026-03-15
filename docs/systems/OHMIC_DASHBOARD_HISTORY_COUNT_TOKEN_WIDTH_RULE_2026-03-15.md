# Ohmic Dashboard History Count Token Width Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how much horizontal space the hidden-count token may consume before the
history toggle should simplify or truncate its presentation.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_TOGGLE_COUNT_PLACEMENT_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_TOGGLE_COUNT_HIDE_ZERO_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_TOGGLE_COUNT_SEPARATOR_RULE_2026-03-15.md`

## Core Principle

The hidden-count token should stay informative, but it must not become wider
than the compact toggle can comfortably support.

## Recommended Width Rule

Allow the token to display its normal compact form while it still fits cleanly
beside the action text.

If the token begins to dominate the toggle width:

- simplify it first
- abbreviate if needed
- truncate only as a later fallback

## Practical Width Boundary

Treat the count token as too wide when:

- it visibly competes with the action label
- it pushes the toggle toward awkward wrapping
- it makes the separator or spacing consume disproportionate space

The action text should remain the first readable element.

## Preferred Order Under Pressure

When width pressure appears, use this order:

1. normal count token
2. compact abbreviation
3. truncation fallback

Do not jump straight to truncation if a clear compact form still fits.

## Zero Interaction

If the hidden count is `0`:

- hide the token entirely

Width rules do not apply to a token that should already be suppressed.

## Guardrails

- do not let the count token become visually larger than the action meaning
- do not use width pressure as an excuse to hide meaningful non-zero counts too
  early
- do not preserve a wide count token if it hurts toggle readability

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-toggle-count-compact-abbreviation-rule`
- `define-dashboard-history-count-token-truncation-rule`
