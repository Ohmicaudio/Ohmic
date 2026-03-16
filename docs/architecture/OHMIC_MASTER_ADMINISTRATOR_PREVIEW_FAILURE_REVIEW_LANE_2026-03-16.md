# Ohmic Master Administrator Preview Failure Review Lane

Date: 2026-03-16
Project: ohmic

## Purpose

Define the review lane for intake items whose attachment previews failed or
remain unavailable.

## Core Rule

Preview failures should surface in a dedicated review lane instead of
disappearing inside generic warning noise.

## Review Row Fields

Minimum fields:

- `intake_id`
- `attachment_bundle_id`
- `preview_failure_count`
- `preview_failure_reasons[]`
- `latest_preview_attempt_at`
- `reprocess_eligible`
- `recommended_next_action`

## Exit Conditions

An item should leave the lane when:

- preview generation succeeds
- the unsupported condition is accepted and cleared from review
- the item is archived or held out of active review

## Reprocess Rule

The lane should expose whether retry is appropriate for:

- one failed asset
- the full attachment bundle
- preview generation only

## Minimal Example

```json
{
  "intake_id": "intake_20260316_044",
  "attachment_bundle_id": "bundle_20260316_014",
  "preview_failure_count": 1,
  "preview_failure_reasons": [
    "preview_generation_failed"
  ],
  "latest_preview_attempt_at": "2026-03-16T12:58:00Z",
  "reprocess_eligible": true,
  "recommended_next_action": "retry_preview_generation"
}
```

## First Safe Implementation

The first implementation only needs:

- one queue row per impacted intake item
- preview failure counts and reasons
- retry eligibility
- clear exit conditions

That is enough to keep preview problems visible and actionable.
