Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic

# Implement State Reconciliation Summary Generator

## Goal

Generate a machine-readable summary that reconciles repo truth, queue truth, and
JSON loop state so the dashboard can expose current status without guessing.

## Source

- `docs/systems/OHMIC_SHARED_SYSTEM_CANONICAL_CONTROL_SURFACES_2026-03-15.md`
- `docs/systems/OHMIC_JSON_AGENT_LOOP_MODEL_2026-03-15.md`

## Focus

- ready count
- active claims
- stale-state warnings
- blocked and done summaries
- mismatch markers

## Acceptance

- one summary artifact is generated from current repo truth
- obvious mismatch states are surfaced explicitly
- the output is shaped for dashboard consumption
