Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T053212Z-41a79af1

# Scaffold Administrator Queue Target Validation Seam

## Goal

Define or scaffold the seam that validates route targets against the queue
target registry.

## Focus

- target id lookup
- allowed-action bindings
- deprecated target behavior
- display label resolution
- rejection reasons

## Acceptance

- one queue-target validation packet is explicit
- route destination checks have a concrete seam

## Result

Done. The queue-target validation seam now lives in
`tools/sync/administrator/queue-target-validation.ps1` and validates target id
lookup, allowed-action bindings, deprecated-target migration, capability-flag
warnings, and blocking rejection reasons.
