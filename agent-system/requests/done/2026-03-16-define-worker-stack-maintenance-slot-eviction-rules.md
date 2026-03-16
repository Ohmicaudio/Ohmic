Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
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
Claim ID: 20260316T101814Z-dc6366f5

## Result

Defined the maintenance-slot eviction triggers so low-value upkeep drops first under stack pressure.
