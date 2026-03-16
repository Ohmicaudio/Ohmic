Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094732Z-9a684b93

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

## Result

Done. Starvation warning rules now live in
`docs/systems/OHMIC_QUEUE_STARVATION_WARNING_RULES_2026-03-16.md`, defining
global and same-family warning classes, stale-refill and reserve-exhaustion
warnings, and structured alert outputs.
