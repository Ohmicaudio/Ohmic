# Ohmic Master Administrator Filing History Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the reconciled JSON projection used to show filing history for intake
items in desk and audit views.

## Core Rule

Filing history should be renderable from one projection rather than requiring
the browser to join filing records, destination registries, and archive flags.

## Projection Scope

The filing history projection should support:

- latest filing summary in intake detail
- historical filing rows in audit views
- archive marker history

## Projection Family

Suggested file or endpoint:

- `administrator_filing_history_projection.json`

Minimum row fields:

- `filing_record_id`
- `intake_id`
- `filing_destination_id`
- `display_label`
- `archive_marker`
- `reason`
- `filed_by`
- `filed_at`
- `status`

Suggested `status` values:

- `active`
- `superseded`
- `deprecated_destination`

## Ordering Rule

Default order:

- newest first in desk views

Optional audit mode:

- chronological

## Minimal Example Shape

```json
{
  "filing_history": [
    {
      "filing_record_id": "file_20260316_001",
      "intake_id": "intake_20260316_001",
      "filing_destination_id": "ops_bug_archive",
      "display_label": "Bug Archive",
      "archive_marker": true,
      "reason": "Retained after final operator review.",
      "filed_by": "switchyard",
      "filed_at": "2026-03-16T07:12:00Z",
      "status": "active"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- filing history rows
- destination display labels
- archive marker field
- stable timestamps

That is enough to make filing history visible without extra browser joins.
