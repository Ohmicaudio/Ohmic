# Ohmic Dashboard Summary Card Freshness Tie Breaker Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the dashboard should choose between equally eligible summary cards
when freshness density limits allow only one or a few hints.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_PRIORITY_ORDER_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_FRESHNESS_HINT_RULE_2026-03-15.md`

## Core Principle

When cards tie on general freshness priority, prefer the card whose stale
reading would most distort the user's next interpretation or action.

## Tie Break Order

When two or more cards are otherwise equally eligible, break ties in this
order:

1. higher trust-impact if stale
2. larger divergence from nearby dashboard state
3. stronger action relevance
4. better readability fit in the available layout

## 1. Trust-Impact Tie Break

Prefer the card whose stale state would most mislead trust or interpretation.

Examples:

- prefer a queue-health or blockers card over a cosmetic or lightweight status
  card if both are equally eligible

## 2. Divergence Tie Break

If trust impact is still similar, prefer the card whose age can diverge most
from the surrounding dashboard state.

Why:

- a local freshness hint matters most when the card can mislead independently of
  the page-level state

## 3. Action-Relevance Tie Break

If the tie still remains, prefer the card closest to immediate user action or
decision.

Examples:

- a card guiding whether the user should trust current queue or blocker state
  beats a card that is only informational

## 4. Layout-Fit Tie Break

If the cards are still effectively equal:

- prefer the card where the hint fits without crowding the header
- suppress the hint on the card that would become noisy or cramped

Layout should break the tie only after trust and action relevance are already
considered.

## What Not To Use As The First Tie Break

Do not choose based on:

- visual symmetry
- left-to-right card order alone
- whichever card was rendered first
- arbitrary rotation between cards

Those make the hint placement feel decorative instead of meaningful.

## Compact Example

If only one freshness hint fits and two cards are otherwise eligible:

- choose the card whose stale reading could change the user's trust in the
  current state
- if still tied, choose the card with more local divergence risk
- if still tied, choose the cleaner visual fit

## Guardrails

- do not let lower-consequence cards steal freshness space from higher-trust
  cards
- do not use layout convenience as the first tie-breaker
- do not scatter hints randomly between reloads
- do not let the tie-break rule contradict the established freshness priority
  order

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-title-row-crowding-fallback-rule`
- `define-dashboard-summary-card-freshness-density-rule`
