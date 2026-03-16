# Ohmic Master Administrator Attachment Preview Reference Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the projection used to render attachment preview references in the
administrator desk.

## Core Rule

The desk should render previews from projected preview refs rather than joining
directly against raw preview-generation internals.

## Projection Shape

Suggested object:

`AdministratorAttachmentPreviewReferenceProjection`

Minimum fields:

- `preview_ref_id`
- `asset_id`
- `preview_kind`
- `availability`
- `preview_url`
- `fallback_label`
- `failure_reason`

Suggested `availability` values:

- `ready`
- `pending`
- `failed`
- `unsupported`

## Minimal Example

```json
{
  "preview_ref_id": "preview_20260316_011",
  "asset_id": "asset_20260316_044",
  "preview_kind": "image_thumb",
  "availability": "ready",
  "preview_url": "/previews/preview_20260316_011.png",
  "fallback_label": "Image preview",
  "failure_reason": null
}
```

## First Safe Implementation

The first implementation only needs:

- projected preview refs
- availability state
- preview URL or fallback label
- failure reason field

That is enough for stable preview rendering.
