# Ohmic Dashboard Summary Card Freshness Suppression Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when summary-card freshness hints should stay hidden so the dashboard
does not repeat the same timing signal everywhere.

## Core Principle

If a freshness hint adds no clarity, suppress it.

The goal is trust and readability, not timestamp wallpaper.

## Suppression Cases

Hide card freshness hints when:

- the card would show the same freshness as the global last-updated label
- the card is too small or dense for extra metadata
- the dashboard is already showing a stronger global stale or blocked state
- the hint would repeat across most cards with no meaningful distinction

## Small Surface Rule

On tighter layouts:

- suppress card freshness hints sooner
- rely more on the main dashboard freshness label

## Priority Rule

If the dashboard is already communicating:

- blocked
- needs-input
- or strongly stale global state

then card freshness hints should usually step back rather than competing for
attention.

## Redundancy Rule

If multiple cards would all show materially identical freshness:

- prefer no card-level hint
- or show only the one card where freshness matters most

## Guardrails

- do not render freshness hints just because space technically exists
- do not let repeated hints crowd out actual card content
- do not suppress the only useful local trust signal when a card can age on its
  own
- do not make suppression rules so aggressive that useful local freshness
  disappears everywhere

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-freshness-placement-rule`
- `define-dashboard-summary-card-freshness-density-rule`
- `define-dashboard-summary-card-stale-override-rule`
