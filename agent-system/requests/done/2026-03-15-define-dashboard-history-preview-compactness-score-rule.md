Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T152244Z-e6a7f592

# Define Dashboard History Preview Compactness Score Rule

## Goal

Define a simple compactness heuristic for deciding when history preview is still
helpful versus when it has become too dense for the control.

## Focus

- compactness heuristic
- readability signals
- relationship to preview simplification threshold

## Acceptance

- one bounded preview-compactness packet exists
- it fits the history preview rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a simple keep-or-simplify heuristic for preview density
- tied preview usefulness to readability, word budget, and control balance
- kept the rule lightweight instead of turning it into a complex scoring model

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_COMPACTNESS_SCORE_RULE_2026-03-15.md`
