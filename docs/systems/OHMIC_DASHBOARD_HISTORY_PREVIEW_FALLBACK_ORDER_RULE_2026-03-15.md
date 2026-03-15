# Ohmic Dashboard History Preview Fallback Order Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the order in which the history control should simplify itself from full
preview to truncated preview to count-only presentation.

## Core Principle

Simplify in clear steps instead of jumping randomly between states.

The control should degrade gracefully as space pressure increases.

## Recommended Fallback Order

1. full compact preview if clearly readable
2. truncated preview if meaning still survives
3. count-only presentation if preview no longer helps
4. further compact count behavior only if count itself becomes too heavy

## Trigger Rule

Move down the fallback order when:

- preview density becomes too high
- mobile/tight layout pressure increases
- current command area needs more room

## Recovery Rule

If space pressure later improves:

- the control may step back up the ladder
- but only when readability genuinely improves

## Guardrails

- do not skip directly to count-only if a short clear preview still works
- do not cling to preview text after it becomes noisy
- do not oscillate between fallback states unnecessarily
- do not let fallback order compete with the current command anchor

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-word-budget-rule`
- `define-dashboard-history-preview-count-only-default-rule`
