# Ohmic Dashboard Summary Card Freshness Placement Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define where a summary-card freshness hint should appear when it is shown so it
adds trust without visually crowding the card.

## Core Principle

Freshness belongs near identity, not in the middle of content.

If a card shows freshness, the hint should sit close enough to the card title
or status context to feel attached, but not so prominently that it competes with
the card’s main state.

## Recommended Placement

Preferred order:

1. near the card title row
2. near an existing low-emphasis status/meta row
3. in a compact footer/meta strip if the card already has one

Avoid placing freshness:

- in the body content center
- between key values and labels
- where it breaks scan order

## Title Adjacency Rule

When possible:

- place freshness adjacent to or just beneath the card title
- keep it visually tied to the card identity

This helps users understand it as card metadata, not primary content.

## Status Badge Relationship

If the card already has a primary status badge:

- freshness should sit below or beside it in lower emphasis
- freshness should not mimic the weight of a blocked, warning, or active badge

## Tight Layout Rule

On smaller cards or denser layouts:

- place freshness in the smallest readable metadata position
- prefer a single compact line over multiple timing fragments

If placement would crowd the title and status row, suppression may be better.

## Guardrails

- do not place freshness where it interrupts value reading
- do not give freshness the same hierarchy as the card’s main status
- do not repeat the freshness hint in multiple positions inside one card
- do not force placement when the card has no clean metadata space

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-title-adjacency-rule`
- `define-dashboard-summary-card-freshness-suppression-rule`
- `define-dashboard-summary-card-freshness-hint-rule`
