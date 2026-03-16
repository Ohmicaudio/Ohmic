# Ohmic Master Administrator Intake Sensitivity Taxonomy

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable sensitivity vocabulary referenced by approval rules and desk
projections.

## Core Rule

Sensitivity should describe handling risk, not source trust.

Low-trust intake and high-sensitivity intake are related but separate concepts.

## Sensitivity Levels

Suggested first levels:

- `routine`
- `sensitive`
- `restricted`

### `routine`

Normal operational material with no extra handling requirements beyond standard
desk controls.

### `sensitive`

Material that may require narrower visibility, stronger approval, or more
cautious routing.

### `restricted`

Material that should trigger the strongest first-pass approval or visibility
limits in the initial model.

## Assignment Rule

Default sensitivity may come from:

- intake kind
- overlay policy
- source adapter hints
- operator override

Operator overrides should be auditable.

## Separation From Trust

Examples:

- a high-trust internal message may still be `restricted`
- a low-trust external webhook may still be `routine`

Approval rules may consider both, but the fields should remain separate.

## Projection Rule

Queue and detail projections should expose:

- `sensitivity_level`
- `sensitivity_label`
- `sensitivity_source`

## Minimal Example

```json
{
  "intake_id": "intake_20260316_029",
  "sensitivity_level": "sensitive",
  "sensitivity_label": "Sensitive",
  "sensitivity_source": "overlay_default"
}
```

## First Safe Implementation

The first implementation only needs:

- three sensitivity levels
- explicit source of assignment
- projection visibility

That is enough for approval rules to reference a stable sensitivity vocabulary.
