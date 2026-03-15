# Ohmic Dashboard History Count Token Overflow Fallback Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the fallback order when the hidden-count token becomes too large for the
history toggle’s compact layout.

## Core Principle

Overflow should degrade predictably, not opportunistically.

When the count token becomes too large, the control should follow a clear
fallback path that protects action readability first.

## Recommended Fallback Order

1. keep normal count if still readable
2. prefer a compact count presentation
3. simplify or abbreviate count if still clear
4. suppress or further reduce count only when clearer options are exhausted

## Relationship To Width

Overflow fallback begins only after width pressure is real enough to hurt
readability.

## Guardrails

- do not skip directly to the most aggressive fallback if a milder one is clear
- do not preserve a large count token once it harms action readability
- do not let fallback behavior vary randomly by tiny layout differences
- do not make overflow logic more complex than the control itself

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-collapse-threshold-rule`
- `define-dashboard-history-count-token-compact-priority-rule`
