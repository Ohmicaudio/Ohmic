Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T054932Z-c490f005

# Scaffold Administrator Intake Queue Projection Generator

## Goal

Define or scaffold the generator that emits the reconciled intake queue
projection for the administrator shell.

## Focus

- intake queue input sources
- output JSON shape
- refresh triggers
- ordering
- warning-state inclusion

## Acceptance

- one intake-queue generator packet is explicit
- the first admin shell has a concrete read-model seam

## Result

Done. The intake-queue generator now lives in
`tools/sync/administrator/intake-queue-projection.ps1` and emits
`administrator_intake_queue` rows with warning-state inclusion, priority-first
ordering, and a write helper for `administrator_intake_queue.json`.
