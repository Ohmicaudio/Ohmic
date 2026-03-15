Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150509Z-330baef6

# Define Dashboard History Count Token Truncation Rule

## Goal

Define how the hidden-count token should truncate or simplify itself when count
presentation would otherwise overrun the compact history toggle.

## Focus

- count token truncation behavior
- compact fallback behavior
- relationship to token width and abbreviation rules

## Acceptance

- one bounded count-token-truncation packet exists
- it fits the history count token rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined truncation as a last-resort fallback after normal and abbreviated
  forms fail
- capped large hidden counts with a compact `99+` style representation
- kept zero-state suppression separate from truncation behavior

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_TRUNCATION_RULE_2026-03-15.md`
