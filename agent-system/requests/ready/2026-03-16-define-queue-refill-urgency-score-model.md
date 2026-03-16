Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Queue Refill Urgency Score Model

## Goal

Define a compact urgency score that expresses how badly a queue or family needs
refill attention.

## Focus

- global floor pressure
- same-family starvation
- refill age
- active-worker imbalance
- operator override

## Acceptance

- one urgency-score packet is explicit
- refill cards and warnings can sort by urgency instead of raw counts alone
