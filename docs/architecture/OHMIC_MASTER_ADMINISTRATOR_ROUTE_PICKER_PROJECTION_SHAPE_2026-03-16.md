# Ohmic Master Administrator Route Picker Projection Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the JSON projection that feeds the first administrator route picker so
the browser shell can render route choices from one stable surface.

## Core Rule

The route picker should render from projected queue target rows, not from the
raw registry plus client-side rule rebuilding.

## Projection Shape

Suggested object:

`AdministratorRoutePickerProjection`

Top-level fields:

- `intake_id`
- `overlay_context_id`
- `current_status`
- `default_target_ids[]`
- `advanced_target_ids[]`
- `targets[]`

### Target row

Minimum fields:

- `queue_target_id`
- `display_label`
- `description`
- `visibility`
- `status`
- `selectable`
- `disabled_reason`
- `capability_flags[]`
- `approval_requirement_status`
- `requires_reopen`
- `is_default`

## Filtering Rule

The projection should exclude:

- deprecated targets that are not valid for new routing
- blocked targets
- targets disallowed by the current action or state

It may keep disabled rows visible if that helps explain why an option is
currently unavailable.

## Default Versus Advanced Rule

The projection should separate:

- `default` targets for the primary picker surface
- `advanced` targets for the expanded picker

The browser should not have to infer this from raw registry values.

## Empty-State Rule

If no targets are selectable, the projection should still include:

- `targets[]` with disabled rows if useful
- `empty_state_reason`
- `recommended_next_action`

Suggested `empty_state_reason` values:

- `no_valid_targets_for_action`
- `reopen_required_before_route`
- `overlay_has_no_route_targets`

## Minimal Example

```json
{
  "intake_id": "intake_20260316_021",
  "overlay_context_id": "overlay_ohmic",
  "current_status": "queued",
  "default_target_ids": [
    "orchestrator_bug_triage"
  ],
  "advanced_target_ids": [
    "hardware_followup"
  ],
  "targets": [
    {
      "queue_target_id": "orchestrator_bug_triage",
      "display_label": "Bug Triage",
      "description": "Internal queue for defect routing.",
      "visibility": "default",
      "status": "active",
      "selectable": true,
      "disabled_reason": null,
      "capability_flags": [
        "internal_only"
      ],
      "approval_requirement_status": "freely_allowed",
      "requires_reopen": false,
      "is_default": true
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- one projected row per queue target
- default versus advanced grouping
- selectability and disabled reasons
- approval and reopen hints

That is enough for a trustworthy first route picker.
