# Ohmic Dashboard History Toggle Count Separator Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the hidden-count token should be visually separated from the history
toggle action text without wasting space or hurting scanability.

## Core Principle

Separator should support readability, not demand attention.

Use a lightweight separator only when it clarifies the relationship between
action text and hidden count.

## Recommended Rule

Prefer:

- simple spacing
- a light punctuation mark
- or a subtle divider that does not dominate the label

Examples:

- `Show older commands (3)`
- `Show older commands · 3`

## Compact Layout Rule

On tighter surfaces:

- prefer the shortest still-clear separator
- avoid decorative or wide punctuation

## Guardrails

- do not use separators that consume more space than the count
- do not make the separator visually louder than the action text
- do not vary separator style across similar states without reason
- do not let separator choice reduce label legibility

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-toggle-count-compact-abbreviation-rule`
- `define-dashboard-history-toggle-count-placement-rule`
