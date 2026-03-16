# Ohmic Master Administrator Note Authorship Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the authorship model for administrator notes so human, system, and
future agent-authored notes remain distinguishable in the desk and audit layer.

## Core Rule

Notes should always preserve who or what authored them.

The system should never collapse operator notes and generated notes into one
undifferentiated note stream.

## Authorship Classes

Suggested first classes:

- `human_operator`
- `system_generated`
- `agent_generated`

The first implementation may only use the first two, but the third should be
reserved because the shared system is already multi-agent.

## Required Fields

Each note should carry:

- `note_id`
- `intake_id`
- `body_text`
- `authorship_class`
- `authored_by`
- `created_at`
- `visibility`

Optional but useful later:

- `confidence`
- `prompt_context_ref`
- `source_action_id`

## Visibility Rule

Suggested first visibility classes:

- `desk`
- `audit`
- `internal_only`

This lets some notes stay operational while others remain deeper trace.

## Trust Rule

Authorship class should drive note trust.

Examples:

- human-operator notes may be treated as direct operator intent
- system-generated notes may be treated as informative but not authoritative
- agent-generated notes may require stronger labeling until trust models mature

## Relationship To Other Packets

This authorship model feeds:

- note/tag/filing surface
- audit and recent actions projections
- future agent trust and authorship views

## Minimal Example Shape

```json
{
  "note_id": "note_20260316_001",
  "intake_id": "intake_20260316_001",
  "body_text": "Agent summary says OCR failed on two attachments and recommends reprocess.",
  "authorship_class": "agent_generated",
  "authored_by": "switchyard",
  "created_at": "2026-03-16T06:40:00Z",
  "visibility": "desk"
}
```

## First Safe Implementation

The first implementation only needs:

- authorship class
- authored_by
- visibility
- created_at

That is enough to keep note provenance visible and useful.
