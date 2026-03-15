Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150509Z-330baef6

# Define Dashboard History Count Token Width Rule

## Goal

Define how much horizontal space the hidden-count token may consume before the
history toggle should simplify or truncate its presentation.

## Focus

- count token width limits
- compact-layout behavior
- relationship to separator and hide-zero rules

## Acceptance

- one bounded count-token-width packet exists
- it fits the history toggle count rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined width pressure as the trigger for count-token simplification
- established the fallback order from normal token to abbreviation to
  truncation
- kept the action text ahead of the token in readability priority

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_WIDTH_RULE_2026-03-15.md`
