Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Queue Refill Trigger Model

## Goal

Define the explicit triggers that should force queue refill before the board
starves.

## Focus

- count-based triggers
- throughput-based triggers
- family-pressure triggers
- stale-refill triggers
- worker-count triggers

## Acceptance

- one refill-trigger packet is explicit
- queue refill stops depending on gut feel
