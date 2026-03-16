# Ohmic Master Administrator Note Projection Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the reconciled JSON projection used to render notes in the Master
Administrator desk and intake detail views.

## Core Rule

The browser should read note projections, not raw note records plus separate
authorship and visibility joins.

## Projection Scope

The note projection should support:

- intake detail notes
- note summaries in desk views
- filtered note visibility for desk versus audit contexts

## Projection Family

Suggested file or endpoint:

- `administrator_note_projection.json`

Minimum row fields:

- `note_id`
- `intake_id`
- `body_text`
- `authorship_class`
- `authored_by`
- `created_at`
- `visibility`
- `source_action_id`
- `display_author_label`

Optional later:

- `confidence`
- `edited_at`
- `linked_warning_state`

## Ordering Rule

Default order:

- newest first for active desk reading

Optional alternate order for audits:

- oldest first or explicit chronological mode

The projection should expose enough timestamp truth that the browser does not
invent ordering rules client-side.

## Visibility Rule

The projection should already filter or label notes by visibility:

- `desk`
- `audit`
- `internal_only`

Default desk views should not silently surface `internal_only` notes unless the
projection is built for that context.

## Minimal Example Shape

```json
{
  "notes": [
    {
      "note_id": "note_20260316_001",
      "intake_id": "intake_20260316_001",
      "body_text": "Operator says the screenshot only matters if the warning persists after reprocess.",
      "authorship_class": "human_operator",
      "authored_by": "switchyard",
      "created_at": "2026-03-16T07:05:00Z",
      "visibility": "desk",
      "source_action_id": null,
      "display_author_label": "Switchyard"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- one notes array per intake or per filtered view
- authorship labels
- visibility labels
- stable ordering fields

That is enough to make note rendering predictable and auditable.
