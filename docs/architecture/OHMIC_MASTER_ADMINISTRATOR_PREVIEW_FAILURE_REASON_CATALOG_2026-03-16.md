# Ohmic Master Administrator Preview Failure Reason Catalog

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable reason catalog used when preview generation fails or remains
unavailable.

## Core Rule

Preview failures should use stable reason codes, not ad hoc freeform error
strings in desk projections.

## First Reason Set

Suggested first codes:

- `preview_unsupported_mime_family`
- `preview_generation_failed`
- `preview_generator_missing`
- `preview_cold_retrieval_required`
- `preview_source_corrupted`
- `preview_timed_out`

## Display Rule

Each reason should map to:

- `reason_code`
- `display_label`
- `retry_hint`

## Minimal Example

```json
{
  "reason_code": "preview_timed_out",
  "display_label": "Preview timed out",
  "retry_hint": "retry_allowed"
}
```

## First Safe Implementation

The first implementation only needs:

- a short stable reason catalog
- display labels
- retry hints

That is enough to keep preview failure handling consistent.
