Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Summary Card Stale Recovery Timing Rule

## Goal

Define how quickly a summary card should step back from stale recovery messaging
to neutral freshness once local trust has stabilized again.

## Focus

- recovery timing
- deescalation pacing
- relationship to stale recovery copy

## Acceptance

- one bounded stale-recovery-timing packet exists
- it fits the stale recovery and deescalation rules
- it stays lightweight and dashboard-focused
