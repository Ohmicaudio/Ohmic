Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Queue Pressure Metric Family

## Goal

Define the metrics that show when a queue or task family is approaching starvation.

## Focus

- hot-ready count
- same-family ready count
- refill age
- active-worker ratio
- warm reserve depth

## Acceptance

- one queue-pressure packet is explicit
- refill decisions can use real metrics instead of guesswork
