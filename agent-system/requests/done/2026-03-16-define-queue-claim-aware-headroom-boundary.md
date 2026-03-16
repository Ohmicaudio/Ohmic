Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Define Queue Claim Aware Headroom Boundary

## Goal

Define how queue headroom metrics should treat packets that are still stored in
`ready/` but already active under claim.

## Focus

- hot-ready versus active-in-ready
- claim-aware counts
- dashboard truth boundary
- refill trigger implications
- reporting consistency

## Acceptance

- one claim-aware headroom packet is explicit
- queue health stops overcounting active packets as truly ready

## Result

Defined claim-aware headroom as effective ready capacity and applied that rule in the first queue-health ready-count projection.
