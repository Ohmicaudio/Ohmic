# Ohmic Master Administrator File And Email Intake Pipeline

Date: 2026-03-15
Project: ohmic

## Purpose

Define the first truthful outside-world intake lane so email and file drop
inputs normalize into the administrator intake model before they are routed
into internal work.

## Scope

This first pipeline covers:

- inbound email
- manual or provider-backed file drop/upload intake
- attachment capture
- normalization into `AdministratorIntakeItem`

It does not yet require:

- every provider implementation
- final web UI
- full orchestrator automation

## Core Rule

Email and file intake should meet in one normalization lane.

That means:

- raw provider payloads do not become the long-term source of truth
- normalized intake objects do

## Pipeline Shape

```text
provider or manual source
-> raw intake capture
-> attachment extraction
-> normalization
-> AdministratorIntakeItem + AttachmentBundle + AttachmentAsset
-> administrator triage/routing
-> optional internal task/request creation
```

## Ingress Sources

### Email

Expected first shapes:

- mailbox poll/import
- provider webhook event
- manual forward/import

Captured raw facts:

- provider message id
- thread id if present
- sender identity
- subject
- body text/html refs
- attachment refs
- received timestamp

### File Drop / Upload

Expected first shapes:

- local file upload in admin UI
- watched folder/drop ingestion
- manual operator attach

Captured raw facts:

- uploader/operator identity
- filenames
- byte sizes
- mime hints
- upload timestamp
- optional description/note

## Normalization Steps

### Step 1. Raw Receipt Record

Create a short-lived raw receipt object per inbound event.

Purpose:

- preserve provider/native facts long enough to normalize them
- keep provider payloads out of the long-lived admin model

### Step 2. Attachment Capture

Extract attachments or file payloads into:

- `AttachmentBundle`
- `AttachmentAsset[]`

Each asset gets:

- stable id
- storage ref
- file identity metadata
- parse hints

### Step 3. Intake Classification

Derive a first `intake_kind` from the payload:

- `email`
- `file_drop`
- `bug_report`
- `content_request`
- `support_request`
- `mixed_bundle`

This is a normalization decision, not a permanent business promise. An item can
still be routed differently later.

### Step 4. Intake Object Creation

Create one `AdministratorIntakeItem` with:

- title
- summary
- source account
- source thread ref if present
- bundle ref
- initial status `captured` or `normalized`
- tags and trust hints

### Step 5. Triage Readiness

Mark the item ready for administrator review once:

- core metadata exists
- attachment bundle is linked
- basic normalization completed

At that point the item can enter the admin routing surface.

## Why Email And Files Share One Lane

Because the real admin problem is not "email versus upload."

The real problem is:

- something arrived from outside
- it may include files
- it needs normalization
- it may become work later

If email and file drop get separate long-term models too early, they will drift
and make routing harder.

## Minimal Storage/State Split

Recommended surfaces:

- raw receipt store
  - provider/native facts only
- attachment storage + asset metadata
  - file identity and storage refs
- normalized intake store
  - admin-facing truth

The normalized intake store should be the surface the admin UI reads first.

## Failure Handling

Recommended states:

- `captured`
- `normalized`
- `needs_manual_review`
- `capture_failed`
- `attachment_partial`

Examples:

- email body captured but one attachment failed -> `attachment_partial`
- provider message parsed badly -> `needs_manual_review`
- upload failed before storage ref existed -> `capture_failed`

This keeps failures explicit without pretending the whole intake vanished.

## Relationship To Later Tasks

This pipeline depends on:

- `OHMIC_MASTER_ADMINISTRATOR_INTAKE_DOMAIN_MODEL_2026-03-15.md`
- `OHMIC_MASTER_ADMINISTRATOR_PROVIDER_ADAPTER_BOUNDARY_2026-03-15.md`

This pipeline should feed:

1. command routing surface
2. web scaffold wave

## First Safe Implementation Packet

The first implementation packet should be narrow:

1. one raw intake append path
2. one normalization pass into `AdministratorIntakeItem`
3. one attachment bundle capture path
4. one admin-readable list/detail surface

That is enough to make the first truthful intake lane real without widening
into every provider at once.
