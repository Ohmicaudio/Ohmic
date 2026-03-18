Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Reserve Slot Priority Rules

## Goal

Define the priority order between same-family reserve, maintenance, and
verification slots when stack pressure rises.

## Focus

- reserve precedence
- verification protection
- maintenance demotion
- same-family bias
- operator override

## Acceptance

- one reserve-priority packet is explicit
- slot competition gets a stable ordering
Claim ID: 20260316T101338Z-c9964bc3

## Result

Defined the reserve-slot priority order so fallback survives first when stack pressure rises.
