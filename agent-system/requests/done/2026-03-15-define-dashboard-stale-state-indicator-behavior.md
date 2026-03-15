Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T140050Z-e2446e76

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

## Outcome

Completed on 2026-03-15.

Result:

- defined four explicit freshness states: `fresh`, `reconciling`, `stale`, and
  `unknown`
- separated summary trust from runtime failure so stale summaries do not read as
  crashes
- fixed where the indicator should live and how it should talk in the first
  dashboard version

## Artifact

- `docs/systems/OHMIC_DASHBOARD_STALE_STATE_INDICATOR_BEHAVIOR_2026-03-15.md`
