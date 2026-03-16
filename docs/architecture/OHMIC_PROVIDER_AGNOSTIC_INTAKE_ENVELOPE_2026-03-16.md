# Ohmic Provider-Agnostic Intake Envelope

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable normalized envelope that every outside-world intake source
should produce before administrator routing, overlay policy, or provider
specific behavior takes over.

## Core Rule

Providers may capture differently.

They must normalize the same way.

That means Gmail, file drops, native format imports, webhook payloads, and
manual intake should all converge into one envelope family before the
administrator layer reasons about them.

## Why This Envelope Exists

Without a provider-agnostic envelope, the administrator layer would end up
depending on:

- Gmail thread ids in one path
- upload metadata in another path
- provider-specific file payload rules in a third path

That would make intake routing and admin UI behavior provider-shaped instead of
system-shaped.

## Envelope Position In The Pipeline

Recommended flow:

```text
provider or native source
-> raw receipt
-> provider adapter extraction
-> provider-agnostic intake envelope
-> administrator intake item + attachment bundle
-> admin routing and downstream work
```

The provider-agnostic envelope is not the final admin object. It is the stable
normalization seam between raw source capture and administrator-owned intake
state.

## Recommended Object Family

### 1. `ProviderAgnosticIntakeEnvelope`

The main normalized object.

Minimum fields:

- `envelope_id`
- `native_format_kind`
- `source_type`
- `source_account_id`
- `source_external_ref`
- `captured_at`
- `title`
- `normalized_body`
- `normalized_body_format`
- `attachment_refs[]`
- `parse_confidence`
- `routing_suggestion`
- `tags[]`
- `trust_hint`
- `raw_receipt_ref`

### 2. `ProviderAgnosticAttachmentRef`

Reference object for each normalized attachment.

Minimum fields:

- `attachment_ref_id`
- `filename`
- `mime_type`
- `byte_length`
- `checksum`
- `storage_ref`
- `parse_hints[]`

### 3. `ProviderAgnosticRoutingSuggestion`

Optional non-binding routing hint produced during normalization.

Minimum fields:

- `suggested_intake_kind`
- `suggested_priority`
- `suggested_tags[]`
- `confidence`
- `reason`

This is advisory only. It does not replace administrator judgment.

## Required Envelope Fields

### Intake Identity

- `envelope_id`
- `raw_receipt_ref`
- `source_external_ref`

These let the system track normalization without forcing later layers to keep
provider payloads open.

### Source Identity

- `source_type`
  - `gmail`
  - `imap`
  - `filesystem`
  - `manual`
  - `web_form`
  - `native_import`
  - `provider_api`
- `source_account_id`

These give the admin layer safe provenance without leaking credentials.

### Normalized Text Surface

- `title`
- `normalized_body`
- `normalized_body_format`

Every provider should normalize its usable text into one readable body surface.

Suggested formats:

- `plain_text`
- `markdown`
- `structured_summary`

### Attachment References

- `attachment_refs[]`

The envelope should point at normalized attachment references, not embed raw
binary payloads.

### Native Format Kind

- `native_format_kind`

Examples:

- `email_rfc822`
- `multipart_upload`
- `json_api_payload`
- `csv_drop`
- `manual_note`

This keeps source-format truth available without forcing higher layers to parse
native payload rules directly.

### Parsing Confidence

- `parse_confidence`

Suggested values:

- `high`
- `medium`
- `low`
- `manual_required`

This lets the admin layer know whether normalization was straightforward or
whether provider quirks still need operator review.

### Routing Suggestion

- `routing_suggestion`

This can suggest:

- likely intake kind
- likely priority
- likely tags

But it must remain advisory.

## Relationship To Administrator Objects

The provider-agnostic envelope feeds the administrator intake model.

Suggested mapping:

- `ProviderAgnosticIntakeEnvelope.title` ->
  `AdministratorIntakeItem.title`
- `normalized_body` -> summary seed or detailed intake text source
- `attachment_refs[]` -> `AttachmentBundle` and `AttachmentAsset[]`
- `routing_suggestion` -> initial tag and priority hints
- `source_type` and `source_account_id` -> `SourceAccount` correlation

The envelope should disappear behind the administrator layer during normal UI
use. It is a normalization seam, not the permanent human-facing record.

## Minimal Example Shape

```json
{
  "envelope_id": "env_20260316_001",
  "native_format_kind": "email_rfc822",
  "source_type": "gmail",
  "source_account_id": "src_ops_gmail",
  "source_external_ref": "gmail:18d4c1c0c6d3",
  "captured_at": "2026-03-16T02:20:00Z",
  "title": "Fold live device smoke still fails discovery",
  "normalized_body": "Operator reports that the handset joined the session but never surfaced the live AmpLab endpoint.",
  "normalized_body_format": "plain_text",
  "attachment_refs": [
    {
      "attachment_ref_id": "att_20260316_001",
      "filename": "fire-tablet-screenshot.png",
      "mime_type": "image/png",
      "byte_length": 183224,
      "checksum": "sha256:abc123",
      "storage_ref": "store://intake/2026/03/16/fire-tablet-screenshot.png",
      "parse_hints": ["screenshot", "ui"]
    }
  ],
  "parse_confidence": "high",
  "routing_suggestion": {
    "suggested_intake_kind": "support_request",
    "suggested_priority": "normal",
    "suggested_tags": ["handset", "amplab", "smoke"],
    "confidence": "medium",
    "reason": "message content references a live validation pass with one screenshot"
  },
  "tags": ["ops"],
  "trust_hint": "known-operator",
  "raw_receipt_ref": "raw_20260316_001"
}
```

## First Safe Implementation

The first real implementation only needs:

1. one raw receipt shape per provider
2. one adapter that normalizes into this envelope
3. one mapper from envelope to administrator intake objects

That is enough to let many provider shapes converge before the web shell reads
them.

## Immediate Follow-On

This envelope should feed:

1. native-format ingestion normalization pipeline
2. non-API interface adapter model
3. scaffold master administrator web shell against current JSON state
