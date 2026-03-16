# Ohmic Master Administrator Default Tag Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how default tags are suggested or applied during administrator actions
without hardcoding project-specific taxonomy into shell logic.

## Core Rule

Default tags should come from policy, not from ad hoc UI assumptions.

Operators may edit or remove defaults, but the system should know where those
defaults came from.

## Why This Policy Exists

Without a default tag policy:

- projects will encode tag behavior directly into the shell
- operators will not know whether a tag was suggested, inferred, or deliberate
- duplicate and noisy tagging will increase

This policy keeps tag defaults configurable and auditable.

## Default Tag Sources

Suggested tag sources:

- overlay defaults by action
- routing suggestion defaults
- intake-kind defaults
- operator-applied tags

The first implementation only needs overlay defaults plus operator overrides.

## Policy Rules

### 1. Default Tags By Action

Overlays may define default tags per canonical action.

Examples:

- `route_to_orchestrator` -> `handoff`
- `waiting_on_provider` -> `external_wait`
- `request_approval` -> `approval`

### 2. Operator Editability

Default tags should be:

- visible before submission
- editable by the operator
- removable if they are not appropriate

Defaults should help, not trap the operator.

### 3. Duplicate Handling

If the same tag is already present:

- do not apply it again
- preserve one canonical assignment

The system should not create duplicate tag assignments just because the same
default is suggested from two sources.

### 4. Authorship And Source

Each applied default tag should retain:

- source type
- source id if useful
- whether the operator accepted, edited, or removed it

This keeps tag behavior auditable.

## Default Tag Decision Inputs

Defaults may depend on:

- canonical action id
- overlay context
- intake kind
- existing tag set

The first version can stay simpler and use:

- action
- overlay context
- existing tag set

## Relationship To Other Packets

This policy depends on:

- note/tag/filing surface
- overlay-driven action policy
- future tag vocabulary rules

It should feed:

- command validation and writeback inputs
- intake detail projections
- future tag suggestion UI behavior

## Minimal Example Shape

```json
{
  "overlay_context_id": "overlay_ohmic",
  "default_tag_rules": [
    {
      "canonical_action_id": "route_to_orchestrator",
      "default_tags": [
        "handoff"
      ],
      "editable": true
    },
    {
      "canonical_action_id": "waiting_on_provider",
      "default_tags": [
        "external_wait"
      ],
      "editable": true
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- action-to-default-tag mapping
- duplicate suppression
- editable defaults
- source labeling on applied tags

That is enough to make tag defaults useful without turning them into shell
magic.
