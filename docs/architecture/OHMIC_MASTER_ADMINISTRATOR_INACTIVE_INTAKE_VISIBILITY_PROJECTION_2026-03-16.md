# Ohmic Master Administrator Inactive Intake Visibility Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the projection used to expose archived and routed intake items when the
desk or audit surface intentionally includes inactive items.

## Core Rule

Inactive items should stay out of the default active queue.

When they are shown, they should be rendered from a dedicated projection that
includes visibility and reopen context.

## Projection Scope

This projection should support:

- archived items view
- routed items view
- mixed inactive audit filter
- reopen affordance display

## Projection Family

Suggested file or endpoint:

- `administrator_inactive_intake_projection.json`

Minimum row fields:

- `intake_id`
- `title`
- `inactive_status`
- `inactive_since`
- `last_active_status`
- `reopen_allowed`
- `reopen_target_status`
- `summary_label`

Suggested `inactive_status` values:

- `archived`
- `routed`

## Visibility Rule

Default active queue projection should not include these rows.

This projection should only be consumed when:

- the user chooses an inactive filter
- an audit or history view requests them

## Minimal Example Shape

```json
{
  "inactive_items": [
    {
      "intake_id": "intake_20260316_001",
      "title": "Live handset smoke failed after reconnect",
      "inactive_status": "archived",
      "inactive_since": "2026-03-16T07:18:00Z",
      "last_active_status": "queued",
      "reopen_allowed": true,
      "reopen_target_status": "queued",
      "summary_label": "Archived after operator review"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- inactive item rows
- inactive status and timestamp
- reopen affordance fields
- summary labels

That is enough to expose inactive items intentionally without contaminating the
active desk queue.
