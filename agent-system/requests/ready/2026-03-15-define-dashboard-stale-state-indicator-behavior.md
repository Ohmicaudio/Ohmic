Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Stale State Indicator Behavior

## Goal

Define how the dashboard should indicate that `agent_state.json` is stale,
reconciling, or healthy without pretending the summary is always current.

## Focus

- stale vs fresh indicator states
- when to show a warning
- how to avoid confusing summary staleness with fatal failure

## Acceptance

- one bounded stale-state indicator packet exists
- it fits the reconciliation and dashboard mapping work already queued
- it remains a lightweight UI/contract rule, not a full design system spec
