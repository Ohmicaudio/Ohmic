# Ohmic Dashboard History Preview Density Threshold Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how much preview text density is acceptable before the history control
should switch to a simpler count-first presentation.

## Core Principle

Preview should stay sparse enough to remain a hint.

Once preview density starts making the control feel like a second command row,
the dashboard should simplify back toward count-first presentation.

## Recommended Rule

Reduce preview richness when:

- preview text consumes too much of the control width
- the action text and count begin competing for space
- the current command area already feels visually dense

## Relationship To Mobile Suppression

Mobile suppression is the strongest compact case.

But density threshold may still trigger count-first fallback on wider layouts if
preview wording becomes too heavy.

## Guardrails

- do not treat any visible preview as automatically acceptable
- do not keep preview text once it harms scanability
- do not switch so aggressively that preview never meaningfully appears
- do not ignore the relationship between preview density and current command
  clarity

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-word-budget-rule`
- `define-dashboard-history-preview-fallback-order-rule`
