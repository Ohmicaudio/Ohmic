# Ohmic Dashboard History Preview Word Budget Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how much wording budget the collapsed history preview may consume before
the control should simplify to a more compact form.

## Core Principle

The preview has a budget, not a right.

Once the wording begins to crowd the action text, count, or current command
context, the control should simplify.

## Recommended Rule

Keep preview wording short enough that:

- the action text remains readable
- the hidden-count signal remains legible
- the control still feels like one compact row

If that budget is exceeded:

- prefer truncation, abbreviation, or count-first fallback

## Relationship To Priority

Word budget works with preview priority:

- readability wins first
- hint richness is secondary once the control becomes crowded

## Guardrails

- do not let preview wording expand until the control reads like a sentence
- do not preserve hint detail after the current command anchor becomes harder to read
- do not budget by raw character count alone without checking readability
- do not use word budget so aggressively that preview never helps at all

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-priority-order-rule`
- `define-dashboard-history-preview-simplification-threshold-rule`
