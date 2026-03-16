Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Queue Headroom Dashboard Metrics

## Goal

Define the metrics and cards that should show queue headroom in the shared
runtime/dashboard layer.

## Focus

- hot-ready count
- warm reserve count
- total queueable count
- same-family pressure
- refill age

## Acceptance

- one headroom-metrics packet is explicit
- queue health can be monitored directly instead of guessed from folder counts
