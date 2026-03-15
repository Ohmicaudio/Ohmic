Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T151942Z-d1783e6b

# Define Dashboard History Count Token Collapse Threshold Rule

## Goal

Define the point at which the hidden-count token should stop trying to preserve
its fuller compact forms and step into stronger overflow fallback.

## Focus

- collapse threshold
- readability breakpoints
- relationship to overflow fallback rules

## Acceptance

- one bounded count-collapse-threshold packet exists
- it fits the history count token rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the readability breakpoints that justify leaving fuller count-token
  forms behind
- tied collapse to visible crowding and single-line failure instead of vague
  compactness
- aligned collapse with the later recovery path so both directions share one
  state model

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_COLLAPSE_THRESHOLD_RULE_2026-03-15.md`
