# Ohmic Master Administrator Overlay-Driven Action Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how project overlays control the Master Administrator action surface so
project-specific behavior stays in overlay configuration instead of browser or
backend core logic.

## Core Rule

The administrator shell exposes canonical actions.

Project overlays decide:

- which actions are available
- which labels or aliases are shown
- which actions require approval or extra fields
- which queue destinations are legal

## Canonical Action Family

First safe canonical actions:

- `route_to_orchestrator`
- `hold`
- `archive`
- `request_approval`
- `waiting_on_provider`
- `waiting_on_human`
- `add_note`
- `tag_item`

Canonical actions should stay stable across projects even when display labels
change.

## Overlay Responsibilities

Each project overlay should be able to provide:

- `enabled_actions[]`
- `action_label_aliases`
- `approval_required_actions[]`
- `required_fields_by_action`
- `allowed_queue_targets[]`
- `disallowed_state_transitions[]`
- `default_tags_by_action`

This lets each project vary behavior without forking the shell.

## Alias Rule

Overlays may rename actions for user-facing copy.

Example:

- canonical: `route_to_orchestrator`
- display label in one project: `Send To Switchyard`
- display label in another project: `Escalate To Work Queue`

Aliases must always resolve back to one canonical action before validation.

## Approval Rule

Overlays should be able to declare that some actions are:

- always allowed
- allowed only with approval
- disallowed entirely

Examples:

- public reply routing in a communications-heavy project may require approval
- simple archive may be always allowed
- destructive provider-facing actions may be hidden from the first admin shell

## Required Field Rule

Overlays should be able to require fields by action.

Examples:

- `route_to_orchestrator` may require `target_queue`
- `add_note` requires `note_text`
- `tag_item` requires at least one tag
- `hold` may require a hold reason in some projects

The shell can use this to shape forms, but the backend must still validate it.

## Queue Target Rule

Allowed queue targets should also come from overlay configuration.

This keeps project-specific routes like:

- bug triage
- content review
- hardware verification
- operator follow-up

out of core shell logic.

## State Restriction Rule

Overlays may add transition restrictions on top of the shared intake lifecycle.

Examples:

- archived items cannot route again without reopen
- items already waiting on provider cannot accept a second provider-wait action
- some projects may forbid direct archive from certain intake kinds

These restrictions must resolve during backend command validation.

## Default Behavior

If an overlay does not customize an action:

- use canonical label
- use shared default validation
- allow only the safest queue targets and state transitions

That keeps the system usable even before project-local polish exists.

## Relationship To Other Packets

This policy layer feeds:

- command validation and writeback surface
- JSON projection generation surface
- future action alias registry
- future approval requirement matrix

It should not replace those packets.

## Minimal Example Shape

```json
{
  "overlay_context_id": "overlay_ohmic",
  "enabled_actions": [
    "route_to_orchestrator",
    "hold",
    "archive",
    "request_approval",
    "waiting_on_provider",
    "add_note",
    "tag_item"
  ],
  "action_label_aliases": {
    "route_to_orchestrator": "Send To Switchyard",
    "waiting_on_provider": "Waiting On External Source"
  },
  "approval_required_actions": [
    "request_approval"
  ],
  "required_fields_by_action": {
    "route_to_orchestrator": ["target_queue"],
    "add_note": ["note_text"],
    "tag_item": ["tags"]
  },
  "allowed_queue_targets": [
    "orchestrator_bug_triage",
    "content_review",
    "hardware_followup"
  ],
  "disallowed_state_transitions": [
    {
      "from": "archived",
      "action": "archive"
    }
  ],
  "default_tags_by_action": {
    "route_to_orchestrator": ["handoff"]
  }
}
```

## First Safe Implementation

The first implementation only needs:

- canonical action family
- overlay-provided enabled action list
- action alias resolution
- required-field map
- allowed queue target map

That is enough to keep project-specific behavior configurable without
overbuilding the first shell.
