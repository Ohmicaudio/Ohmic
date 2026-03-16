# Ohmic Non-API Interface Adapter Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define how non-API interfaces such as local folder intake, upload and drag-drop
surfaces, manual operator paste, and device-assisted capture should plug into
the administrator intake system without pretending every meaningful input path
is a provider API.

## Core Rule

An intake adapter is anything that turns outside-world input into the native
ingestion pipeline.

It does not need to be an API client.

## Why This Matters

Real intake often arrives through awkward surfaces:

- a watched local folder
- a drag-and-drop upload
- a copied block of text from a vendor portal
- a phone or tablet-assisted capture path
- a file exported by a device with no usable API

If the system assumes every intake path is a provider API, these become
second-class hacks instead of stable ingestion paths.

## Adapter Boundary

A non-API interface adapter should own:

- source capture mechanics
- safe source metadata
- raw payload or file staging
- adapter-specific parsing hints
- emission into the native ingestion pipeline

It should not own:

- administrator routing decisions
- project overlay policy
- browser layout
- worker claim logic
- provider credential handling

## Supported Non-API Interface Families

Recommended first families:

### 1. Local Folder Watcher

Examples:

- watched drop folder
- USB-synced export directory
- machine-local import inbox

Adapter responsibilities:

- detect new files
- capture file identity and storage refs
- emit a native ingestion record

### 2. Upload Or Drag-Drop Surface

Examples:

- admin browser upload
- drag-and-drop file packet
- manual import zone

Adapter responsibilities:

- capture uploaded files
- preserve uploader/operator identity
- attach optional note/context
- emit a native ingestion record

### 3. Manual Operator Paste

Examples:

- pasted email body
- copied issue text
- copied CSV fragment
- vendor portal excerpt

Adapter responsibilities:

- preserve original pasted block
- record source hint and operator identity
- emit a native ingestion record with manual-source metadata

### 4. Device-Assisted Interface

Examples:

- phone-assisted file handoff
- tablet camera/document capture
- device export import

Adapter responsibilities:

- capture device-origin metadata
- preserve transferred file or payload refs
- note device-assisted provenance
- emit a native ingestion record

## Recommended Adapter Object

Suggested common object:

`NonApiInterfaceAdapter`

Minimum fields:

- `adapter_id`
- `adapter_kind`
- `source_surface`
- `supported_native_formats[]`
- `capture_mode`
- `produces_raw_payload`
- `produces_attachment_refs`
- `metadata_fields[]`

## Common Adapter Contract

Every non-API adapter should be able to produce:

- one raw capture record or payload ref
- one native ingestion record
- one set of source metadata
- one parse-confidence starting point

That keeps these adapters aligned with the same native ingestion pipeline as
provider-backed sources.

## Safe Source Metadata

Recommended fields:

- `adapter_kind`
  - `folder_watcher`
  - `upload_surface`
  - `manual_paste`
  - `device_assisted`
- `operator_id`
- `device_id` if present
- `capture_location`
- `captured_at`
- `source_hint`

This lets later admin review understand where the input came from even when no
provider API exists.

## Relationship To Native Ingestion

The non-API adapter model should feed the native-format ingestion normalization
pipeline directly.

Flow:

```text
non-api interface
-> non-api adapter
-> raw capture ref + native ingestion record
-> normalization
-> provider-agnostic intake envelope
-> administrator intake objects
```

This keeps API and non-API inputs converging on the same normalized path.

## Minimal Example Shape

```json
{
  "adapter_id": "adapter_manual_paste_v1",
  "adapter_kind": "manual_paste",
  "source_surface": "admin_web_shell",
  "supported_native_formats": ["manual_note", "plain_text", "csv_drop"],
  "capture_mode": "operator_submitted",
  "produces_raw_payload": true,
  "produces_attachment_refs": false,
  "metadata_fields": [
    "operator_id",
    "captured_at",
    "source_hint"
  ]
}
```

## Why Non-API Adapters Should Be First-Class

Because they often cover the hardest real-world cases:

- no official provider API exists
- API access is unavailable or overkill
- the real source is a human handoff
- the source is a device export, not a live service

Treating these as first-class adapters keeps the administrator system grounded
in actual operations rather than idealized integrations only.

## First Safe Implementation

The first implementation only needs:

1. one local folder watcher adapter
2. one manual upload/drop adapter
3. one manual paste adapter

All three should emit the same native ingestion record family.

## Immediate Follow-On

This adapter model should feed:

1. user intervention and override rules
2. later device-assisted intake surfaces
3. project-specific overlay policy without rewriting the core intake system
