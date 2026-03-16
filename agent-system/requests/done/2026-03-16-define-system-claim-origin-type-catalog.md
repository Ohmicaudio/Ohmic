Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define System Claim Origin Type Catalog

## Goal

Define the origin types used when an active claim was created by the system
rather than directly by a worker.

## Focus

- runtime protective claim
- auto-refresh claim
- queue-health reconciliation claim
- orchestrator-generated claim
- operator-forced system claim

## Acceptance

- one claim-origin catalog is explicit
- system-created claims become easier to interpret

## Result

- defined the shared claim-origin catalog in
  `docs/systems/OHMIC_SYSTEM_CLAIM_ORIGIN_TYPE_CATALOG_2026-03-16.md`
- standardized runtime, refresh, reconciliation, orchestrator, and
  operator-forced system claim origins
