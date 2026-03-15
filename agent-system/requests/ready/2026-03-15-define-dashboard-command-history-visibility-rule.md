Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Command History Visibility Rule

## Goal

Define how much recent command history the dashboard should expose without
turning the command area into a noisy log.

## Focus

- most recent command visibility
- when to collapse older entries
- how to distinguish current pending command from historical commands

## Acceptance

- one bounded command-history visibility packet exists
- it matches the command box and recent-output behavior work
- it stays lightweight and dashboard-focused
