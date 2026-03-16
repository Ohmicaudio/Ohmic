# Ohmic Master Administrator Normalization Warning Review Lane

Date: 2026-03-16
Project: ohmic

## Purpose

Define the bounded review lane for intake items that normalized with warnings,
low confidence, or manual-review requirements instead of cleanly.

## Core Rule

Weakly normalized intake should not disappear into the normal queue as if it
were fully trustworthy.

It should surface in a distinct review lane with clear warning reasons and the
smallest necessary operator actions.

## Why This Lane Exists

Without a warning-review lane:

- low-confidence intake is easy to miss
- desk operators cannot tell whether a weak item is safe to route
- reprocessing and manual review requests become ad hoc

This lane turns weak normalization into an explicit operational surface instead
of a buried implementation detail.

## Entry Conditions

An intake item should enter this lane when:

- `parse_confidence` is `low`
- `parse_confidence` is `manual_required`
- current status is `normalized_with_warnings`
- current status is `manual_review_required`
- attachment bundle warning state is `partial` or worse

## Review Row Fields

Minimum fields:

- `intake_id`
- `title`
- `warning_state`
- `parse_confidence`
- `warning_reasons[]`
- `source_type`
- `received_at`
- `attachment_warning_count`
- `recommended_next_action`

## Operator Actions

First safe actions:

- open detail
- add note
- tag item
- send to reprocess
- mark as safe to queue
- hold

This lane should stay bounded. It does not need the full final admin surface.

## Warning Reason Family

Suggested first warning reasons:

- `body_parse_partial`
- `attachment_parse_failed`
- `html_only_content`
- `unsupported_attachment_preview`
- `schema_drift_detected`
- `low_confidence_text_extraction`

These can become a formal reason catalog later.

## Exit Conditions

An item should leave the warning-review lane when:

- it is reprocessed successfully and returns to `queued`
- an operator explicitly marks it safe
- it is held
- it is archived

The lane should not silently retain resolved items.

## Relationship To Other Packets

This lane depends on:

- intake status lifecycle
- attachment bundle and asset family
- raw payload storage and reprocessing boundary
- JSON projection generation surface

It should also feed:

- manual review queue projection
- future warning badge taxonomy
- reprocess request workflow

## Minimal Example Shape

```json
{
  "warning_review_item": {
    "intake_id": "intake_20260316_001",
    "title": "Drive log import missing graph preview",
    "warning_state": "partial",
    "parse_confidence": "low",
    "warning_reasons": [
      "attachment_parse_failed",
      "unsupported_attachment_preview"
    ],
    "source_type": "filesystem",
    "received_at": "2026-03-16T05:55:00Z",
    "attachment_warning_count": 1,
    "recommended_next_action": "send_to_reprocess"
  }
}
```

## First Safe Implementation

The first implementation only needs:

- warning review queue rows
- entry and exit rules
- warning reasons
- one reprocess action hook

That is enough to keep weakly normalized intake visible and actionable.
