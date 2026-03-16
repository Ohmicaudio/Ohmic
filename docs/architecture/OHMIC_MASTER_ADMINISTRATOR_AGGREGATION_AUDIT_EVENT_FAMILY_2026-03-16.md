# Ohmic Master Administrator Aggregation Audit Event Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit event family emitted as aggregation bundles are created,
updated, split, merged, or dissolved.

## Core Rule

Aggregation changes should produce explicit audit events instead of leaving the
bundle lifecycle implied by the latest bundle snapshot.

## Event Types

Suggested first event types:

- `aggregation_created`
- `member_added`
- `member_removed`
- `bundle_split`
- `bundle_dissolved`
- `bundle_status_changed`
- `recommended_action_overridden`

## Required Fields

Each event should carry:

- `aggregation_event_id`
- `aggregation_bundle_id`
- `event_type`
- `changed_by`
- `changed_at`
- `member_count_after`
- `reason`

Optional but useful:

- `member_intake_ids_changed[]`
- `previous_status`
- `new_status`
- `spawned_bundle_ids[]`

## Minimal Example

```json
{
  "aggregation_event_id": "agg_evt_20260316_003",
  "aggregation_bundle_id": "agg_20260316_003",
  "event_type": "bundle_split",
  "changed_by": "operator:d",
  "changed_at": "2026-03-16T12:42:00Z",
  "member_count_after": 2,
  "reason": "Third intake item belonged to a separate packet",
  "member_intake_ids_changed": [
    "intake_20260316_042"
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- stable event types
- actor and timestamp fields
- bundle linkage
- member-count and reason fields

That is enough to reconstruct bundle lifecycle later.
