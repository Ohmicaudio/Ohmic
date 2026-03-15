# Ohmic Dashboard Summary Card Title Adjacency Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how close a freshness hint should sit to the summary-card title so it
reads as card metadata instead of competing body content.

## Core Principle

Adjacency creates association.

If the freshness hint belongs to the card identity, it should live close enough
to the title to read as metadata, not as a separate secondary headline.

## Recommended Rule

Prefer one of these arrangements:

- same title row in lower emphasis
- immediately beneath the title row
- in a compact metadata strip directly adjacent to the title area

## Crowding Rule

If the title row already contains:

- long title text
- a prominent status badge
- other important metadata

then move the freshness hint to the nearest lower-emphasis metadata position
instead of squeezing it into visual conflict.

## Visual Hierarchy Rule

The freshness hint should remain:

- visually tied to the title
- clearly secondary to the title text
- lower emphasis than a primary status badge

## Guardrails

- do not push freshness into the card body just to stay on the same row
- do not crowd the title row until readability drops
- do not separate freshness so far that it stops reading as card metadata
- do not let adjacency outrank clarity on tight surfaces

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-title-row-crowding-fallback-rule`
- `define-dashboard-summary-card-freshness-placement-rule`
