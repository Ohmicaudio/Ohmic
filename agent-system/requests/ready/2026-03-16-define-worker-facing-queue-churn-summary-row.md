Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
