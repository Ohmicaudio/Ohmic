# Ohmic Master Administrator Filing Picker Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the JSON projection that feeds filing destination choices in the first
administrator shell.

## Core Rule

The filing picker should render from reconciled filing-destination rows, not by
rebuilding registry logic in the browser.

## Projection Shape

Suggested object:

`AdministratorFilingPickerProjection`

Top-level fields:

- `intake_id`
- `overlay_context_id`
- `default_destination_ids[]`
- `advanced_destination_ids[]`
- `destinations[]`

### Destination row

Minimum fields:

- `filing_destination_id`
- `display_label`
- `description`
- `archive_marker_default`
- `allowed_for_current_intake`
- `status`
- `selectable`
- `disabled_reason`
- `is_default`

## Filtering Rule

The projection should hide:

- blocked filing destinations
- deprecated destinations from normal picker views

It may keep disabled rows visible when the desk benefits from seeing why a
destination is unavailable.

## Selection Metadata

Rows should tell the desk:

- whether selecting the destination implies archival by default
- whether the current intake kind is allowed
- whether operator override or advanced flow is required

## Minimal Example

```json
{
  "intake_id": "intake_20260316_029",
  "overlay_context_id": "overlay_ohmic",
  "default_destination_ids": [
    "ops_bug_archive"
  ],
  "advanced_destination_ids": [
    "content_reference"
  ],
  "destinations": [
    {
      "filing_destination_id": "ops_bug_archive",
      "display_label": "Bug Archive",
      "description": "Retained bug-related intake records and notes.",
      "archive_marker_default": true,
      "allowed_for_current_intake": true,
      "status": "active",
      "selectable": true,
      "disabled_reason": null,
      "is_default": true
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- projected filing rows
- archive default visibility
- intake-kind filtering results
- selectable/disabled state

That is enough for a stable filing picker.
