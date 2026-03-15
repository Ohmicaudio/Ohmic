Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard History Expansion State Persistence Rule

## Goal

Define whether the dashboard should remember command-history expanded/collapsed
state across small refreshes, focus changes, and navigation returns.

## Focus

- short-lived state persistence
- reset conditions
- relationship to compact dashboard behavior

## Acceptance

- one bounded history-state packet exists
- it fits the history expansion and toggle rules
- it stays lightweight and dashboard-focused
