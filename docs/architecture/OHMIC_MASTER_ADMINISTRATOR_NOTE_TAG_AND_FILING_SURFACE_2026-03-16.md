# Ohmic Master Administrator Note Tag And Filing Surface

Date: 2026-03-16
Project: ohmic

## Purpose

Define the annotation and filing surface used by the Master Administrator desk
for notes, structured tags, and filing decisions without mixing those concepts
into routing commands.

## Core Rule

Notes, tags, and filing are not the same thing.

They may appear together in the desk, but they should be separate object
families with clear authorship and audit behavior.

## Why This Surface Exists

Without a dedicated annotation and filing layer:

- notes become overloaded as commands
- tags become ad hoc freeform clutter
- filing behavior drifts into archive actions without a stable object model

This surface keeps operator guidance, classification, and filing distinct from
the command/writeback path.

## Object Family

### 1. `AdministratorNote`

Represents a human- or system-authored annotation attached to an intake item.

Minimum fields:

- `note_id`
- `intake_id`
- `body_text`
- `authorship_type`
- `authored_by`
- `created_at`
- `visibility`

Suggested `authorship_type` values:

- `human`
- `system`

Suggested `visibility` values:

- `desk`
- `audit`
- `internal_only`

### 2. `AdministratorTagAssignment`

Represents one applied tag on an intake item.

Minimum fields:

- `tag_assignment_id`
- `intake_id`
- `tag_id`
- `tag_label`
- `applied_by`
- `applied_by_type`
- `applied_at`
- `source`

Suggested `source` values:

- `operator_applied`
- `overlay_default`
- `routing_suggestion`
- `system_inferred`

### 3. `AdministratorFilingRecord`

Represents a filing decision that changes where or how the intake item is
classified outside immediate routing.

Minimum fields:

- `filing_record_id`
- `intake_id`
- `filing_destination_id`
- `archive_marker`
- `reason`
- `filed_by`
- `filed_at`

## Separation Rule

Keep these boundaries:

- notes do not execute routing
- tags do not imply archive or route automatically
- filing does not replace intake current status

Routing commands may reference notes or tags, but they should not collapse into
the same object family.

## Authorship Rule

The desk should always be able to distinguish:

- human-authored notes and tags
- system-suggested tags
- overlay-default tags
- filing actions initiated by the operator versus generated from policy

That matters for trust, review, and later audit.

## Filing Rule

Filing is not just “archive.”

Filing can represent:

- durable classification
- destination grouping
- evidence bucket
- operator-managed category

Archive is one common filing outcome, but not the only one.

## Relationship To Other Packets

This surface feeds:

- intake detail projection
- recent action and audit views
- future filing destination registry
- future tag vocabulary and default-tag policy

It should stay separate from:

- command validation
- queue target routing
- raw payload storage

## Minimal Example Shape

```json
{
  "notes": [
    {
      "note_id": "note_20260316_001",
      "intake_id": "intake_20260316_001",
      "body_text": "Operator says the screenshot only matters if the warning persists after reprocess.",
      "authorship_type": "human",
      "authored_by": "switchyard",
      "created_at": "2026-03-16T06:20:00Z",
      "visibility": "desk"
    }
  ],
  "tag_assignments": [
    {
      "tag_assignment_id": "tag_20260316_001",
      "intake_id": "intake_20260316_001",
      "tag_id": "bug",
      "tag_label": "bug",
      "applied_by": "overlay_ohmic",
      "applied_by_type": "system",
      "applied_at": "2026-03-16T06:20:03Z",
      "source": "overlay_default"
    }
  ],
  "filing_record": {
    "filing_record_id": "file_20260316_001",
    "intake_id": "intake_20260316_001",
    "filing_destination_id": "ops_bug_archive",
    "archive_marker": false,
    "reason": "Retain under active bug evidence rather than archive outright.",
    "filed_by": "switchyard",
    "filed_at": "2026-03-16T06:21:00Z"
  }
}
```

## First Safe Implementation

The first implementation only needs:

- one note object family
- one tag-assignment object family
- one filing record family
- authorship and source labels

That is enough to keep annotations and filing structured before UI complexity
grows.
