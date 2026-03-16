# Ohmic Master Administrator Warning Badge Taxonomy

Date: 2026-03-16
Project: ohmic

## Purpose

Define the warning badge vocabulary used in queue summaries, review lanes, and
detail views so degraded normalization states are visible without opening the
raw payload.

## Core Rule

Badges should communicate severity and family, not raw implementation noise.

The same intake condition should render with the same badge family across the
desk.

## Badge Levels

### `notice`

Use when a condition is worth surfacing but does not block normal work.

Examples:

- preview skipped for a non-critical asset
- metadata incomplete but readable

### `warning`

Use when the intake is usable but should be reviewed or retried before it is
considered trustworthy.

Examples:

- partial body parse
- one or more attachment preview failures
- low-confidence extraction

### `blocking`

Use when safe routing or approval should pause until an operator resolves or
overrides the issue.

Examples:

- manual review required
- corrupted raw attachment
- source checksum mismatch

## Badge Families

Suggested first family vocabulary:

- `parse_partial`
- `parse_failed`
- `preview_missing`
- `preview_failed`
- `metadata_incomplete`
- `schema_drift`
- `integrity_risk`
- `manual_review`
- `reprocess_running`

## Rollup Rule

Queue rows should show:

- the highest current badge level
- one primary badge family
- optional count of additional warning families

Detail views may show the full badge set, but queue rows should stay compact.

## Bundle Rule

Attachment bundle warnings should roll up from asset warnings using the highest
level present:

- any `blocking` asset -> bundle is `blocking`
- otherwise any `warning` asset -> bundle is `warning`
- otherwise any `notice` asset -> bundle is `notice`

## State Mapping Hints

- `normalized_with_warnings` usually maps to `warning`
- `manual_review_required` maps to `blocking`
- `reprocess queued/running` maps to `notice` plus `reprocess_running`

## Minimal Example

```json
{
  "warning_badges": [
    {
      "level": "warning",
      "family": "parse_partial",
      "label": "Partial parse"
    },
    {
      "level": "notice",
      "family": "reprocess_running",
      "label": "Retry queued"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- three severity levels
- a short first-pass family vocabulary
- rollup rules for queue rows and bundles

That is enough to keep degraded states visible and consistent.
