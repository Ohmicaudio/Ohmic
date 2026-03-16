# Ohmic Master Administrator Aggregation Summary Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the JSON projection used to render aggregation bundle summaries in the
administrator desk.

## Core Rule

The desk should render aggregation cards from one stable projection row instead
of reconstructing summary state from raw bundle, membership, and audit records.

## Projection Shape

Suggested object:

`AdministratorAggregationSummaryProjection`

Minimum fields:

- `aggregation_bundle_id`
- `bundle_label`
- `bundle_kind`
- `member_count`
- `summary_text`
- `recommended_next_action`
- `status`
- `latest_activity_at`

Optional but useful:

- `primary_member_intake_id`
- `membership_confidence_rollup`
- `warning_rollup`
- `latest_event_type`

## Minimal Example

```json
{
  "aggregation_bundle_id": "agg_20260316_003",
  "bundle_label": "Speaker fitment submission packet",
  "bundle_kind": "same_submission_packet",
  "member_count": 2,
  "summary_text": "Two related intake items arrived in one manual drop and should be reviewed together.",
  "recommended_next_action": "review_as_bundle",
  "status": "active",
  "latest_activity_at": "2026-03-16T12:42:00Z"
}
```

## First Safe Implementation

The first implementation only needs:

- one summary row per bundle
- member count and summary text
- advisory next action
- latest activity timestamp

That is enough for the first aggregation panel.
