Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Worker Stack Maintenance Slot Eviction Rules

## Goal

Define when maintenance-slot items should be evicted or spilled back under
pressure.

## Focus

- eviction triggers
- stale maintenance items
- queue-truth fallback
- operator-pinned exceptions
- auditability

## Acceptance

- one maintenance-eviction packet is explicit
- maintenance slots stop lingering forever
