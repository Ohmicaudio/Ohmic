# Ohmic Master Administrator Aggregation Membership Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how intake items qualify for inclusion in an aggregation bundle.

## Core Rule

Membership should be decided by explicit correlation rules, not operator guess
or UI coincidence.

## Membership Inputs

Aggregation may consider:

- shared source account or adapter
- shared thread or conversation ref
- close arrival time window
- shared attachment or payload correlation ref
- explicit operator grouping

## First Membership Rules

### Same-thread rule

Items may group when they share a stable external thread or conversation ref.

### Burst-window rule

Items may group when they arrive within a short configured time window from the
same source and share a similar subject or packet key.

### Attachment-packet rule

Items may group when they are clearly part of the same manual drop or generated
submission packet.

### Operator-forced rule

An operator may explicitly group items, but that should record an operator
membership reason rather than pretending correlation was automatic.

## Duplicate Membership Rule

One intake item should belong to at most one active aggregation bundle of the
same kind at a time.

If a new grouping would violate that, the system should:

- reject the membership
- or trigger a split/review path

## Cross-Source Boundary

Items from unrelated source types should not group automatically unless an
explicit correlation key exists.

Examples:

- do not auto-group email and webhook items just because they arrived close
  together
- do allow cross-source grouping when a shared ingestion batch id or operator
  action says they are the same packet

## Minimal Example

```json
{
  "intake_id": "intake_20260316_041",
  "aggregation_bundle_id": "agg_20260316_003",
  "joined_reason": "shared_manual_drop_batch",
  "membership_confidence": "high",
  "is_primary": false
}
```

## First Safe Implementation

The first implementation only needs:

- thread, burst, packet, and operator-forced rules
- duplicate-membership prevention
- explicit join reason and confidence

That is enough to keep membership predictable and auditable.
