Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Refresh Cadence Rule

## Goal

Define how often the dashboard should refresh live JSON state and when it
should force a stronger reconciliation instead of a simple visual refresh.

## Focus

- normal refresh cadence
- when to refresh immediately
- when to defer to reconciliation

## Acceptance

- one bounded refresh-cadence packet exists
- it fits the reconciliation and stale-state rules already defined
- it stays lightweight and operational
