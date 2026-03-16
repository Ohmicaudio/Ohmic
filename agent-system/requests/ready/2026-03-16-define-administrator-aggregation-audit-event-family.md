Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
