# Ohmic Master Administrator Intake Status Lifecycle

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable status lifecycle for Master Administrator intake items so the
desk, validation layer, and future automation all reason about the same intake
state model.

## Core Rule

One intake item should have one authoritative current state.

Actions may change that state.

Projections, validation, and audit should read from the same lifecycle instead
of inventing local status vocabularies.

## Lifecycle Position

```text
capture
-> normalize
-> queued for review
-> routed / waiting / held / archived
-> optionally reopened or reprocessed
```

## Canonical Status Family

### Early Capture States

- `captured`
  - raw payload stored or received
  - native staging record may exist
  - not yet ready for normal desk routing

- `normalized`
  - normalized envelope and intake item were created successfully
  - item is eligible for desk review

- `normalized_with_warnings`
  - intake was created, but parsing or asset handling needs caution
  - eligible for review, but should surface warning markers

- `manual_review_required`
  - normalization did not fail completely, but the result is too weak for normal
    queue treatment without human review

### Desk Working States

- `queued`
  - normal default desk state
  - item is visible for selection and routing

- `held`
  - intentionally paused by administrator action
  - not archived, not routed, still part of live work

- `waiting_on_provider`
  - external/provider-side follow-up is needed before progress

- `waiting_on_human`
  - a human response, decision, or missing detail is needed before progress

### Routed/Resolved States

- `routed`
  - handed off to orchestrator or another downstream queue
  - still auditable, but no longer waiting for initial desk triage

- `archived`
  - intentionally closed or filed away
  - should no longer appear in the active default queue

### Recovery States

- `reprocessing`
  - raw payload or intake item is being re-run through normalization or repair

- `failed`
  - capture or normalization failed in a way that prevents usable intake until
    manual intervention

## Allowed Transition Family

### Early Phase

- `captured` -> `normalized`
- `captured` -> `normalized_with_warnings`
- `captured` -> `manual_review_required`
- `captured` -> `failed`

### Review Phase

- `normalized` -> `queued`
- `normalized_with_warnings` -> `queued`
- `normalized_with_warnings` -> `manual_review_required`
- `manual_review_required` -> `queued`
- `manual_review_required` -> `reprocessing`
- `failed` -> `reprocessing`

### Working Phase

- `queued` -> `held`
- `queued` -> `waiting_on_provider`
- `queued` -> `waiting_on_human`
- `queued` -> `routed`
- `queued` -> `archived`

- `held` -> `queued`
- `held` -> `routed`
- `held` -> `archived`

- `waiting_on_provider` -> `queued`
- `waiting_on_provider` -> `held`
- `waiting_on_provider` -> `archived`

- `waiting_on_human` -> `queued`
- `waiting_on_human` -> `held`
- `waiting_on_human` -> `archived`

### Recovery Phase

- `reprocessing` -> `normalized`
- `reprocessing` -> `normalized_with_warnings`
- `reprocessing` -> `manual_review_required`
- `reprocessing` -> `failed`

### Reopen Rule

- `archived` -> `queued`
- `routed` -> `queued`

These should require explicit reopen or equivalent administrator intent rather
than happening as an accidental side effect.

## Invalid Or Ambiguous Transitions

Examples that should be rejected unless a later policy packet explicitly allows
them:

- `archived` -> `archived`
- `routed` -> `routed`
- `failed` -> `routed`
- `captured` -> `routed`
- `queued` -> `captured`
- `waiting_on_provider` -> `waiting_on_provider`

## Projection Guidance

Default active queue should include:

- `queued`
- `normalized_with_warnings`
- `manual_review_required`

Secondary or filtered queues may include:

- `held`
- `waiting_on_provider`
- `waiting_on_human`

Normal active queue should exclude:

- `archived`
- `routed`
- `failed`

unless a specific recovery or audit view is requested.

## Relationship To Command Validation

The command validation layer should use lifecycle state to decide:

- whether an action is allowed
- whether a reopen is required first
- whether a warning or approval gate should be inserted

This means status lifecycle is upstream of many command decisions.

## Minimal Example Shape

```json
{
  "intake_id": "intake_20260316_001",
  "current_status": "queued",
  "status_history": [
    {
      "status": "captured",
      "at": "2026-03-16T05:02:00Z"
    },
    {
      "status": "normalized",
      "at": "2026-03-16T05:02:04Z"
    },
    {
      "status": "queued",
      "at": "2026-03-16T05:02:05Z"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- canonical current-status field
- ordered status history
- allowed transition map
- projection filters for active versus inactive desk states

That is enough to drive the first shell and backend validation honestly.
