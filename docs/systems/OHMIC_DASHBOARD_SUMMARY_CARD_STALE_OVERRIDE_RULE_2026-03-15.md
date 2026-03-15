# Ohmic Dashboard Summary Card Stale Override Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when a summary card should shift from neutral freshness hinting into a
more cautionary stale state without competing with stronger global warnings.

## Core Principle

Local stale override is for card-specific trust degradation, not for replacing
the dashboard’s global warning system.

Use it only when a card’s local data appears especially stale or mismatched
relative to nearby dashboard state.

## Trigger Rule

A card may enter local stale override when:

- its underlying data age materially exceeds nearby dashboard freshness
- reconciliation or source comparison suggests that card’s data is lagging
- the card would otherwise look fresh enough to mislead

## Global Relationship Rule

If a strong global stale or blocked state is already active:

- the card may still show local stale context
- but it must remain visually subordinate to the global state

Do not create competing emergency signals.

## Recommended Wording Direction

Neutral freshness:

- `Updated 2m ago`

Local stale override:

- `Card data may be stale`
- `This card may be behind current state`

Keep the wording narrower than a full-dashboard stale message.

## Visual Emphasis Rule

Local stale override should:

- increase emphasis relative to neutral freshness
- remain lighter than major blocked or global stale indicators

## Guardrails

- do not trigger local stale override for tiny freshness differences
- do not let a local card warning masquerade as a global failure state
- do not hide meaningful local staleness just because the dashboard is
  otherwise healthy
- do not show stale override on many cards at once without strong reason

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-local-vs-global-stale-copy-rule`
- `define-dashboard-summary-card-freshness-density-rule`
- `define-dashboard-summary-card-freshness-hint-rule`
