# Ohmic Master Administrator Aggregation Bundle Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the grouped-intake object model used when several intake items should be
handled as one bundle instead of isolated single rows.

## Core Rule

Aggregation should be an explicit object family with its own identity, summary,
and membership list.

It should not be an accidental UI-only grouping.

## Bundle Object

Suggested object:

`AdministratorAggregationBundle`

Minimum fields:

- `aggregation_bundle_id`
- `overlay_context_id`
- `bundle_kind`
- `member_intake_ids[]`
- `member_count`
- `summary_title`
- `summary_reason`
- `recommended_next_action`
- `status`
- `created_at`
- `updated_at`

Suggested `bundle_kind` values:

- `same_thread`
- `same_submission_packet`
- `same_source_burst`
- `same_device_event_family`

Suggested `status` values:

- `active`
- `needs_review`
- `split_required`
- `dissolved`

## Summary Rule

The bundle should summarize:

- why the members were grouped
- whether grouping is still trustworthy
- what the operator should do next

The bundle should never hide which intake items are inside it.

## Member Surface

Each member relationship should preserve:

- `intake_id`
- `joined_at`
- `joined_reason`
- `membership_confidence`
- `is_primary`

## Minimal Example

```json
{
  "aggregation_bundle_id": "agg_20260316_003",
  "overlay_context_id": "overlay_ohmic",
  "bundle_kind": "same_submission_packet",
  "member_intake_ids": [
    "intake_20260316_040",
    "intake_20260316_041"
  ],
  "member_count": 2,
  "summary_title": "Two related speaker fitment packet items",
  "summary_reason": "Filesystem drop produced two related CSV and note artifacts in one intake burst.",
  "recommended_next_action": "review_as_bundle",
  "status": "active",
  "created_at": "2026-03-16T12:10:00Z",
  "updated_at": "2026-03-16T12:10:10Z"
}
```

## First Safe Implementation

The first implementation only needs:

- one stable bundle object
- explicit member list
- summary and next-action fields
- a bundle status

That is enough to keep grouped handling distinct from single-item flow.
