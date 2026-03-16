# Ohmic Master Administrator Command Validation And Writeback Surface

Date: 2026-03-16
Project: ohmic

## Purpose

Define the backend command contract for the Master Administrator shell so the
browser submits bounded intent, the backend validates it against overlay and
state rules, and the resulting accepted or rejected state is written back into
reconciled JSON truth.

## Core Rule

The browser submits administrator intent.

The backend decides whether that intent is valid.

The reconciled result, not the browser assumption, becomes system truth.

## Position In The Flow

```text
administrator shell action
-> command intent payload
-> backend validation
-> accepted or rejected result
-> reconciled writeback object
-> audit event
-> refreshed JSON projections
```

## Command Family

### 1. `AdministratorCommandIntent`

Minimum fields:

- `command_id`
- `selected_intake_id`
- `action_type`
- `note_text`
- `tags[]`
- `target_queue`
- `requested_by`
- `requested_at`
- `overlay_context_id`

This is the browser-submitted object.

### 2. `AdministratorCommandValidationResult`

Minimum fields:

- `command_id`
- `validation_status`
- `rejection_reasons[]`
- `resolved_action_type`
- `resolved_target_queue`
- `requires_approval`
- `validated_at`

Suggested `validation_status` values:

- `accepted`
- `accepted_with_warnings`
- `rejected`

### 3. `AdministratorCommandWritebackRecord`

Minimum fields:

- `command_id`
- `selected_intake_id`
- `result_status`
- `previous_intake_status`
- `next_intake_status`
- `audit_event_refs[]`
- `written_at`
- `written_by`

Suggested `result_status` values:

- `applied`
- `applied_with_followup`
- `rejected`
- `superseded`

## Action Types

First safe action family:

- `route_to_orchestrator`
- `hold`
- `archive`
- `request_approval`
- `waiting_on_provider`
- `waiting_on_human`
- `add_note`
- `tag_item`

This list should be overlay-filtered, not hardcoded as globally available.

## Validation Rules

Validation should check:

### 1. Intake Existence

- selected intake item exists
- selected intake item is visible to the current projection scope

### 2. Overlay Policy

- action is allowed for the current project overlay
- action label aliases resolve back to one canonical action type
- any project-required approval or destination rules are met

### 3. Intake State Compatibility

Examples:

- archived intake should not accept a second archive command
- `waiting_on_provider` should not be applied if the item is already routed and
  closed
- `route_to_orchestrator` may require a valid target queue

### 4. Field Completeness

Examples:

- `add_note` should require non-empty `note_text`
- `tag_item` should require at least one tag
- `route_to_orchestrator` may require `target_queue`

## Reconciliation Rule

The backend writeback layer should not only say “command accepted.”

It should also emit:

- previous intake state
- resulting intake state
- action applied
- warnings or follow-up requirements

That lets the shell refresh from reconciled truth instead of optimistic local
state.

## Audit Event Production

Every accepted or rejected command should emit one audit event.

Suggested event types:

- `administrator.command.accepted`
- `administrator.command.rejected`
- `administrator.command.writeback.applied`

This aligns with the broader worker and audit model without forcing the browser
to hold the authoritative trail itself.

## Failure And Retry Rules

- rejected command intents remain auditable
- duplicate command ids should be idempotent
- writeback records should be safe to refresh repeatedly
- a command that validates but fails during writeback should surface as
  `accepted_with_warnings` or an explicit backend failure result, not disappear

## Relationship To JSON Projections

The writeback layer should update or regenerate:

- intake queue projection
- recent actions projection
- selected intake detail projection

The shell should then refresh from those projections instead of composing new
state client-side.

## Minimal Example Shape

```json
{
  "command_intent": {
    "command_id": "cmd_20260316_001",
    "selected_intake_id": "intake_20260316_001",
    "action_type": "route_to_orchestrator",
    "note_text": "Bug report should move into measured follow-up lane.",
    "tags": ["bug", "handoff"],
    "target_queue": "orchestrator_bug_triage",
    "requested_by": "switchyard",
    "requested_at": "2026-03-16T04:20:00Z",
    "overlay_context_id": "overlay_ohmic"
  },
  "validation_result": {
    "command_id": "cmd_20260316_001",
    "validation_status": "accepted",
    "rejection_reasons": [],
    "resolved_action_type": "route_to_orchestrator",
    "resolved_target_queue": "orchestrator_bug_triage",
    "requires_approval": false,
    "validated_at": "2026-03-16T04:20:01Z"
  },
  "writeback_record": {
    "command_id": "cmd_20260316_001",
    "selected_intake_id": "intake_20260316_001",
    "result_status": "applied",
    "previous_intake_status": "queued",
    "next_intake_status": "routed",
    "audit_event_refs": ["evt_20260316_101"],
    "written_at": "2026-03-16T04:20:02Z",
    "written_by": "admin_api"
  }
}
```

## First Safe Implementation

The first implementation only needs:

- one JSON-backed command endpoint or writeback surface
- one validation layer against overlay and intake state
- one recent-actions writeback record family
- one projection refresh path

That is enough to make the first administrator shell real without requiring the
entire final backend stack.
