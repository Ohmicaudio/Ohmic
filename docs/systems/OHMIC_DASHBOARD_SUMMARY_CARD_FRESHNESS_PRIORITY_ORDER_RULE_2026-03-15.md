# Ohmic Dashboard Summary Card Freshness Priority Order Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define which summary cards should get freshness hints first when density limits
mean not every eligible card can show one.

## Core Principle

Freshness priority should follow trust value, not visual symmetry.

When only a few cards may show freshness, choose the cards where stale reading
would most distort understanding.

## Recommended Priority Order

Higher priority for card freshness hints:

1. cards with independently aging operational state
2. cards whose stale reading could mislead action or trust
3. cards whose content is not already explained by the global freshness label

Lower priority:

- cards that merely echo already-global state
- cards already carrying stronger warning or blocked state
- cards whose content is too lightweight to justify extra metadata

## Tie-Break Rule

If multiple cards seem equally eligible:

- prefer the card closest to immediate user interpretation or action
- prefer the card whose age can diverge most from nearby dashboard state

## Small-Surface Rule

On smaller layouts:

- show freshness on the single highest-priority eligible card only
- suppress lower-priority card hints sooner

## Guardrails

- do not distribute hints just for visual fairness
- do not hide the one card where freshness matters most
- do not let lower-priority cards steal freshness space from higher-trust cards
- do not make priority ordering depend only on layout position

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-freshness-tie-breaker-rule`
- `define-dashboard-summary-card-freshness-density-rule`
