Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Worker Facing Queue Churn Summary Row

## Goal

Define the compact summary row a worker should see for important queue churn
events.

## Focus

- event type
- family id
- related task or claim id
- intent summary
- actor
- timestamp

## Acceptance

- one churn-summary-row packet is explicit
- worker-facing churn reporting gets a compact reusable row shape

## Result

- defined the compact worker summary row in
  `docs/systems/OHMIC_WORKER_FACING_QUEUE_CHURN_SUMMARY_ROW_2026-03-16.md`
- standardized the event, family, related object, intent summary, actor, and
  timestamp fields used in churn reporting
