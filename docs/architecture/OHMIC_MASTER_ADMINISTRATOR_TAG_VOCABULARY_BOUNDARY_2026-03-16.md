# Ohmic Master Administrator Tag Vocabulary Boundary

Date: 2026-03-16
Project: ohmic

## Purpose

Define the boundary between canonical shared tags, overlay-specific tags, and
operator freeform tags so the administrator desk can stay flexible without
turning into uncontrolled tag sprawl.

## Core Rule

Not all tags are equal.

The system should distinguish:

- canonical shared tags
- overlay-local tags
- operator-created tags

instead of pretending every tag is the same kind of truth.

## Tag Classes

### 1. Canonical Shared Tags

Stable tags used across projects or across the shared system.

Examples:

- `bug`
- `handoff`
- `approval`
- `external_wait`

These should be the safest tags for dashboards, reporting, and generalized
automation.

### 2. Overlay-Specific Tags

Project-local tags that are valid only in one overlay or project family.

Examples:

- `live-link`
- `amplab`
- `bench-capture`

These should remain valid but scoped.

### 3. Operator Freeform Tags

Ad hoc tags applied by operators for local working value.

Examples:

- `needs-check`
- `follow-up-friday`

These are useful, but they should not silently become shared canonical tags.

## Duplicate Label Rule

If two tags share the same visible label but belong to different classes or
different overlays, the system should treat that as a conflict to resolve
rather than silently merging them.

## Growth Rule

Canonical tags should grow slowly and intentionally.

Overlay-local tags can grow faster.

Operator freeform tags should remain possible, but the system should preserve
their class and origin so future cleanup or promotion is possible.

## Promotion Rule

Tag promotion should be explicit:

- operator freeform -> overlay-local
- overlay-local -> canonical shared

No tag should be promoted just because it was used often.

## Relationship To Other Packets

This boundary feeds:

- default tag policy
- tag suggestion hint surface
- future tag registry
- future tag cleanup or moderation rules

## Minimal Example Shape

```json
{
  "tag_classes": [
    {
      "tag_id": "bug",
      "tag_label": "bug",
      "tag_class": "canonical_shared",
      "scope": "global"
    },
    {
      "tag_id": "live-link",
      "tag_label": "live-link",
      "tag_class": "overlay_local",
      "scope": "overlay_ohmic"
    },
    {
      "tag_id": "follow-up-friday",
      "tag_label": "follow-up-friday",
      "tag_class": "operator_freeform",
      "scope": "operator"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- tag classes
- scope rules
- duplicate-label conflict handling
- explicit promotion boundary

That is enough to keep tag growth structured without freezing useful work.
