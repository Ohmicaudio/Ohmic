Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Worker Stack Local Reconciliation Checklist

## Goal

Define the checklist a worker or runtime should use when reconciling local stack
state back to queue truth.

## Focus

- primary cleared
- fallback promotion
- spillback confirmation
- done-state reconciliation
- audit event emission

## Acceptance

- one reconciliation-checklist packet is explicit
- local stack cleanup becomes more predictable
