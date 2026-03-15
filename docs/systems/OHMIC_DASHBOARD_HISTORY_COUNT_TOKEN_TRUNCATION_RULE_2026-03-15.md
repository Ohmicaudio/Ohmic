# Ohmic Dashboard History Count Token Truncation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the hidden-count token should truncate or simplify itself when count
presentation would otherwise overrun the compact history toggle.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_WIDTH_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_TOGGLE_COUNT_COMPACT_ABBREVIATION_RULE_2026-03-15.md`

## Core Principle

Truncation is a last-resort compactness tool.

The control should prefer readable counts before falling back to a shortened
representation.

## Recommended Truncation Rule

Only truncate after:

1. normal token presentation no longer fits
2. compact abbreviation still does not fit

If truncation is required, preserve the fact that the token represents a count
of hidden items.

## Acceptable Truncation Direction

Preferred fallback:

- show a capped compact count such as `99+`

This preserves useful scale without requiring unlimited width.

Do not truncate into ambiguous fragments like:

- `9...`
- `1+`
- `...`

## Why `99+`

- still reads like a count
- stays compact
- avoids making large hidden-history numbers dominate the control

## Zero Rule

If the count is zero:

- hide the token entirely

Truncation should never be used to display zero-state chrome.

## Guardrails

- truncate only after abbreviation has failed
- do not hide non-zero count meaning behind decorative truncation
- do not make truncation look like an error state
- do not let very large counts take over the toggle

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-toggle-count-overflow-rule`
