Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Last Updated Label Rule

## Goal

Define how the dashboard should show the freshness of its current summary state
without turning timestamps into noisy chrome.

## Focus

- where the freshness label appears
- when it should show relative vs exact time
- how it should react to stale-state conditions

## Acceptance

- one bounded freshness-label packet exists
- it fits the refresh cadence and stale-state rules
- it stays lightweight and dashboard-focused
