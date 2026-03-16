Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T050809Z-aa94254b

# Define Administrator Aggregation Audit Event Family

## Goal

Define the audit event family emitted when aggregation bundles are created,
updated, split, or dissolved.

## Focus

- aggregation event types
- member-count changes
- actor attribution
- timestamps
- linked bundle ids

## Acceptance

- one aggregation-audit packet is explicit
- bundle lifecycle remains reconstructable later

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_AGGREGATION_AUDIT_EVENT_FAMILY_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_AGGREGATION_AUDIT_EVENT_FAMILY_2026-03-16.md) with stable aggregation lifecycle event types and required audit fields.
