Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Background Refresh Pause Rule

## Goal

Define how the dashboard should slow or pause refresh behavior when it is
backgrounded, hidden, or otherwise not the active surface.

## Focus

- hidden-tab behavior
- wake-up behavior on focus return
- relationship to stale-state and runner activity

## Acceptance

- one bounded background-refresh packet exists
- it fits the refresh cadence and idle rules
- it stays lightweight and operational
