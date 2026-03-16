# Ohmic Master Administrator Queue Target Capability Flags

Date: 2026-03-16
Project: ohmic

## Purpose

Define optional capability flags that enrich queue targets without changing
their canonical ids or core routing contract.

## Core Rule

Capability flags should add machine-readable hints.

They should not replace the canonical target id, visibility, or allowed-action
binding already defined in the queue target registry.

## First Capability Set

Suggested initial flags:

- `internal_only`
- `customer_visible`
- `approval_gated`
- `escalation_capable`
- `multi_operator_visible`
- `manual_followup_heavy`
- `deprecated_alias_only`

## Flag Meanings

### `internal_only`

Target is meant for internal operational work and should not be described as a
customer-facing destination.

### `customer_visible`

Target results may drive customer-visible communication or downstream status.

### `approval_gated`

Routing to this target often or always requires approval in at least some
contexts.

### `escalation_capable`

Target represents a meaningful escalation or cross-team handoff.

### `multi_operator_visible`

Target should show collaborative or shared-work hints in future shells.

### `manual_followup_heavy`

Target usually implies human review or manual desk work, not a mostly automated
lane.

### `deprecated_alias_only`

Target exists only to preserve backward compatibility or migration visibility.

## Usage Rule

Capability flags should be used for:

- UI hints
- filter chips
- warning copy
- future operator education

They should not be the only source of validation truth.

## Projection Rule

The route picker and queue-target projections should pass these flags through as
read-only hints. The browser may decorate based on them, but the backend should
remain the authority.

## Minimal Example

```json
{
  "queue_target_id": "hardware_followup",
  "capability_flags": [
    "internal_only",
    "manual_followup_heavy",
    "multi_operator_visible"
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- a short enumerated flag list
- pass-through on projected target rows
- clear meaning for UI and reporting

That is enough to make targets richer without destabilizing the registry.
