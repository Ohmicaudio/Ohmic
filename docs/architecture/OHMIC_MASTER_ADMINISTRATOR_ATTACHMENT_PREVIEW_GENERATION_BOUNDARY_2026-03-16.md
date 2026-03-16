# Ohmic Master Administrator Attachment Preview Generation Boundary

Date: 2026-03-16
Project: ohmic

## Purpose

Define where preview generation lives and how preview refs are produced without
collapsing previews into raw storage or browser-side logic.

## Core Rule

Preview generation is backend/runtime work that produces derived preview refs.

The browser should consume preview refs, not generate previews from raw assets.

## Ownership Rule

Preview generation should be owned by the backend or a worker-like runtime
surface that can:

- read raw or retained asset storage
- run preview generation tools
- emit derived preview refs
- record failures consistently

## Trigger Rule

Preview generation may be triggered by:

- initial intake normalization
- explicit operator preview request
- reprocess or retry workflow
- parser or previewer upgrade

## Derived Preview Ref

Preview generation should produce or update:

- `preview_ref_id`
- `asset_id`
- `preview_kind`
- `preview_storage_ref`
- `generated_at`
- `status`

Suggested `status` values:

- `ready`
- `pending`
- `failed`
- `unsupported`

## Cold Storage Boundary

If the raw asset requires cold retrieval:

- the preview request should surface as pending or deferred
- the desk should not attempt direct raw retrieval on its own

## First Safe Implementation

The first implementation only needs:

- backend/runtime preview ownership
- explicit trigger sources
- derived preview ref objects
- clear failed/unsupported states

That is enough to keep preview behavior bounded and auditable.
