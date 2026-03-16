# Ohmic User Intervention And Override Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how a user or operator can pause, redirect, reprioritize, reopen, or
accept work so intervention is first-class and auditable without turning
routine operation into chaos.

## Core Rule

Autonomy is the default.

Intervention is allowed, explicit, and logged.

That means workers may keep moving on routine work, but user/operator input can
override direction when needed as long as the change is visible in the record.

## Intervention Actions

Recommended first intervention set:

- `pause`
- `resume`
- `reroute`
- `reassign`
- `force_fallback`
- `reopen`
- `accept_as_is`
- `override_audit_depth`

These actions should mutate system direction intentionally, not by hidden side
effects.

## Action Rules

### `pause`

Meaning:

- stop autonomous forward motion on a task or objective until resumed

Effect:

- status becomes paused
- workers stop taking new execution steps on that item
- current state stays visible

### `resume`

Meaning:

- allow the paused task or objective to continue under normal rules

Effect:

- paused flag is cleared
- scheduling returns to normal priority logic

### `reroute`

Meaning:

- keep the work alive but move it to a different queue, lane, or objective

Effect:

- destination changes
- old route is preserved in audit history

### `reassign`

Meaning:

- change who or what worker should own the task next

Effect:

- task ownership target changes
- prior owner and reason remain recorded

### `force_fallback`

Meaning:

- bypass the preferred route and move to the designated fallback path

Examples:

- fresh worker escalates to experienced worker
- model route downgrades to safer manual handling
- live automation yields to user-directed execution

### `reopen`

Meaning:

- closed or done work should return to an active state

Effect:

- completion state is reversed explicitly
- reopen reason is required

### `accept_as_is`

Meaning:

- user accepts the current output or state without asking for more correction

Effect:

- task can close even if it would not otherwise pass a stronger autonomous gate
- acceptance is logged as user/operator decision

### `override_audit_depth`

Meaning:

- temporarily require more or less logging/detail than the normal baseline

Effect:

- audit mode changes for that task, packet, or objective
- the override scope and duration are explicit

## Authority Boundary

### User / Operator May

- pause or resume active work
- change route or owner
- reopen completed work
- accept current output
- require fallback behavior
- change audit depth for a defined scope

### Worker May Not

- silently override user direction
- erase intervention history
- reinterpret an explicit pause as a soft suggestion
- treat acceptance as proof the system was objectively correct

### System May

- suggest interventions
- warn about risky overrides
- require confirmation for destructive changes

But the system should not pretend an override did not happen.

## Audit Requirements

Every intervention event should record:

- `event_id`
- `event_type`
- `target_ref`
- `issued_by`
- `issued_at`
- `previous_state`
- `new_state`
- `reason`
- `scope`
- `expiration` if temporary

This keeps intervention truthful and reviewable.

## Override Scope

Overrides should always declare scope:

- `task`
- `objective`
- `worker`
- `queue`
- `session`
- `global`

Narrower scope should be preferred by default.

## Conflict Rule

When an explicit user or operator override conflicts with autonomous worker
logic, the override wins until:

- it expires
- it is revoked
- it is replaced by a newer explicit override

This prevents hidden autonomy from fighting direct steering.

## Safe Defaults

Recommended defaults:

- pause and reroute require no special ceremony
- reopen requires a reason
- accept-as-is should mark user-accepted closure explicitly
- global overrides should be rare and highly visible
- temporary overrides should expire automatically when possible

## Minimal Event Example

```json
{
  "event_id": "override_20260316_001",
  "event_type": "reroute",
  "target_ref": "2026-03-16-define-provider-agnostic-intake-envelope",
  "issued_by": "operator:d",
  "issued_at": "2026-03-16T03:38:00Z",
  "previous_state": {
    "queue": "ready"
  },
  "new_state": {
    "queue": "blocked"
  },
  "reason": "waiting on external provider decision",
  "scope": "task"
}
```

## Immediate Follow-On

These rules should feed:

1. worker priority fallback and escalation rules
2. task completion correctness reporting
3. live task route training lane
