Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T054932Z-c490f005

# Scaffold Administrator Inactive Intake Projection Generator

## Goal

Define or scaffold the generator that emits the archived/routed intake
projection.

## Focus

- inactive item inputs
- reopen affordance fields
- ordering
- filtered view support
- output JSON shape

## Acceptance

- one inactive-intake generator packet is explicit
- inactive browsing has a concrete read-model seam

## Result

Done. The inactive-intake generator now lives in
`tools/sync/administrator/inactive-intake-projection.ps1` and emits
`administrator_inactive_intake_projection` rows with reopen affordance fields
separate from the active queue.
