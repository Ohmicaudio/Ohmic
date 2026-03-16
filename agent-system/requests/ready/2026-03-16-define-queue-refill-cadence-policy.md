Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Queue Refill Cadence Policy

## Goal

Define how often the system should perform queue refill checks and when refill
must happen immediately.

## Focus

- time-based cadence
- completion-count cadence
- family-pressure cadence
- manual override
- stale-board warnings

## Acceptance

- one refill-cadence packet is explicit
- queue refill timing becomes deliberate instead of ad hoc
