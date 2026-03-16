# Ohmic Master Administrator Attachment Preview Capability Matrix

Date: 2026-03-16
Project: ohmic

## Purpose

Define which attachment kinds can yield which preview kinds in the first
administrator shell.

## Core Rule

Preview expectations should come from a capability matrix, not ad hoc MIME
guessing in the browser.

## Capability Matrix

Suggested first matrix fields:

- `mime_family`
- `preview_kind`
- `preview_supported`
- `cold_retrieval_required`
- `fallback_label`
- `failure_family_default`

### First capability rows

- `image/*` -> `image_thumb`
- `text/*` -> `text`
- `application/pdf` -> `pdf_snapshot`
- `audio/*` -> `audio_waveform`
- `video/*` -> unsupported in first shell unless explicitly added later

## Unsupported Rule

Unsupported assets should still project:

- `preview_supported: false`
- a fallback label
- a stable failure or unsupported reason

That keeps preview absence explicit instead of looking like a missing field.

## Minimal Example

```json
{
  "mime_family": "application/pdf",
  "preview_kind": "pdf_snapshot",
  "preview_supported": true,
  "cold_retrieval_required": false,
  "fallback_label": "PDF preview",
  "failure_family_default": "preview_generation_failed"
}
```

## First Safe Implementation

The first implementation only needs:

- a short MIME-to-preview matrix
- unsupported behavior
- cold retrieval hint
- fallback labels

That is enough to decouple preview expectations from client guessing.
