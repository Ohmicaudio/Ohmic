# Ohmic Dashboard History Count Token Compact Priority Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define which compact count presentation should be preferred first when the
history toggle needs to save horizontal space.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_WIDTH_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_TOGGLE_COUNT_COMPACT_ABBREVIATION_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_TRUNCATION_RULE_2026-03-15.md`

## Core Principle

Choose the smallest presentation that still reads clearly as a hidden-item
count.

## Preferred Compact Priority

When space pressure begins, prefer compact presentations in this order:

1. normal count token
2. compact abbreviation
3. truncation fallback

Do not reverse that order.

## Why

- the normal token is clearest
- abbreviation preserves meaning with less chrome
- truncation is the last-resort fallback when the token still will not fit

## Readability Rule

Prefer the compact presentation that preserves count meaning with the least
extra explanation.

That means:

- keep a readable count visible as long as possible
- avoid overly clever symbolic shorthand
- do not jump straight to `99+` if a compact abbreviation still fits

## Guardrails

- do not let the fallback order depend on arbitrary layout whim
- do not prefer truncation over a still-readable abbreviation
- do not keep a wider normal token once it has begun to crowd the action text

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-overflow-fallback-rule`
