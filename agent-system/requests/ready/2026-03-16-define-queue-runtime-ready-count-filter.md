Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
