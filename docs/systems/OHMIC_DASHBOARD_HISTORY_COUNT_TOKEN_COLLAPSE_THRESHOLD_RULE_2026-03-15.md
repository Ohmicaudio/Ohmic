# Ohmic Dashboard History Count Token Collapse Threshold Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the point at which the hidden-count token should stop trying to preserve
its fuller compact forms and step into stronger overflow fallback.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_COMPACT_PRIORITY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_OVERFLOW_FALLBACK_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_TRUNCATION_RULE_2026-03-15.md`

## Core Principle

The token should collapse only when the current form is measurably harming the
toggle's readability.

## Recommended Collapse Threshold

Treat the token as ready to collapse when any of these become true:

1. the count token crowds the action label enough that the control stops
   reading as one unit
2. the normal token no longer fits inside the intended single-line layout
3. the next more compact form would clearly restore readability

Do not collapse earlier than that.

## Why

- keeps the fuller form visible as long as it is still readable
- avoids premature compacting that makes the control feel jumpy
- gives the overflow sequence a clear trigger instead of a vague small-screen
  heuristic

## Guardrails

- do not collapse just because the layout is compact in general
- do not wait until the control is already broken before collapsing
- do not use collapse threshold as a substitute for the later overflow order

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-recovery-rule`
