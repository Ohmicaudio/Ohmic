Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

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

## Result

Defined the refill urgency score model and implemented the first evaluator in tools/sync/queue-health/refill-urgency-score.ps1.
