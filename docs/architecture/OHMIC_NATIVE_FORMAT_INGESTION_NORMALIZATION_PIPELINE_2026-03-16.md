# Ohmic Native Format Ingestion Normalization Pipeline

Date: 2026-03-16
Project: ohmic

## Purpose

Define the early normalization path that converts raw external or provider
input into stable native internal structures with minimal transcription churn,
reduced token waste, and explicit error handling.

## Core Rule

Capture raw input once.

Normalize it once.

Then let the rest of the system consume native internal shapes instead of
re-parsing provider payloads repeatedly.

## Why This Pipeline Matters

Without an early normalization pipeline, the system pays the same costs again
and again:

- repeated text extraction
- repeated attachment inspection
- repeated provider metadata interpretation
- repeated prompt/context expansion to explain the same raw payload

That wastes tokens, increases mismatch risk, and makes different tools reason
about the same input differently.

## Pipeline Position

Recommended path:

```text
raw provider or native input
-> raw receipt capture
-> native-format staging object
-> normalization pass
-> provider-agnostic intake envelope
-> administrator intake objects and downstream work
```

The key difference is that the pipeline preserves native input facts before
they are summarized into the provider-agnostic intake envelope.

## Stage 1. Raw Input Capture

Capture the input as close to its original shape as possible.

Examples:

- RFC822 email payload
- provider API JSON payload
- uploaded CSV file
- native image attachment
- manual note text blob

Raw capture should preserve:

- original format kind
- source account/provider id
- source external ref
- arrival timestamp
- original payload storage ref
- attachment refs exactly as received

This stage is archival and diagnostic, not the main working shape.

## Stage 2. Native-Format Staging Object

Before full normalization, create one internal staging object that records the
native payload in a structured way.

Suggested object:

`NativeFormatIngestionRecord`

Minimum fields:

- `ingestion_id`
- `native_format_kind`
- `source_type`
- `source_account_id`
- `source_external_ref`
- `captured_at`
- `raw_payload_ref`
- `attachment_refs[]`
- `normalization_state`
- `parse_confidence`
- `errors[]`

This is the stable internal seam between raw capture and normalized envelope
creation.

## Stage 3. Normalization Pass

Run one normalization pass that extracts:

- usable title
- usable normalized text/body
- native format summary
- normalized attachment refs
- parsing confidence
- routing hints if appropriate

The pass should preserve source facts rather than replacing them.

## Metadata Preservation Rule

Provider metadata should stay available throughout the pipeline.

Preserve at least:

- provider kind
- account id
- external message or object id
- thread id if present
- native format kind
- checksum or storage ref

Normalization should not destroy provenance just because a cleaner text summary
was produced.

## Parsing Confidence

Each normalization result should carry a confidence status.

Suggested values:

- `high`
- `medium`
- `low`
- `manual_required`

Use this to decide whether downstream surfaces can trust the normalized text or
should show a manual-review warning.

## Error And Fallback Handling

Recommended normalization states:

- `captured`
- `staged`
- `normalized`
- `normalized_with_warnings`
- `manual_review_required`
- `failed`

Examples:

- body parsed cleanly but one attachment type is unknown ->
  `normalized_with_warnings`
- provider payload is malformed but stored -> `manual_review_required`
- upload stream breaks before raw payload is fully stored -> `failed`

Fallback rule:

- keep the raw payload and native staging record even when the normalized
  envelope is weak or partial

That prevents total loss and supports later reprocessing.

## Relationship To Provider-Agnostic Envelope

This pipeline feeds the provider-agnostic envelope.

Suggested mapping:

- `NativeFormatIngestionRecord` -> internal preserved native truth
- `ProviderAgnosticIntakeEnvelope` -> higher-level shared intake surface

The staging record exists to prevent repeated provider-shape parsing.
The envelope exists to let higher layers ignore provider shape differences.

## Minimal Example Shape

```json
{
  "ingestion_id": "ingest_20260316_001",
  "native_format_kind": "email_rfc822",
  "source_type": "gmail",
  "source_account_id": "src_ops_gmail",
  "source_external_ref": "gmail:18d4c1c0c6d3",
  "captured_at": "2026-03-16T02:45:00Z",
  "raw_payload_ref": "store://raw-intake/2026/03/16/mail-18d4c1c0c6d3.eml",
  "attachment_refs": [
    "store://raw-intake/2026/03/16/fire-tablet-screenshot.png"
  ],
  "normalization_state": "normalized_with_warnings",
  "parse_confidence": "medium",
  "errors": [
    {
      "code": "html_body_removed",
      "message": "HTML body was discarded after plain text normalization."
    }
  ]
}
```

## Token-Reduction Benefit

This pipeline reduces token waste because higher layers no longer need to:

- inspect raw email structure repeatedly
- re-extract filenames and MIME types
- reinterpret provider metadata in each consumer
- explain native format quirks in every follow-on pass

Instead they consume:

- one native staging record
- one provider-agnostic intake envelope

## First Safe Implementation

The first implementation only needs:

1. raw payload storage ref capture
2. one native staging record shape
3. one normalization pass into the provider-agnostic envelope
4. explicit parse confidence and error states

That is enough to give later admin and routing work one stable ingestion model.

## Immediate Follow-On

This pipeline should feed:

1. non-API interface adapter model
2. provider-backed ingestion adapters later
3. the administrator shell read model without repeated raw parsing
