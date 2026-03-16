# Ohmic Master Administrator Tag Hint Acceptance Audit

Date: 2026-03-16
Project: ohmic

## Purpose

Define how the system records whether tag suggestions were accepted, ignored, or
superseded so suggestion outcomes remain reconstructable later.

## Core Rule

A tag hint should keep its own decision history.

The final tag assignment alone is not enough to explain whether a hint was
accepted, ignored, or replaced by a stronger decision.

## Audit Object

Suggested object:

`AdministratorTagHintDecision`

Minimum fields:

- `tag_hint_decision_id`
- `hint_id`
- `intake_id`
- `decision`
- `decision_by`
- `decision_at`
- `final_tag_assignment_id`
- `reason`

Suggested `decision` values:

- `accepted`
- `ignored`
- `superseded`

## Decision Rules

### Accepted

- creates or confirms a tag assignment
- links to the resulting `tag_assignment_id`

### Ignored

- leaves no assignment from this hint
- records who ignored it and optionally why

### Superseded

- records that another hint, operator action, or policy path replaced this
  suggestion

## Minimal Example

```json
{
  "tag_hint_decision_id": "hint_decision_20260316_011",
  "hint_id": "hint_20260316_007",
  "intake_id": "intake_20260316_029",
  "decision": "accepted",
  "decision_by": "operator:d",
  "decision_at": "2026-03-16T11:42:00Z",
  "final_tag_assignment_id": "tag_20260316_044",
  "reason": "Matches operator classification"
}
```

## First Safe Implementation

The first implementation only needs:

- one decision object per resolved hint
- accepted/ignored/superseded outcomes
- actor and timestamp
- link to the final assignment when accepted

That is enough to keep tag suggestion behavior auditable.
