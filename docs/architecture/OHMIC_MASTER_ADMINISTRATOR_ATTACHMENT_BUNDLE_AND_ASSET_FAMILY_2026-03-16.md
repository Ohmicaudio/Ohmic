# Ohmic Master Administrator Attachment Bundle And Asset Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the attachment object family that sits between provider-agnostic intake
envelopes and the Master Administrator desk so attachment handling is stable,
desk-readable, and independent from raw provider payload structure.

## Core Rule

The desk should reason about attachment bundles and assets, not raw provider
blob structure.

Raw payloads remain available for provenance and reprocessing, but the desk
should receive one normalized bundle family.

## Object Family

### 1. `AdministratorAttachmentBundle`

Represents the attachment set associated with one intake item.

Minimum fields:

- `attachment_bundle_id`
- `intake_id`
- `source_envelope_id`
- `asset_ids[]`
- `asset_count`
- `bundle_warning_state`
- `previewable_asset_count`
- `created_at`
- `updated_at`

Purpose:

- give the desk one stable attachment handle
- support queue summaries and intake detail views

### 2. `AdministratorAttachmentAsset`

Represents one normalized asset within the bundle.

Minimum fields:

- `asset_id`
- `attachment_bundle_id`
- `source_attachment_ref_id`
- `filename`
- `mime_type`
- `byte_length`
- `checksum`
- `storage_ref`
- `preview_kind`
- `previewable`
- `parse_hints[]`
- `parse_state`
- `reprocess_eligible`
- `warning_state`

Purpose:

- give the desk a stable asset object without reopening raw provider payloads

### 3. `AdministratorAttachmentPreviewRef`

Optional derived preview object for desk use.

Minimum fields:

- `preview_ref_id`
- `asset_id`
- `preview_kind`
- `preview_storage_ref`
- `generated_at`

This is optional because not every asset should generate a preview immediately.

## Bundle Rules

The bundle should:

- belong to exactly one intake item
- summarize the current asset set
- carry bundle-level warning state if one or more assets are degraded

Bundle-level `bundle_warning_state` suggestions:

- `none`
- `partial`
- `manual_review_required`

## Asset Rules

Asset objects should preserve:

- original filename if known
- MIME type
- byte length
- checksum
- stable storage ref
- parse hints and parse state

Suggested `preview_kind` values:

- `none`
- `text`
- `image_thumb`
- `audio_waveform`
- `pdf_snapshot`

Suggested `parse_state` values:

- `uninspected`
- `indexed`
- `preview_generated`
- `warning`
- `failed`

## Previewability Rule

Previewability should be explicit.

The desk needs to know:

- whether an asset can be previewed quickly
- whether it requires cold retrieval
- whether it should remain attachment-only without preview

That prevents the browser shell from guessing based on MIME type alone.

## Reprocessing Rule

Each asset should carry `reprocess_eligible` so later repair or improved
parsers can revisit the asset without changing its identity.

Examples:

- OCR retry on an image
- metadata re-extraction from a PDF
- waveform generation from an audio attachment

## Relationship To Other Layers

Mapping:

- `ProviderAgnosticAttachmentRef` ->
  `AdministratorAttachmentAsset`
- asset set for one intake item ->
  `AdministratorAttachmentBundle`
- optional desk preview derivation ->
  `AdministratorAttachmentPreviewRef`

The bundle family should feed:

- intake queue projection attachment counts
- intake detail projection
- normalization warning review lane

## Minimal Example Shape

```json
{
  "attachment_bundle": {
    "attachment_bundle_id": "bundle_20260316_001",
    "intake_id": "intake_20260316_001",
    "source_envelope_id": "env_20260316_001",
    "asset_ids": [
      "asset_20260316_001",
      "asset_20260316_002"
    ],
    "asset_count": 2,
    "bundle_warning_state": "partial",
    "previewable_asset_count": 1,
    "created_at": "2026-03-16T05:10:00Z",
    "updated_at": "2026-03-16T05:10:05Z"
  },
  "assets": [
    {
      "asset_id": "asset_20260316_001",
      "attachment_bundle_id": "bundle_20260316_001",
      "source_attachment_ref_id": "att_20260316_001",
      "filename": "fire-tablet-screenshot.png",
      "mime_type": "image/png",
      "byte_length": 183224,
      "checksum": "sha256:abc123",
      "storage_ref": "store://intake/2026/03/16/fire-tablet-screenshot.png",
      "preview_kind": "image_thumb",
      "previewable": true,
      "parse_hints": ["screenshot", "ui"],
      "parse_state": "preview_generated",
      "reprocess_eligible": true,
      "warning_state": "none"
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- bundle object
- asset object
- attachment count and warning summary
- previewability flags
- storage and provenance fields

That is enough for intake detail, queue summaries, and later preview work
without overbuilding media handling.
