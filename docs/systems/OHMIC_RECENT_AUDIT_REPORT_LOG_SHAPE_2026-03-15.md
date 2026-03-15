# Ohmic Recent Audit Report Log Shape

Date: 2026-03-15
Status: working contract

## Purpose

Define the append-only shape for short worker audit reports so performers can
feed structured suggestions back to the orchestrator without hiding them in
chat.

This log is not meant to replace richer discussion.

It is meant to capture the minimum machine-readable audit summary after a run of
task completions.

## Storage Surface

Recommended file:

- `recent_audits.jsonl`

Recommended format:

- one JSON object per line
- append-only
- newest entries at the end

## Core Principle

The audit log should answer:

- what just got finished
- what newly surfaced
- what now looks stale or mis-prioritized
- what blockers remain

It should stay short enough that it can be emitted every few completions
without becoming another heavy report.

## Required Top-Level Fields

- `audit_id`
- `created_at`
- `actor`
- `project`
- `completed_tasks`
- `newly_exposed_tasks`
- `stale_priorities`
- `blockers`
- `suggested_queue_changes`

## Recommended Additional Fields

- `scope`
- `notes`

## Field Definitions

### `audit_id`

Purpose:

- stable identifier for the audit entry

Example:

- `audit_20260315_1409_dashboard_lane`

### `created_at`

Purpose:

- UTC timestamp for when the audit entry was appended

### `actor`

Purpose:

- identify which performer or orchestrator wrote the audit

Example:

```json
{
  "id": "d",
  "role": "performer"
}
```

### `project`

Purpose:

- identify the project namespace the audit applies to

Example:

- `ohmic`

### `scope`

Purpose:

- lightweight description of the lane or packet family just audited

Example values:

- `dashboard-contracts`
- `storage-cleanup`
- `backend-auth`

### `completed_tasks`

Purpose:

- list the tasks just completed in the audited window

Item fields:

- `task_id`
- `title`
- `commit` (recommended)

### `newly_exposed_tasks`

Purpose:

- list follow-on tasks or newly visible tasks exposed by the completed work

Item fields:

- `task_id`
- `title`
- `reason`

### `stale_priorities`

Purpose:

- note tasks or lanes whose priority now looks wrong

Item fields:

- `task_id`
- `current_priority`
- `suggested_priority`
- `reason`

### `blockers`

Purpose:

- capture the blockers still preventing clean continuation

Item fields:

- `kind`
- `summary`
- `blocking_task_id` (recommended)

Example blocker kinds:

- `active_claim_overlap`
- `stale_summary`
- `missing_contract`
- `external_dependency`

### `suggested_queue_changes`

Purpose:

- tell the orchestrator what to do with the queue after the audit

Item fields:

- `action`
- `target`
- `reason`

Example actions:

- `raise_priority`
- `split_task`
- `close_stale_ready`
- `create_follow_on`
- `release_stale_claim`

### `notes`

Purpose:

- one short human-readable summary line

Keep this short.

## Full Example

```json
{
  "audit_id": "audit_20260315_1409_dashboard_lane",
  "created_at": "2026-03-15T14:09:00Z",
  "actor": {
    "id": "d",
    "role": "performer"
  },
  "project": "ohmic",
  "scope": "dashboard-contracts",
  "completed_tasks": [
    {
      "task_id": "2026-03-15-define-dashboard-status-card-mapping",
      "title": "Define Dashboard Status Card Mapping",
      "commit": "d51d066"
    },
    {
      "task_id": "2026-03-15-define-dashboard-stale-state-indicator-behavior",
      "title": "Define Dashboard Stale State Indicator Behavior",
      "commit": "195aa01"
    }
  ],
  "newly_exposed_tasks": [
    {
      "task_id": "2026-03-15-define-dashboard-empty-and-no-work-state",
      "title": "Define Dashboard Empty And No-Work State",
      "reason": "stale-vs-idle distinction is now explicit"
    }
  ],
  "stale_priorities": [],
  "blockers": [
    {
      "kind": "active_claim_overlap",
      "summary": "command acknowledgement files are already being worked in another claim",
      "blocking_task_id": "2026-03-15-define-dashboard-command-acknowledgement-state"
    }
  ],
  "suggested_queue_changes": [
    {
      "action": "keep_lane_warm",
      "target": "dashboard-empty-and-no-work-state",
      "reason": "same dashboard trust family and no file overlap"
    }
  ],
  "notes": "Dashboard trust lane is moving cleanly; avoid the active command-box packet."
}
```

## Size Rule

Keep each audit entry small enough that it can be read quickly.

Recommended limits:

- `completed_tasks`: short list only
- `newly_exposed_tasks`: short list only
- `notes`: one short paragraph at most

Do not paste full task bodies or long prose reports into the log.

## Consumer Rule

The orchestrator should treat the audit log as advisory structure.

It may:

- surface the latest entry in the dashboard
- use `suggested_queue_changes` as hints
- use `blockers` to avoid colliding with known issues

It should not:

- blindly execute every suggested queue change
- treat audit notes as stronger than repo-backed queue truth

## Guardrails

- keep the file append-only
- do not overwrite earlier audit entries
- do not store full chat transcripts here
- do not let this log replace the real queue, claim, or doc surfaces

## Follow-On Dependencies

This audit log shape should feed:

- `define-dashboard-output-priority-visibility-rule`
- `define-dashboard-command-history-visibility-rule`
- future orchestrator review surfaces
