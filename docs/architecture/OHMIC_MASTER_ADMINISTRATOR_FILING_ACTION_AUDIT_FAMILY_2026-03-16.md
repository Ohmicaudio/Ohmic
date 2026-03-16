# Ohmic Master Administrator Filing Action Audit Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit family emitted when filing records are created, updated,
deprecated, or replaced.

## Core Rule

Filing history should survive beyond the latest filing projection row.

The audit family preserves how an intake item moved through filing destinations
and archive-marker changes over time.

## Event Family

Suggested event types:

- `administrator.filing.created`
- `administrator.filing.updated`
- `administrator.filing.archived`
- `administrator.filing.destination_deprecated`

## Event Shape

Minimum fields:

- `event_id`
- `event_type`
- `filing_record_id`
- `intake_id`
- `filing_destination_id`
- `archive_marker`
- `actor_id`
- `actor_type`
- `occurred_at`
- `summary_label`

Optional later:

- `previous_destination_id`
- `next_destination_id`
- `reason`

## Minimal Example Shape

```json
{
  "event_id": "evt_file_20260316_001",
  "event_type": "administrator.filing.created",
  "filing_record_id": "file_20260316_001",
  "intake_id": "intake_20260316_001",
  "filing_destination_id": "ops_bug_archive",
  "archive_marker": true,
  "actor_id": "switchyard",
  "actor_type": "human_operator",
  "occurred_at": "2026-03-16T08:08:00Z",
  "summary_label": "Filing created"
}
```

## First Safe Implementation

The first implementation only needs:

- filing created events
- filing updated events
- destination id and archive marker capture
- actor attribution and timestamps

That is enough to keep filing history reconstructable beyond the latest state.
