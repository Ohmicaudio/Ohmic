Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Summary Card Stale Copy Deescalation Rule

## Goal

Define how a summary card should step stale wording back down once local trust
improves so the UI does not stay alarmed after recovery.

## Focus

- deescalation conditions
- wording step-down behavior
- relationship to stale-copy severity transitions

## Acceptance

- one bounded stale-copy-deescalation packet exists
- it fits the stale-copy severity and transition rules
- it stays lightweight and dashboard-focused
