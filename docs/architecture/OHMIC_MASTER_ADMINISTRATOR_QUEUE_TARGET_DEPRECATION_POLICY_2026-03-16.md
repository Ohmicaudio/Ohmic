# Ohmic Master Administrator Queue Target Deprecation Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how queue targets move from active use to deprecated compatibility and
eventual retirement without breaking audit, reopen, or route-history truth.

## Core Rule

Deprecated targets should remain interpretable but should stop being offered for
new routing unless an explicit migration rule says otherwise.

## Target Lifecycle

Suggested target lifecycle:

- `active`
- `deprecated`
- `retired`

### `active`

Normal target. Selectable for new routing.

### `deprecated`

Still resolvable for history and migration, but not normally offered as a new
choice.

### `retired`

Kept only for audit interpretation. New commands should reject it outright.

## Required Deprecation Fields

Each deprecated or retired target should expose:

- `replacement_target_id`
- `deprecated_at`
- `deprecation_reason`
- `reject_new_commands`

`replacement_target_id` may be null when the correct behavior is rejection
instead of silent migration.

## New Command Rule

When a new route command references a deprecated target:

- if an explicit replacement exists and policy allows auto-migration, map it
  and record the migration
- otherwise reject it with a human-readable reason

Retired targets should always reject new routing.

## Projection Rule

Browser projections should:

- hide deprecated targets from normal picker defaults
- optionally show them in advanced or audit views with a deprecated label
- never present retired targets as selectable

## Audit Rule

History should preserve the original routed target id and any migration event.

The system should be able to tell the difference between:

- originally routed to target A
- later interpreted through replacement target B

## Minimal Example

```json
{
  "queue_target_id": "legacy_inbox_triage",
  "status": "deprecated",
  "replacement_target_id": "orchestrator_bug_triage",
  "deprecated_at": "2026-03-16T11:10:00Z",
  "deprecation_reason": "registry_consolidation",
  "reject_new_commands": false
}
```

## First Safe Implementation

The first implementation only needs:

- lifecycle states
- replacement target field
- explicit rejection or migration behavior
- projection hiding rules

That is enough to retire targets safely without corrupting route history.
