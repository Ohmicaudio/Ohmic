Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Reserve Slot Policy

## Goal

Define how many same-family and maintenance reserve slots a worker stack should hold.

## Focus

- same-family reserve slots
- verification slot
- maintenance slot
- swap behavior
- starvation protection

## Acceptance

- one reserve-slot packet is explicit
- worker stacks keep better local headroom
Claim ID: 20260316T101338Z-c9964bc3

## Result

Defined the default worker-stack reserve slots for fallback, verification, and maintenance.
