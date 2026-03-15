Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T151434Z-c05493ba

# Define Dashboard History Count Token Overflow Fallback Rule

## Goal

Define the fallback order when the hidden-count token becomes too large for the
history toggle’s compact layout.

## Focus

- overflow fallback order
- simplification priority
- relationship to width and truncation rules

## Acceptance

- one bounded count-overflow packet exists
- it fits the history count token rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the overflow fallback sequence as normal token, compact abbreviation,
  truncation, then zero-state hide
- kept overflow behavior stepwise and readable instead of jumping straight to a
  compressed badge
- aligned the rule to the count-token compact-priority packet for consistent
  fallback behavior

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_OVERFLOW_FALLBACK_RULE_2026-03-15.md`
