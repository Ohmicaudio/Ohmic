# Ohmic Master Administrator Warning Review Queue Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the JSON row shape that feeds the warning-review queue without requiring
ad hoc joins across raw payload, normalized intake, attachment bundle, and
reprocess attempt objects.

## Core Rule

The warning-review lane should render from one reconciled row projection per
intake item.

The desk should not rebuild warning state on the fly from low-level tables.

## Projection Shape

Each row should expose:

- `intake_id`
- `source_type`
- `title`
- `received_at`
- `warning_level`
- `primary_warning_family`
- `warning_reasons[]`
- `parse_confidence`
- `attachment_warning_count`
- `bundle_warning_level`
- `latest_reprocess_status`
- `reprocess_eligible`
- `recommended_next_action`
- `sort_key`

Optional but useful:

- `raw_payload_id`
- `attachment_bundle_id`
- `latest_reprocess_attempt_id`
- `warning_badge_count`
- `operator_hold_state`

## Sort Rule

Suggested sort order:

1. blocking rows first
2. older unresolved rows before newer rows
3. rows with no active retry before rows already being retried

The queue should highlight unattended risk, not just recent ingestion order.

## Recommended Actions

Suggested first values:

- `send_to_reprocess`
- `open_detail`
- `mark_safe`
- `hold`
- `archive`

Only one recommended action should be primary in the queue row. Detail screens
may expose more.

## Exit Rule

A row should disappear from this projection when:

- warning state resolves cleanly
- an operator marks it safe
- it is archived
- it is held outside the active review lane

Rows should not linger after their degraded state is no longer active.

## Minimal Example

```json
{
  "intake_id": "intake_20260316_014",
  "source_type": "email_rfc822",
  "title": "Tablet screenshot packet missing preview",
  "received_at": "2026-03-16T10:15:00Z",
  "warning_level": "warning",
  "primary_warning_family": "preview_failed",
  "warning_reasons": [
    "attachment_preview_failed"
  ],
  "parse_confidence": "low",
  "attachment_warning_count": 1,
  "bundle_warning_level": "warning",
  "latest_reprocess_status": "queued",
  "reprocess_eligible": true,
  "recommended_next_action": "send_to_reprocess",
  "sort_key": "warning|2026-03-16T10:15:00Z|queued"
}
```

## First Safe Implementation

The first implementation only needs:

- one flattened row per intake item
- warning severity, family, and reason fields
- attachment warning count
- latest retry state
- one recommended action

That is enough for a reliable review lane without UI-specific joins.
