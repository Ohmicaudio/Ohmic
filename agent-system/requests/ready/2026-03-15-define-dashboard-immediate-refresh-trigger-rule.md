Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Immediate Refresh Trigger Rule

## Goal

Define the exact events that should trigger a near-immediate dashboard refresh
instead of waiting for the normal polling cadence.

## Focus

- qualifying events
- debounce or collapse behavior
- relationship to reconciliation

## Acceptance

- one bounded immediate-trigger packet exists
- it fits the refresh cadence and acknowledgement rules
- it stays lightweight and contract-focused
