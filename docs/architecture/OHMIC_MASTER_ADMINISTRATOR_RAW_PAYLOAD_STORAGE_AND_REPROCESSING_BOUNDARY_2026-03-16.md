# Ohmic Master Administrator Raw Payload Storage And Reprocessing Boundary

Date: 2026-03-16
Project: ohmic

## Purpose

Define how raw captured payloads are retained, referenced, and reprocessed
without turning raw blobs into the default administrator desk surface.

## Core Rule

Raw payloads should be preserved.

Raw payloads should not be the normal desk object.

The desk should operate on normalized intake and attachment families, while raw
payloads stay available for provenance, diagnostics, and reprocessing.

## Why This Boundary Exists

Without a clear raw boundary:

- desk views drift back into provider-shaped payload handling
- raw blobs start leaking into normal UI logic
- reprocessing rules stay implicit and dangerous

This boundary keeps:

- raw truth retained
- desk surfaces clean
- reprocessing possible

at the same time.

## Object Family

### 1. `RawPayloadRecord`

Represents the stored raw payload exactly or near-exactly as captured.

Minimum fields:

- `raw_payload_id`
- `ingestion_id`
- `native_format_kind`
- `source_type`
- `source_account_id`
- `source_external_ref`
- `storage_ref`
- `checksum`
- `captured_at`
- `retention_class`
- `status`

Suggested `status` values:

- `stored`
- `expired`
- `corrupted`
- `reprocessed`

### 2. `RawPayloadAttachmentRecord`

Represents a raw attachment stored alongside the parent raw payload.

Minimum fields:

- `raw_attachment_id`
- `raw_payload_id`
- `filename`
- `mime_type`
- `byte_length`
- `checksum`
- `storage_ref`
- `retention_class`

### 3. `ReprocessRequest`

Represents an explicit request to rerun normalization or asset extraction from
stored raw payload truth.

Minimum fields:

- `reprocess_request_id`
- `target_raw_payload_id`
- `trigger_reason`
- `requested_by`
- `requested_at`
- `requested_scope`
- `status`

Suggested `requested_scope` values:

- `full_payload`
- `text_only`
- `attachment_only`

Suggested `status` values:

- `queued`
- `running`
- `completed`
- `failed`

## Retention Classes

Suggested first retention classes:

- `diagnostic_short_term`
- `evidence_retained`
- `fixture_candidate`
- `cold_archive`

The first implementation does not need all retention automation, but the class
field should exist from the start.

## Desk Boundary

The administrator shell should normally see:

- normalized body
- attachment bundle
- warnings
- provenance summary

The shell should not normally see:

- raw RFC822 text
- raw JSON webhook body
- unprocessed binary payloads

unless the operator intentionally opens a diagnostics or reprocessing path.

## Reprocessing Triggers

Valid reprocessing reasons include:

- parser improved
- prior normalization warning
- corrupted preview generation
- operator requested deeper extraction
- attachment parsing failed earlier

Reprocessing should always reference stored raw truth, not a reconstructed desk
summary.

## Provenance Rule

Every normalized intake item should be able to trace back to:

- raw payload id
- original source refs
- checksum-backed stored object

This protects the system from losing source truth when higher layers are edited
or re-run.

## Minimal Example Shape

```json
{
  "raw_payload_record": {
    "raw_payload_id": "raw_20260316_001",
    "ingestion_id": "ingest_20260316_001",
    "native_format_kind": "email_rfc822",
    "source_type": "gmail",
    "source_account_id": "src_ops_gmail",
    "source_external_ref": "gmail:18d4c1c0c6d3",
    "storage_ref": "store://raw-intake/2026/03/16/mail-18d4c1c0c6d3.eml",
    "checksum": "sha256:def456",
    "captured_at": "2026-03-16T05:45:00Z",
    "retention_class": "evidence_retained",
    "status": "stored"
  },
  "reprocess_request": {
    "reprocess_request_id": "reproc_20260316_001",
    "target_raw_payload_id": "raw_20260316_001",
    "trigger_reason": "attachment_preview_failed",
    "requested_by": "switchyard",
    "requested_at": "2026-03-16T05:48:00Z",
    "requested_scope": "attachment_only",
    "status": "queued"
  }
}
```

## First Safe Implementation

The first implementation only needs:

- raw payload record
- storage refs and checksums
- retention class field
- explicit reprocess request object

That is enough to keep provenance and retry paths honest without overbuilding a
storage platform.
