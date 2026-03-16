# Ohmic Master Administrator Action Alias Registry

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable registry that maps project-local display labels and aliases
back to canonical administrator action ids.

## Core Rule

Browser copy may vary by project.

Backend behavior may not.

That means all display labels and aliases must resolve to one canonical action
before validation or writeback.

## Why This Registry Exists

Without an explicit alias registry:

- projects will fork action vocabulary informally
- validation will need to guess what a label means
- audit records will drift into mixed language

The registry keeps:

- UI wording flexible
- backend action semantics stable

## Canonical Source

The canonical action family comes from the overlay-driven action policy:

- `route_to_orchestrator`
- `hold`
- `archive`
- `request_approval`
- `waiting_on_provider`
- `waiting_on_human`
- `add_note`
- `tag_item`

The alias registry does not invent new actions. It only maps alternate wording
to canonical ids.

## Registry Shape

Suggested object:

`AdministratorActionAliasRegistry`

Minimum fields:

- `overlay_context_id`
- `canonical_actions[]`
- `aliases[]`
- `default_labels`
- `fallback_labels`
- `version`

### Canonical action entry

Minimum fields:

- `canonical_action_id`
- `default_label`
- `description`

### Alias entry

Minimum fields:

- `alias_id`
- `canonical_action_id`
- `display_label`
- `accepted_inputs[]`
- `scope`
- `status`

Suggested `scope` values:

- `global`
- `overlay_only`
- `shell_only`

Suggested `status` values:

- `active`
- `deprecated`
- `hidden`

## Resolution Rule

Resolution should follow:

1. exact canonical action id
2. overlay-specific active alias
3. overlay-specific default label
4. fallback label

If more than one active alias matches the same input in the same overlay scope,
validation should reject the command as ambiguous rather than guessing.

## Collision Rule

Alias collisions must be explicit.

Examples of invalid cases:

- one label maps to two canonical actions in the same overlay
- one hidden alias still resolves because a stale input path uses it
- one deprecated alias silently outranks an active alias

The registry should make these visible before commands are accepted.

## Fallback Label Rule

Every canonical action should have:

- one default label
- one fallback label path

If an overlay does not override a label, the browser and backend should still
be able to render one safe, stable action name.

## Relationship To Other Layers

The alias registry feeds:

- overlay-driven action policy
- command validation surface
- JSON projection generation
- future command-input controls in the browser shell

It should not replace the canonical action list itself.

## Minimal Example Shape

```json
{
  "overlay_context_id": "overlay_ohmic",
  "version": 1,
  "canonical_actions": [
    {
      "canonical_action_id": "route_to_orchestrator",
      "default_label": "Route To Orchestrator",
      "description": "Move the intake item into an internal execution queue."
    }
  ],
  "aliases": [
    {
      "alias_id": "alias_ohmic_route_switchyard",
      "canonical_action_id": "route_to_orchestrator",
      "display_label": "Send To Switchyard",
      "accepted_inputs": [
        "Send To Switchyard",
        "switchyard",
        "route_to_orchestrator"
      ],
      "scope": "overlay_only",
      "status": "active"
    }
  ],
  "default_labels": {
    "route_to_orchestrator": "Route To Orchestrator"
  },
  "fallback_labels": {
    "route_to_orchestrator": "Route"
  }
}
```

## First Safe Implementation

The first implementation only needs:

- canonical action ids
- overlay-specific display labels
- accepted input aliases
- ambiguity rejection
- one fallback label per action

That is enough to keep project-local naming flexible without making validation
fragile.
