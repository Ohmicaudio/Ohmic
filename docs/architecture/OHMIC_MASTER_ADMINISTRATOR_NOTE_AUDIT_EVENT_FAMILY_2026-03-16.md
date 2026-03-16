# Ohmic Master Administrator Note Audit Event Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit event family emitted when notes are created, edited, hidden,
or otherwise changed in the Master Administrator desk.

## Core Rule

Note history should be reconstructable without diffing raw note objects.

Audit events should capture who changed what, when, and why.

## Event Family

Suggested event types:

- `administrator.note.created`
- `administrator.note.edited`
- `administrator.note.visibility_changed`
- `administrator.note.hidden`

The first implementation does not need every type, but the family should be
stable.

## Event Shape

Minimum fields:

- `event_id`
- `event_type`
- `note_id`
- `intake_id`
- `actor_id`
- `actor_type`
- `occurred_at`
- `summary_label`

Optional later:

- `previous_visibility`
- `next_visibility`
- `linked_command_id`
- `edit_reason`

## Actor Rule

Actor attribution should distinguish:

- human operator
- system
- agent

This keeps note trust and authorship traceable in audit views.

## Minimal Example Shape

```json
{
  "event_id": "evt_note_20260316_001",
  "event_type": "administrator.note.created",
  "note_id": "note_20260316_001",
  "intake_id": "intake_20260316_001",
  "actor_id": "switchyard",
  "actor_type": "human_operator",
  "occurred_at": "2026-03-16T08:00:00Z",
  "summary_label": "Note created"
}
```

## First Safe Implementation

The first implementation only needs:

- note created events
- note edited events
- actor attribution
- timestamps

That is enough to keep note history reconstructable.
