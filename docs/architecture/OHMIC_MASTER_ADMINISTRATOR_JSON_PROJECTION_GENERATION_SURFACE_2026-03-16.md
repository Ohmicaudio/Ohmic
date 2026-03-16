# Ohmic Master Administrator JSON Projection Generation Surface

Date: 2026-03-16
Project: ohmic

## Purpose

Define the reconciled JSON projection layer that feeds the first Master
Administrator shell with stable read models instead of raw provider payloads or
browser-composed state.

## Core Rule

The shell reads projected truth.

It does not compose truth from raw objects in the browser.

## Why Projections Matter

The Master Administrator shell needs desk-friendly views:

- intake queue
- grouped intake bundles
- recent actions
- overlay-driven labels and allowed actions

Those views should be generated once in the backend/runtime layer, then reused
by the browser, tests, and later clients.

## Projection Family

### 1. `administrator_intake_queue.json`

Purpose:

- show current intake items ready for administrator review

Minimum fields per row:

- `intake_id`
- `title`
- `intake_kind`
- `received_at`
- `source_type`
- `status`
- `trust_hint`
- `tag_labels[]`
- `routing_target`
- `warning_state`
- `attachment_count`

### 2. `administrator_aggregation_queue.json`

Purpose:

- show grouped intake packets that should be reviewed as bundles

Minimum fields per row:

- `aggregation_id`
- `summary_label`
- `member_count`
- `recommended_next_action`
- `latest_activity_at`

### 3. `administrator_recent_actions.json`

Purpose:

- show the latest accepted or rejected administrator actions

Minimum fields per row:

- `command_id`
- `action_type`
- `target_intake_id`
- `result_status`
- `resulting_status`
- `timestamp`

### 4. `administrator_overlay_view.json`

Purpose:

- provide project-local labels and allowed actions without hardcoding them into
  browser logic

Minimum fields:

- `overlay_context_id`
- `action_labels`
- `allowed_actions[]`
- `queue_labels`
- `tag_labels`
- `warning_labels`

### 5. `administrator_intake_detail.json`

Purpose:

- provide the selected intake item detail surface

Minimum fields:

- `intake_id`
- `title`
- `summary_text`
- `normalized_body`
- `attachment_bundle_ref`
- `status`
- `routing_history`
- `notes`
- `warnings`

## Input Sources

Projections should be generated from:

- provider-agnostic intake envelopes
- native-format staging records
- administrator intake objects
- aggregation bundle objects
- recent command writeback records
- overlay policy data

The shell should not read raw payload blobs directly.

## Refresh Rule

Projection refresh should happen after:

- new intake capture
- normalization completion
- aggregation changes
- accepted or rejected administrator commands
- overlay changes that affect labels or allowed actions

The shell can then refresh or poll one reconciled layer instead of many
individual object families.

## Reconciliation Rule

Projection generation should prefer:

1. latest reconciled writeback state
2. latest intake object truth
3. latest overlay rule set

This prevents the browser from showing stale or optimistic values after command
submission.

## Warning And Review Surface

Queue projections should include at least:

- `warning_state`
- `parse_confidence`
- `manual_review_required`

That lets the administrator shell elevate weakly normalized intake without
opening raw payloads by default.

## Minimal Example Shapes

### Intake queue row

```json
{
  "intake_id": "intake_20260316_001",
  "title": "Live handset smoke failed after reconnect",
  "intake_kind": "bug_report",
  "received_at": "2026-03-16T04:25:00Z",
  "source_type": "manual",
  "status": "queued",
  "trust_hint": "operator_submitted",
  "tag_labels": ["bug", "phone", "live-link"],
  "routing_target": "orchestrator_bug_triage",
  "warning_state": "none",
  "attachment_count": 2
}
```

### Recent action row

```json
{
  "command_id": "cmd_20260316_001",
  "action_type": "route_to_orchestrator",
  "target_intake_id": "intake_20260316_001",
  "result_status": "applied",
  "resulting_status": "routed",
  "timestamp": "2026-03-16T04:27:10Z"
}
```

## Generation Boundary

The first projection generator can live as a JSON-building runtime layer rather
than a final database-backed API.

That means it can initially:

- read current JSON runtime state
- merge intake and command data
- emit desk-friendly projection files

Later, the exact same projection shapes can be served by backend endpoints.

## First Safe Implementation

The first implementation only needs:

- one generator pass for intake queue
- one generator pass for recent actions
- one overlay projection
- one detail projection for selected intake reads

That is enough for a useful first admin shell and keeps the read model small
enough to verify honestly.
