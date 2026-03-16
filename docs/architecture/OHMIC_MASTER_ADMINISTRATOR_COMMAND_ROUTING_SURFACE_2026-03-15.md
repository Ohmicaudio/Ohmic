# Ohmic Master Administrator Command Routing Surface

Date: 2026-03-15
Project: ohmic

## Purpose

Define the first routing-desk behavior for the Master Administrator so
normalized outside-world intake items can be acknowledged, organized,
escalated, or handed to the orchestrator without collapsing administrator and
orchestrator responsibilities together.

## Core Rule

The administrator routes intake items.

The orchestrator executes internal work.

That means the administrator command surface should operate on
`AdministratorIntakeItem` objects and create or request downstream work only
when needed.

## Routing Actions

Recommended first command set:

- `route_to_orchestrator`
- `hold`
- `archive`
- `request_approval`
- `mark_waiting_on_provider`
- `mark_waiting_on_human`
- `add_note`
- `tag_item`

These are administrator actions, not provider commands and not implementation
tasks.

## Action Semantics

### `route_to_orchestrator`

Meaning:

- this intake item should become or update internal execution work

Expected effect:

- create or link a downstream request/task object
- add a routing note
- update intake status to `routed`

### `hold`

Meaning:

- keep the intake item in administrator ownership without escalating it yet

Expected effect:

- set routing target to `administrator_hold`
- preserve visibility for later review

### `archive`

Meaning:

- no active follow-up is required right now

Expected effect:

- mark item archived without inventing fake work

### `request_approval`

Meaning:

- the item needs explicit human confirmation before further action

Expected effect:

- set routing target to `approval_wait`
- attach approval note/context

### `mark_waiting_on_provider`

Meaning:

- the next blocker is outside the internal team and tied to provider-side
  action or response

Expected effect:

- keep the intake item alive
- show provider wait status clearly

### `mark_waiting_on_human`

Meaning:

- waiting on operator/customer/stakeholder clarification

Expected effect:

- keep intake item visible without creating premature internal tasks

### `add_note`

Meaning:

- annotate the intake item without changing its routing outcome

### `tag_item`

Meaning:

- add routing or search metadata without mutating the underlying intake facts

## Minimal Status + Routing Matrix

Suggested mapping:

- `captured` -> admin can `hold`, `add_note`
- `normalized` -> admin can `hold`, `tag_item`, `route_to_orchestrator`
- `triaged` -> admin can use full routing surface
- `waiting_on_provider` -> admin can `add_note`, `archive`, `route_to_orchestrator`
- `waiting_on_human` -> admin can `add_note`, `archive`, `route_to_orchestrator`
- `routed` -> admin can still annotate, but downstream execution owns the work

## JSON Writeback Alignment

The routing surface should fit the current JSON command/writeback pattern:

1. browser admin UI submits a routing command
2. backend validates the action against the intake item
3. backend writes audit/result state
4. reconciled state feeds the admin UI

So the browser should submit admin intent, not directly mutate durable truth on
its own.

## Minimal Command Shape

```json
{
  "command_type": "administrator.route_intake",
  "intake_id": "intake_20260315_001",
  "action": "route_to_orchestrator",
  "payload": {
    "target_queue": "ready",
    "note": "Turn handset discovery failure into tracked execution work."
  }
}
```

## Result Model

Recommended backend result fields:

- `command_id`
- `intake_id`
- `accepted`
- `result_state`
- `created_internal_refs[]`
- `updated_status`
- `updated_routing_target`
- `audit_id`

This lets the admin UI render real outcomes rather than synthetic optimism.

## Administrator vs Orchestrator Boundary

Administrator owns:

- deciding whether outside-world input becomes work
- organizing intake state
- holding, archiving, tagging, annotating
- escalating for approval

Orchestrator owns:

- active internal execution
- worker/task scheduling
- implementation progress
- completion state of the downstream work

The administrator should be able to route something to the orchestrator without
becoming the orchestrator.

## First Safe UI Shape

A first bounded admin routing surface only needs:

- intake list
- intake detail view
- action buttons for the routing commands above
- note field
- status/routing badge display
- downstream link display when routing created internal work

That is enough to make the admin desk real without building the whole
orchestrator inside it.

## Immediate Follow-On

This routing surface should feed:

1. web scaffold wave
2. project overlay configuration layer for administrator
3. provider-specific command expansions later
