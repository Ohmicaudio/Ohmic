# Ohmic Master Administrator Reprocess And Retry Lane

Date: 2026-03-16
Project: ohmic

## Purpose

Define the safe rerun path when stored raw payloads or derived attachments need
normalization, preview generation, or extraction work repeated.

## Core Rule

Reprocessing should create a new auditable attempt against preserved raw truth.

It should not mutate history in place or duplicate the intake object as if a
second independent intake occurred.

## Lane Entry

An item enters the reprocess lane when:

- a warning state remains unresolved
- a parser or previewer failed earlier
- an operator explicitly requests a rerun
- a parser or schema upgrade makes another pass worthwhile

## Reprocess Object

Each attempt should be tracked as `AdministratorReprocessAttempt`.

Minimum fields:

- `reprocess_attempt_id`
- `target_raw_payload_id`
- `target_scope`
- `trigger_reason`
- `requested_by`
- `requested_at`
- `idempotency_key`
- `status`
- `result_summary`

Suggested `target_scope` values:

- `full_payload`
- `body_only`
- `attachment_bundle`
- `single_asset`
- `preview_only`

Suggested `status` values:

- `queued`
- `running`
- `completed`
- `completed_with_warnings`
- `failed`
- `cancelled`

## Idempotency Rule

The lane should reject or merge duplicate in-flight attempts with the same:

- `target_raw_payload_id`
- `target_scope`
- `trigger_reason`
- parser or preview generation version

That identity should form the `idempotency_key`.

An operator may still force a new attempt, but it should be explicit and leave a
reason trail.

## Retry Rule

Retry is allowed when:

- the earlier attempt failed
- the earlier result stayed degraded
- a dependency or parser changed materially
- an operator explicitly overrides the default suppression

Retry should not create a second intake row or a second attachment bundle
identity. It should update the latest derived projection while preserving the
full attempt history.

## Output Rule

A successful rerun may update:

- normalized text/body output
- attachment preview refs
- warning states
- parse confidence
- recommended next action

It should not overwrite:

- original raw payload storage refs
- original source envelope identity
- prior attempt history

## Desk Rule

The desk should see:

- current warning state
- most recent reprocess result
- whether a retry is in progress
- whether another retry is eligible

The desk should not need to inspect raw blobs to understand retry state.

## Minimal Example

```json
{
  "reprocess_attempt_id": "reproc_20260316_018",
  "target_raw_payload_id": "raw_20260316_014",
  "target_scope": "attachment_bundle",
  "trigger_reason": "attachment_preview_failed",
  "requested_by": "operator:d",
  "requested_at": "2026-03-16T10:44:00Z",
  "idempotency_key": "raw_20260316_014|attachment_bundle|attachment_preview_failed|previewer_v2",
  "status": "queued",
  "result_summary": null
}
```

## First Safe Implementation

The first implementation only needs:

- an auditable reprocess attempt object
- scope and trigger fields
- idempotency protection for duplicate in-flight work
- status and result summary

That is enough to keep retries bounded and provenance-safe.
