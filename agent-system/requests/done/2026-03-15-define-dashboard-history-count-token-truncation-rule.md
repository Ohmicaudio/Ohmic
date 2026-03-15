Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

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
