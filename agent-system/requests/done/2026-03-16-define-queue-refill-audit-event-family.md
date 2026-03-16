Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094732Z-9a684b93

# Define Queue Refill Audit Event Family

## Goal

Define the audit events emitted when the system refills, promotes, or batches queue tasks.

## Focus

- refill events
- burst generation events
- promotion events
- actor attribution
- timestamps

## Acceptance

- one refill-audit packet is explicit
- queue growth remains explainable later

## Result

Done. The refill audit event family now lives in
`docs/systems/OHMIC_QUEUE_REFILL_AUDIT_EVENT_FAMILY_2026-03-16.md`, defining
explicit refill, promotion, demotion, burst, and override audit events with
source tier, target tier, packet delta, actor attribution, and trigger reason.
