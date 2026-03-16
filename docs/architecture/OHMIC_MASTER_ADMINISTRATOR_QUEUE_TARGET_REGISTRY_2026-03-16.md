# Ohmic Master Administrator Queue Target Registry

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable registry for queue targets that Master Administrator actions
can route into.

## Core Rule

Administrator actions should route to canonical queue target ids, not freeform
text destinations.

Labels can vary by project overlay, but queue identity must stay stable for
validation, auditing, and later routing automation.

## Why This Registry Exists

Without a queue target registry:

- route commands will accept vague destination strings
- overlays will invent queue names ad hoc
- writeback records will be harder to compare or search

The registry keeps:

- destination ids stable
- display labels flexible
- validation simple and honest

## Registry Shape

Suggested object:

`AdministratorQueueTargetRegistry`

Minimum fields:

- `overlay_context_id`
- `queue_targets[]`
- `default_target_labels`
- `deprecated_target_ids[]`
- `version`

### Queue target entry

Minimum fields:

- `queue_target_id`
- `display_label`
- `description`
- `allowed_actions[]`
- `visibility`
- `status`

Suggested `visibility` values:

- `default`
- `advanced`
- `hidden`

Suggested `status` values:

- `active`
- `deprecated`
- `blocked`

## Queue Target Rule

Each route-like action should validate against the registry instead of trusting
browser-provided destination text.

Examples of likely targets:

- `orchestrator_bug_triage`
- `content_review`
- `hardware_followup`
- `operator_followup`

The registry may grow later, but these ids should be canonical when present.

## Allowed Action Binding

Each queue target should declare which canonical actions may use it.

Example:

- `route_to_orchestrator` may allow `orchestrator_bug_triage`
- `waiting_on_human` should not accept an orchestrator queue target

This prevents queue ids from being treated like generic text tags.

## Visibility Rule

Queue targets may be:

- shown in default shell action menus
- hidden behind advanced flows
- unavailable entirely in some overlays

Visibility belongs in the registry so the browser projection can remain simple.

## Deprecation Rule

Deprecated targets should stay resolvable long enough for audit history and
older writeback records, but they should not remain offered as new choices in
the shell.

If a deprecated target appears in a new command intent, validation should:

- reject it
- or map it through an explicit migration rule

It should not silently invent a replacement.

## Relationship To Other Layers

The queue target registry feeds:

- overlay-driven action policy
- command validation and writeback
- JSON projection generation
- future route-picker UI controls

## Minimal Example Shape

```json
{
  "overlay_context_id": "overlay_ohmic",
  "version": 1,
  "queue_targets": [
    {
      "queue_target_id": "orchestrator_bug_triage",
      "display_label": "Bug Triage",
      "description": "Internal queue for bug and defect routing.",
      "allowed_actions": [
        "route_to_orchestrator"
      ],
      "visibility": "default",
      "status": "active"
    },
    {
      "queue_target_id": "hardware_followup",
      "display_label": "Hardware Follow-Up",
      "description": "Queue for device or validation follow-up.",
      "allowed_actions": [
        "route_to_orchestrator"
      ],
      "visibility": "advanced",
      "status": "active"
    }
  ],
  "default_target_labels": {
    "orchestrator_bug_triage": "Bug Triage",
    "hardware_followup": "Hardware Follow-Up"
  },
  "deprecated_target_ids": [
    "legacy_inbox_triage"
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- canonical queue target ids
- display labels
- allowed-action bindings
- visibility and deprecation flags

That is enough to support honest routing validation in the first shell.
