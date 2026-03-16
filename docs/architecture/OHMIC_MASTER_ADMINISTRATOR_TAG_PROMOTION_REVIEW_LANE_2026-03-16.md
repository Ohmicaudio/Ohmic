# Ohmic Master Administrator Tag Promotion Review Lane

Date: 2026-03-16
Project: ohmic

## Purpose

Define the bounded review lane for candidate tags that may deserve promotion
from overlay-local or ad hoc use into a more stable shared vocabulary.

## Core Rule

New tags should not silently become shared taxonomy just because they were used
often.

Promotion should happen through an explicit review lane.

## Entry Conditions

A tag becomes a promotion candidate when:

- it recurs across multiple intake items
- it appears in several overlays
- it collides with an existing near-duplicate label
- operators mark it as a likely shared concept

## Candidate Row Shape

Minimum fields:

- `candidate_tag_label`
- `candidate_source_count`
- `overlay_count`
- `example_intake_ids[]`
- `collision_candidates[]`
- `recommended_outcome`

Suggested `recommended_outcome` values:

- `promote_to_shared`
- `keep_overlay_local`
- `merge_into_existing`
- `reject`

## Decision Record

Each reviewed candidate should produce:

- `decision`
- `decided_by`
- `decided_at`
- `resulting_tag_id`
- `reason`

## Minimal Example

```json
{
  "candidate_tag_label": "remote-start-install",
  "candidate_source_count": 6,
  "overlay_count": 2,
  "example_intake_ids": [
    "intake_20260316_029",
    "intake_20260316_034"
  ],
  "collision_candidates": [
    "remote_start"
  ],
  "recommended_outcome": "merge_into_existing"
}
```

## First Safe Implementation

The first implementation only needs:

- candidate rows
- duplicate/collision visibility
- explicit promotion decisions

That is enough to let the taxonomy grow without drifting silently.
