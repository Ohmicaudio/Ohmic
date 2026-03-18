Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Define Queue Runtime Ready Count Filter

## Goal

Define the runtime filter that produces the truthful ready count for projections
and dashboard cards.

## Focus

- `Status: ready` filtering
- active packet exclusion
- missing-status fallback
- generated count fields
- auditability

## Acceptance

- one runtime-ready filter packet is explicit
- the shared runtime can publish a real ready count instead of a file count

## Result

Defined the trusted ready-count filter and implemented it in tools/sync/queue-health/runtime-ready-count.ps1.
