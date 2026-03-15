# Ohmic Dashboard History Hidden Count Copy Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the dashboard should describe hidden older command count when command
history is collapsed behind an expansion affordance.

## Core Principle

The count should orient the user quickly without turning the toggle into a
sentence.

Keep it short, accurate, and readable on tight layouts.

## Recommended Copy Pattern

Use a short hidden-count indicator alongside the expansion affordance.

Examples:

- `Show 3 older commands`
- `View 1 older command`
- `Recent history (4 hidden)`

## Singular / Plural Rule

Use correct singular/plural handling:

- `1 older command`
- `2 older commands`

Avoid awkward generic labels when a simple count can stay human-readable.

## Tight Layout Rule

On smaller surfaces:

- prefer the shortest still-clear form

Examples:

- `3 hidden`
- `4 older`

As long as the meaning remains obvious in context.

## Guardrails

- do not make the hidden-count copy longer than the control needs
- do not omit the count when it materially helps orientation
- do not use copy so short that the user cannot tell it refers to older command
  history
- do not let the hidden-count text outrank the current command state

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-expansion-toggle-rule`
- `define-dashboard-history-collapsed-preview-rule`
