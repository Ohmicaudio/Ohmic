Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define JSON Dashboard Input Writeback Flow

## Goal

Define how a user-facing dashboard input box should write commands into the
JSON loop safely and how the agent response should be written back for display.

## Focus

- input field shape
- pending vs handled command state
- response writeback location
- minimal safeguards against duplicate handling

## Acceptance

- one bounded writeback-flow packet exists
- it matches the JSON loop and dashboard render tasks already in `ready`
- it stays below the active product implementation lanes
