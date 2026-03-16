# Ohmic Master Administrator Archived And Routed Visibility Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how archived and routed intake items appear, disappear, and optionally
re-enter administrator-facing queue projections.

## Core Rule

Archived and routed items should be hidden from the default active queue, but
they should remain discoverable through explicit history or reopen-oriented
views.

## Default Visibility Rules

### Archived items

- hidden from the default active queue
- visible in archive or history views
- discoverable by direct search

### Routed items

- hidden from the default triage queue
- visible in route history and follow-up views
- discoverable by direct search

## Reopen Rule

Archived and routed items should not silently return to active queues.

They may re-enter an active projection only when:

- an explicit reopen action succeeds
- a policy-defined follow-up workflow creates a new active review need

## Projection Hints

Inactive items should carry:

- `is_active_queue_visible`
- `inactive_reason`
- `reopen_eligible`
- `last_route_target_id`
- `last_closed_at`

Suggested `inactive_reason` values:

- `archived`
- `routed`
- `held`
- `waiting`

## Follow-Up Rule

Some routed items may need a lightweight follow-up view.

That view should be separate from the main active queue and should clearly
communicate that the item has already left first-line triage.

## Minimal Example

```json
{
  "intake_id": "intake_20260316_021",
  "current_status": "routed",
  "is_active_queue_visible": false,
  "inactive_reason": "routed",
  "reopen_eligible": true,
  "last_route_target_id": "hardware_followup",
  "last_closed_at": "2026-03-16T11:18:00Z"
}
```

## First Safe Implementation

The first implementation only needs:

- default hidden behavior for archived and routed items
- explicit reopen eligibility
- history-view discoverability
- inactive visibility hints on projections

That is enough to keep the active queue honest without losing audit access.
