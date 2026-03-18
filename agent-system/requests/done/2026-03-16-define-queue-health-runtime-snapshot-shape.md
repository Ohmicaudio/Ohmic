Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

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

## Result

Defined the compact queue-health runtime snapshot shape and implemented the first projection seam in tools/sync/queue-health/health-runtime-snapshot.ps1.
