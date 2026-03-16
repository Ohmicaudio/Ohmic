# Ohmic Master Administrator Intake Reopen Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define the explicit policy for reopening archived or routed intake items back
into active administrator flow.

## Core Rule

Reopen should require deliberate operator intent or an explicit policy-driven
follow-up trigger.

Archived and routed items should not drift back into the active queue by side
effect.

## Reopen Triggers

Suggested first reopen triggers:

- operator selected reopen explicitly
- downstream route failed and returned control
- new evidence or response materially changed the case
- approval or hold resolution requires active desk review again

## Restoration Target

The default restoration target should be:

- `queued`

Overlays may direct some reopen flows into a special review lane later, but the
first safe model should keep reopen simple.

## Restrictions

Reopen should be blocked when:

- the item is already active
- policy marks the item as terminally closed
- required evidence or provenance is missing for safe re-entry

## Audit Rule

Each reopen should record:

- `reopened_by`
- `reopened_at`
- `previous_status`
- `restored_status`
- `reopen_reason`

## Minimal Example

```json
{
  "intake_id": "intake_20260316_029",
  "previous_status": "archived",
  "restored_status": "queued",
  "reopened_by": "operator:d",
  "reopened_at": "2026-03-16T11:55:00Z",
  "reopen_reason": "new_customer_response"
}
```

## First Safe Implementation

The first implementation only needs:

- explicit reopen triggers
- one default restored state
- reopen-blocking rules
- reopen audit event fields

That is enough to keep inactive items from silently re-entering active flow.
