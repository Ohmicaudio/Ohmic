# Ohmic Master Administrator Tag Assignment Projection Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the reconciled JSON projection used to render applied tags in queue and
detail views.

## Core Rule

The browser should read one tag-assignment projection that already contains tag
class, source, and label information.

It should not reconstruct that view from multiple object families on the client.

## Projection Scope

The projection should support:

- tag chips in queue rows
- tag detail in intake views
- visibility into whether a tag came from a default, hint, or operator action

## Projection Family

Suggested file or endpoint:

- `administrator_tag_assignment_projection.json`

Minimum row fields:

- `tag_assignment_id`
- `intake_id`
- `tag_id`
- `tag_label`
- `tag_class`
- `source`
- `applied_by`
- `applied_at`
- `is_default`
- `is_suggested`

Optional later:

- `accepted_hint_id`
- `overlay_scope`

## Duplicate Suppression Rule

The projection should present the effective tag set without duplicate visible
rows when the same tag label arrived from multiple suggestion or default paths.

This means the projection layer should do the suppression work, not the
browser.

## Ordering Rule

Default order should prefer:

1. canonical shared tags
2. overlay-local tags
3. operator freeform tags

Within each class, sort by `applied_at` or stable label order.

## Minimal Example Shape

```json
{
  "tag_assignments": [
    {
      "tag_assignment_id": "tag_20260316_001",
      "intake_id": "intake_20260316_001",
      "tag_id": "bug",
      "tag_label": "bug",
      "tag_class": "canonical_shared",
      "source": "overlay_default",
      "applied_by": "overlay_ohmic",
      "applied_at": "2026-03-16T07:08:00Z",
      "is_default": true,
      "is_suggested": false
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- effective tag rows
- tag class and source labels
- duplicate suppression
- stable ordering fields

That is enough to make queue and detail tag rendering trustworthy.
