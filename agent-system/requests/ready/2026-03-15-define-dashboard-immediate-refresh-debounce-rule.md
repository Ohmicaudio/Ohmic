Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Immediate Refresh Debounce Rule

## Goal

Define how nearby immediate-refresh triggers should collapse into a single
refresh burst so meaningful events stay snappy without causing refresh thrash.

## Focus

- debounce window
- trigger coalescing
- relationship to reconciliation escalation

## Acceptance

- one bounded immediate-debounce packet exists
- it fits the immediate-trigger and refresh-cadence rules
- it stays lightweight and operational
