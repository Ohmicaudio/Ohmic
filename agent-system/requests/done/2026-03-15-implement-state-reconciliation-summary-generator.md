Status: done
Priority: high
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T180009Z-0d376d41

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

## Outcome

Completed on 2026-03-15.

Result:

- implemented a reconciliation generator that reads repo-backed ready, blocked,
  done, and active-claim truth before updating runtime summaries
- generated `ready_tasks.json`, `active_claims.json`,
  `reconciliation_summary.json`, and a refreshed `agent_state.json`
- surfaced mismatch markers explicitly so the dashboard can tell the difference
  between a stale snapshot and settled queue truth

## Artifact

- `B:\ohmic\tools\sync\reconcile-agent-json-runtime.ps1`
- `B:\ohmic\generated\agent-work\runtime\reconciliation_summary.json`
- `B:\ohmic\generated\agent-work\runtime\agent_state.json`
