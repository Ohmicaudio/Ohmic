# Ohmic Master Administrator Filing Destination Registry

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable registry of filing destinations used by the Master
Administrator desk so filing decisions reference canonical ids instead of loose
labels.

## Core Rule

Filing destinations should be stable identifiers.

Display labels may vary by overlay, but filing records should target canonical
destination ids.

## Why This Registry Exists

Without a filing destination registry:

- filing records drift into vague text labels
- archive markers get mixed with destination identity
- validation cannot tell whether a filing target is current, deprecated, or
  disallowed

The registry keeps filing behavior stable and auditable.

## Registry Shape

Suggested object:

`AdministratorFilingDestinationRegistry`

Minimum fields:

- `overlay_context_id`
- `filing_destinations[]`
- `default_labels`
- `deprecated_destination_ids[]`
- `version`

### Filing destination entry

Minimum fields:

- `filing_destination_id`
- `display_label`
- `description`
- `archive_marker_default`
- `allowed_intake_kinds[]`
- `status`

Suggested `status` values:

- `active`
- `deprecated`
- `blocked`

## Archive Marker Rule

Archive behavior should be explicit but separate from destination identity.

This means:

- a filing destination may default to archive behavior
- but filing destination id and archive marker are still separate fields

That keeps “where this was filed” distinct from “whether this was archived.”

## Intake-Kind Rule

Destinations may restrict which intake kinds they accept.

Examples:

- `ops_bug_archive` may allow `bug_report`
- `content_reference` may allow `content_drop`
- `general_archive` may allow many kinds

The registry should make that explicit instead of relying on name matching.

## Deprecation Rule

Deprecated filing destinations should remain:

- readable in older filing records
- hidden from new filing choices

New writes should reject or migrate deprecated destinations explicitly, never
silently.

## Relationship To Other Packets

This registry feeds:

- note/tag/filing surface
- future filing picker projections
- archived/routed visibility policy
- future filing validation

## Minimal Example Shape

```json
{
  "overlay_context_id": "overlay_ohmic",
  "version": 1,
  "filing_destinations": [
    {
      "filing_destination_id": "ops_bug_archive",
      "display_label": "Bug Archive",
      "description": "Retained bug-related intake records and supporting notes.",
      "archive_marker_default": true,
      "allowed_intake_kinds": ["bug_report"],
      "status": "active"
    },
    {
      "filing_destination_id": "content_reference",
      "display_label": "Content Reference",
      "description": "Retained content and publishing reference material.",
      "archive_marker_default": false,
      "allowed_intake_kinds": ["content_drop", "social_review"],
      "status": "active"
    }
  ],
  "default_labels": {
    "ops_bug_archive": "Bug Archive"
  },
  "deprecated_destination_ids": [
    "legacy_misc_archive"
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- canonical filing destination ids
- labels and descriptions
- archive-marker defaults
- allowed intake kinds
- deprecation flags

That is enough to make filing records structured and safe.
