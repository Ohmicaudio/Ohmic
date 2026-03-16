Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
