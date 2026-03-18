Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Claim Aware Ready Count Audit Event Family

## Goal

Define the audit events emitted when queue-ready counts are reconciled against
active claims.

## Focus

- count recalculation
- claim exclusion
- actor attribution
- runtime projection refresh
- discrepancy logging

## Acceptance

- one claim-aware audit packet is explicit
- ready-count reconciliation becomes explainable later
Claim ID: 20260316T100756Z-ae12ccd3

## Result

Defined the audit event family for claim-aware ready-count recalculation so queue-health can explain effective capacity later without changing queue authority.
