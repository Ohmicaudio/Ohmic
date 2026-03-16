# Ohmic Master Administrator Note Visibility Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define when notes are visible in desk views, audit views, and deeper internal
trace so note visibility becomes predictable across the administrator surface.

## Core Rule

Note visibility should be explicit on the note object and enforced consistently
in projections.

## Visibility Classes

Suggested first visibility classes:

- `desk`
- `audit`
- `internal_only`

## Visibility Behavior

### `desk`

- visible in intake detail
- visible in recent action summaries when relevant
- visible in audit views

### `audit`

- hidden from normal desk summary views
- visible in audit/history views
- discoverable by privileged operators when inspecting the full trace

### `internal_only`

- hidden from normal desk and routine audit surfaces
- visible only in deeper internal or debugging views

## Authorship Interaction

Authorship and visibility should stay separate.

Examples:

- an `agent_generated` note may still be `desk` visible
- a `human_operator` note may still be `audit` only

The desk should not infer visibility from authorship class alone.

## Projection Rule

Each note projection should expose:

- `visibility`
- `visibility_label`
- `hidden_from_default_desk`

That keeps UI logic simple and makes filtering obvious.

## Minimal Example

```json
{
  "note_id": "note_20260316_031",
  "visibility": "audit",
  "visibility_label": "Audit only",
  "hidden_from_default_desk": true
}
```

## First Safe Implementation

The first implementation only needs:

- the three visibility classes
- consistent desk versus audit filtering
- projected labels for UI clarity

That is enough to keep note visibility predictable.
