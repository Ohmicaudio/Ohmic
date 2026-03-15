# Ohmic Dashboard History Preview Priority Order Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define which preview simplification concerns should win first when the history
control must choose between preserving hint richness and preserving compactness.

## Core Principle

Preview should optimize for clarity first, helpfulness second.

When the control cannot fully satisfy both, it should protect the most
important reading priorities in a predictable order.

## Recommended Priority Order

1. keep the action text clear
2. keep hidden-count meaning legible
3. protect current command area readability
4. preserve a helpful preview hint if space remains

## Meaning

This means preview richness should yield before:

- the toggle action becomes ambiguous
- the count becomes hard to interpret
- the compact dashboard row becomes cluttered

## Relationship To Hint Vs Count Balance

If preview and count are competing:

- count and action usually win
- preview remains the most optional element of the three

## Guardrails

- do not preserve preview richness at the expense of basic control clarity
- do not drop preview so fast that the control never offers useful hinting
- do not let count dominate action text either
- do not make the priority ordering depend on arbitrary styling choices

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-hint-vs-count-balance-rule`
- `define-dashboard-history-preview-simplification-threshold-rule`
