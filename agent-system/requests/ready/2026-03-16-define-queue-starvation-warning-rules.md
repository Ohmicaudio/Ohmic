Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Queue Starvation Warning Rules

## Goal

Define the thresholds and warnings that should fire when the board approaches starvation.

## Focus

- global hot-ready thresholds
- same-family starvation
- worker-to-ready imbalance
- refill delay warnings
- operator alert rules

## Acceptance

- one starvation-warning packet is explicit
- queue starvation becomes detectable before it reaches zero
