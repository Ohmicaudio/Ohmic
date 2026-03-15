Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Summary Card Freshness Tie Breaker Rule

## Goal

Define how the dashboard should choose between equally eligible summary cards
when freshness density limits allow only one or a few hints.

## Focus

- tie-break heuristics
- trust impact ordering
- small-surface decision rules

## Acceptance

- one bounded freshness tie-break packet exists
- it fits the summary-card freshness priority order rule
- it stays lightweight and dashboard-focused
