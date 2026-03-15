# Ohmic Dashboard History Toggle Count Placement Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define where the hidden-count token should sit relative to the history toggle
action text so the label remains compact and legible.

## Core Principle

Action first, count second.

The user should first understand what the control does, then how much history
is hidden.

## Recommended Placement

Preferred forms:

- action text followed by compact count
- action text with count in lower-emphasis adjacent token

Examples:

- `Show older commands (3)`
- `Show older commands · 3`

## Zero Rule

If no hidden history remains:

- suppress the count token
- do not show empty count chrome

## Compact Layout Rule

On smaller surfaces:

- keep the count short
- avoid placing it before the action text
- avoid separators that consume more space than the count itself

## Guardrails

- do not let the count outrank the action wording
- do not move the count so far away that association is lost
- do not show a zero-count token
- do not use noisy punctuation that hurts scanability

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-toggle-count-separator-rule`
- `define-dashboard-history-toggle-count-hide-zero-rule`
- `define-dashboard-history-toggle-label-transition-rule`
