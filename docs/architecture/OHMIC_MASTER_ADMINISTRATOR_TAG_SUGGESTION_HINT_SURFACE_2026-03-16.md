# Ohmic Master Administrator Tag Suggestion Hint Surface

Date: 2026-03-16
Project: ohmic

## Purpose

Define the non-binding tag suggestion surface shown to the administrator desk so
the system can recommend tags without silently turning suggestions into truth.

## Core Rule

Tag suggestions are hints.

They are not applied truth until accepted or confirmed through a policy path
such as default tags.

## Suggestion Sources

Suggested first sources:

- routing suggestion from intake normalization
- overlay-local hints
- attachment parse hints
- system heuristics

The first implementation does not need all of them, but the source field should
exist.

## Hint Object

Suggested object:

`AdministratorTagSuggestionHint`

Minimum fields:

- `hint_id`
- `intake_id`
- `suggested_tag_id`
- `suggested_tag_label`
- `source`
- `confidence`
- `reason`
- `status`

Suggested `status` values:

- `pending`
- `accepted`
- `ignored`
- `superseded`

## Confidence Rule

Hints should carry visible confidence.

Suggested values:

- `high`
- `medium`
- `low`

The desk should be able to distinguish:

- a strong system hint
- a weak heuristic nudge

## Acceptance Rule

When a hint is accepted:

- it should create or confirm a tag assignment
- the hint should record acceptance

When ignored:

- the hint should remain auditable but not become a tag

## Relationship To Default Tags

Default tags and suggestion hints are related but not identical.

- default tags may be applied automatically or preselected by policy
- tag suggestions remain advisory unless accepted

Keeping them separate prevents the system from hiding automatic tagging behind
the language of “suggestion.”

## Minimal Example Shape

```json
{
  "hint_id": "hint_20260316_001",
  "intake_id": "intake_20260316_001",
  "suggested_tag_id": "bug",
  "suggested_tag_label": "bug",
  "source": "routing_suggestion",
  "confidence": "medium",
  "reason": "normalized body references a defect and a failed smoke result",
  "status": "pending"
}
```

## First Safe Implementation

The first implementation only needs:

- hint object family
- confidence label
- source label
- accepted versus ignored status

That is enough to keep tag suggestions useful without letting them silently
become truth.
