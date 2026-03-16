Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Queue Health Runtime Snapshot Shape

## Goal

Define the runtime snapshot object that packages queue headroom, pressure, and
recent refill state for projections and shell modules.

## Focus

- global counts
- status bands
- refill summary
- pressured families
- generated timestamp

## Acceptance

- one queue-health snapshot packet is explicit
- runtime projections can read one stable queue-health object
