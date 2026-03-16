# Ohmic Master Administrator Action State Restriction Matrix

Date: 2026-03-16
Project: ohmic

## Purpose

Define the restriction matrix that decides which administrator actions are valid
from which intake lifecycle states.

## Core Rule

An action can be:

- generally allowed by overlay policy
- but still invalid from the current intake state

State restriction is separate from action availability and separate from
approval requirements.

## Why This Matrix Exists

Without a dedicated state restriction matrix:

- the validation layer would blur “not allowed here” with “not allowed ever”
- reopen behavior would stay vague
- archive and waiting-state rules would drift into special-case code

This matrix gives one stable answer to:

- “is this action valid from this state right now?”

## Matrix Outputs

Suggested outputs:

- `valid`
- `requires_reopen`
- `invalid`

Optional:

- `valid_with_warning`

## Primary Inputs

State restriction should be decided from:

- canonical action id
- current intake status
- overlay context

The first version does not need more than that.

## First Safe Default Rules

### From `queued`

- `hold` -> `valid`
- `archive` -> `valid`
- `route_to_orchestrator` -> `valid`
- `waiting_on_provider` -> `valid`
- `waiting_on_human` -> `valid`
- `add_note` -> `valid`
- `tag_item` -> `valid`

### From `held`

- `hold` -> `invalid`
- `archive` -> `valid`
- `route_to_orchestrator` -> `valid`
- `waiting_on_provider` -> `valid`
- `waiting_on_human` -> `valid`
- `add_note` -> `valid`
- `tag_item` -> `valid`

### From `waiting_on_provider`

- `waiting_on_provider` -> `invalid`
- `waiting_on_human` -> `valid`
- `hold` -> `valid`
- `archive` -> `valid`
- `route_to_orchestrator` -> `valid`
- `add_note` -> `valid`
- `tag_item` -> `valid`

### From `waiting_on_human`

- `waiting_on_human` -> `invalid`
- `waiting_on_provider` -> `valid`
- `hold` -> `valid`
- `archive` -> `valid`
- `route_to_orchestrator` -> `valid`
- `add_note` -> `valid`
- `tag_item` -> `valid`

### From `archived`

- `archive` -> `invalid`
- `route_to_orchestrator` -> `requires_reopen`
- `hold` -> `requires_reopen`
- `waiting_on_provider` -> `requires_reopen`
- `waiting_on_human` -> `requires_reopen`
- `add_note` -> `valid`
- `tag_item` -> `valid`

### From `routed`

- `route_to_orchestrator` -> `invalid`
- `hold` -> `requires_reopen`
- `archive` -> `requires_reopen`
- `waiting_on_provider` -> `requires_reopen`
- `waiting_on_human` -> `requires_reopen`
- `add_note` -> `valid`
- `tag_item` -> `valid`

## Reopen Rule

`requires_reopen` means:

- the system should not silently apply the action
- an explicit reopen flow or equivalent operator intent is required first

That keeps archived and routed items from drifting back into active work by
accident.

## Overlay Restriction Rule

Overlays may tighten the matrix by:

- changing `valid` to `invalid`
- changing `valid` to `requires_reopen`
- disallowing a route from one state in a specific project

Overlays should not weaken a base restriction without an explicit future packet
that allows it.

## Relationship To Other Packets

This matrix depends on:

- intake status lifecycle
- overlay-driven action policy
- command validation and writeback surface

It should also feed:

- route picker filtering
- reopen policy
- future action-state help text

## Minimal Example Shape

```json
{
  "overlay_context_id": "overlay_ohmic",
  "state_restrictions": [
    {
      "current_status": "archived",
      "canonical_action_id": "route_to_orchestrator",
      "result": "requires_reopen",
      "reason": "archived_items_must_reopen_before_reroute"
    },
    {
      "current_status": "queued",
      "canonical_action_id": "archive",
      "result": "valid",
      "reason": "queue_archive_allowed"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- current-state to action result mapping
- reopen result type
- overlay tightening hooks
- human-readable rejection reasons

That is enough to make validation much more trustworthy in the first shell.
