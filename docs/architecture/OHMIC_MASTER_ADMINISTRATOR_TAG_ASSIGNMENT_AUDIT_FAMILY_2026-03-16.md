# Ohmic Master Administrator Tag Assignment Audit Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit event family emitted when tag assignments are applied, removed,
accepted from hints, or accepted from defaults.

## Core Rule

Tag history should remain attributable after defaults, hints, and operator
actions all interact.

## Event Family

Suggested event types:

- `administrator.tag.applied`
- `administrator.tag.removed`
- `administrator.tag.hint.accepted`
- `administrator.tag.default.accepted`

## Event Shape

Minimum fields:

- `event_id`
- `event_type`
- `intake_id`
- `tag_assignment_id`
- `tag_id`
- `actor_id`
- `actor_type`
- `occurred_at`
- `summary_label`

Optional later:

- `hint_id`
- `default_rule_id`
- `removal_reason`

## Source Rule

Audit should preserve whether the final tag came from:

- operator application
- accepted suggestion hint
- accepted default tag
- system-generated rule

That keeps tag history meaningful instead of just showing the final label.

## Minimal Example Shape

```json
{
  "event_id": "evt_tag_20260316_001",
  "event_type": "administrator.tag.hint.accepted",
  "intake_id": "intake_20260316_001",
  "tag_assignment_id": "tag_20260316_001",
  "tag_id": "bug",
  "actor_id": "switchyard",
  "actor_type": "human_operator",
  "occurred_at": "2026-03-16T08:05:00Z",
  "summary_label": "Tag hint accepted"
}
```

## First Safe Implementation

The first implementation only needs:

- tag applied events
- tag removed events
- hint/default acceptance events
- actor attribution and timestamps

That is enough to keep tag history reconstructable and attributable.
