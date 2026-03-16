# Ohmic Master Administrator Raw Payload Retention Tier Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define the retention tiers and lifecycle rules for raw payloads and raw
attachments so provenance stays intact without letting raw storage grow without
limits.

## Core Rule

Raw payloads should be retained by policy tier, not by accident.

The desk should be able to trust that raw truth still exists when needed for
audit or reprocessing, while obviously disposable captures can age out safely.

## Retention Tiers

### 1. `diagnostic_short_term`

Use for low-value captures kept only long enough to debug parser or intake
issues.

Suggested behavior:

- keep full raw payload and attachments
- default retention window of days, not months
- purge automatically if no linked warning, retry, or audit hold exists

### 2. `review_window`

Use for normal newly ingested payloads during the operator review and
normalization confidence window.

Suggested behavior:

- keep full raw payload and attachments
- allow preview generation and reprocess during the first review window
- promote or demote after review outcome is stable

### 3. `fixture_candidate`

Use for payloads or attachments worth preserving as future parser or regression
fixtures.

Suggested behavior:

- keep raw source and key derived references
- require a fixture note or rationale before promotion
- prevent routine purge until explicitly reclassified

### 4. `evidence_retained`

Use for business-significant, audit-significant, or dispute-relevant payloads.

Suggested behavior:

- preserve raw payload and attachment bundle
- do not purge by age alone
- allow reprocess attempts without changing stored source truth

### 5. `cold_archive`

Use for material that should remain recoverable but does not need warm desk
storage.

Suggested behavior:

- move to cheaper storage
- keep checksum, source refs, and retrieval metadata hot
- allow slower retrieval for later audit or reprocess

## Required Fields

Each `RawPayloadRecord` and `RawPayloadAttachmentRecord` should carry:

- `retention_tier`
- `retention_assigned_at`
- `retention_review_at`
- `retention_hold_reason`
- `purge_eligible`

`retention_hold_reason` may be empty, but the field should exist so audit and
operator holds are explicit.

## Lifecycle Rules

### Initial assignment

New raw payloads should default to `review_window` unless the source adapter
already knows they belong in `diagnostic_short_term` or `evidence_retained`.

### Promotion

A payload may be promoted when:

- an operator marks it evidence-relevant
- it becomes a parser fixture candidate
- repeated warning/reprocess activity shows it is valuable for regression

### Demotion

A payload may be demoted when:

- review closes cleanly
- no warning or retry history remains relevant
- no audit or evidence hold exists

### Purge eligibility

A raw payload is purge-eligible only when all of the following are true:

- `retention_tier` allows purge
- there is no open reprocess request
- there is no active audit or evidence hold
- there is no designated fixture-candidate reason

## Attachment Rule

Raw attachments inherit the parent payload tier by default.

An attachment may override upward to a stricter tier if it becomes:

- the only recoverable evidence artifact
- a valuable parser fixture
- the source of unresolved warning or preview failures

## Audit Rule

Tier changes should append a retention history event with:

- `changed_at`
- `changed_by`
- `old_tier`
- `new_tier`
- `reason`

Retention should be reviewable without reopening raw storage.

## Minimal Example

```json
{
  "raw_payload_id": "raw_20260316_014",
  "retention_tier": "review_window",
  "retention_assigned_at": "2026-03-16T10:15:00Z",
  "retention_review_at": "2026-03-23T10:15:00Z",
  "retention_hold_reason": null,
  "purge_eligible": false
}
```

## First Safe Implementation

The first implementation only needs:

- the five explicit tiers
- tier fields on raw payload and raw attachment records
- promotion, demotion, and purge-eligibility rules
- retention history events

That is enough to keep storage growth manageable without sacrificing source
truth.
