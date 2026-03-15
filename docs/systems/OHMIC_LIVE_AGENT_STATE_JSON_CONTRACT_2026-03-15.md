# Ohmic Live Agent State JSON Contract

Date: 2026-03-15
Status: working contract

## Purpose

Define the first concrete `agent_state.json` contract for a UI-driven agent
loop.

This contract is for live state transport and rendering.

It is not a replacement for:

- Markdown authority
- repo-backed queue truth
- claims, memory, or roadmap docs

## Authority Split

### Markdown remains authoritative for:

- queue truth
- memory truth
- durable handoffs
- system rules
- project and repo docs

### JSON is authoritative only for live session state:

- current loop mode
- current agent summary
- queue health snapshot
- current response payload
- live rendering state for a dashboard or wrapper

## Required Top-Level Keys

```json
{
  "session": {},
  "input": {},
  "state": {},
  "response": {}
}
```

## Contract

### `session`

Purpose:

- identify the current loop and working context

Required fields:

- `project`
- `mode`
- `active_repo`
- `updated_at`

Recommended fields:

- `session_id`
- `orchestrator_active`
- `agent_id`
- `task_id`
- `task_status`
- `compact_count`

Field notes:

- `mode` should be one of:
  - `orchestrate`
  - `perform`
  - `mixed`
  - `idle`
- `compact_count` helps trigger forced re-entry checks

### `input`

Purpose:

- expose the current pending user instruction or current inbox head

Required fields:

- `pending`
- `message_id`
- `text`

Recommended fields:

- `source`
- `received_at`
- `handled`
- `handled_at`
- `handled_by`

Field notes:

- this is a convenience summary of the current actionable input
- append-only inbox truth should still live in `agent_inbox.jsonl`

### `state`

Purpose:

- summarize current live system status for humans and wrappers

Required fields:

- `summary`
- `ready_count`
- `active_claim_count`
- `board_health`

Recommended fields:

- `ready_tasks`
- `active_claims`
- `top_priority`
- `stale_state_detected`
- `queue_floor_met`
- `recent_completions`
- `risks`

Field notes:

- `board_health` should be a simple status such as:
  - `healthy`
  - `thin`
  - `stale`
  - `blocked`
- `summary` should be short enough to render in a dashboard card

### `response`

Purpose:

- hold the current agent-facing or UI-facing status message

Required fields:

- `status`
- `message`
- `recommended_next`

Recommended fields:

- `current_action`
- `completed`
- `blocked`
- `notes`
- `updated_files`

Field notes:

- `status` should be one of:
  - `idle`
  - `working`
  - `done`
  - `blocked`
  - `needs_input`
- `recommended_next` should be a flat list of task ids or short actions

## Minimal Example

```json
{
  "session": {
    "project": "ohmic",
    "mode": "mixed",
    "active_repo": "B:\\ohmic",
    "updated_at": "2026-03-15T19:15:00Z"
  },
  "input": {
    "pending": true,
    "message_id": "msg_104",
    "text": "continue with highest priority"
  },
  "state": {
    "summary": "Queue healthy. OSM and JSON-loop lanes are open.",
    "ready_count": 10,
    "active_claim_count": 1,
    "board_health": "healthy"
  },
  "response": {
    "status": "working",
    "message": "Claiming next live state contract slice.",
    "recommended_next": [
      "define-agent-inbox-outbox-event-model",
      "define-orchestrator-lock-and-worker-heartbeat-model"
    ]
  }
}
```

## Extended Example

```json
{
  "session": {
    "session_id": "loop_20260315_01",
    "project": "ohmic",
    "mode": "orchestrate",
    "active_repo": "B:\\ohmic",
    "agent_id": "codex",
    "task_id": "define-live-agent-state-json-contract",
    "task_status": "working",
    "orchestrator_active": true,
    "compact_count": 1,
    "updated_at": "2026-03-15T19:15:00Z"
  },
  "input": {
    "pending": true,
    "message_id": "msg_104",
    "text": "continue with highest priority",
    "source": "ui",
    "received_at": "2026-03-15T19:12:21Z",
    "handled": false
  },
  "state": {
    "summary": "Queue full. Current work is on reusable JSON-loop contracts.",
    "ready_count": 10,
    "active_claim_count": 1,
    "board_health": "healthy",
    "top_priority": [
      "define-live-agent-state-json-contract",
      "define-agent-inbox-outbox-event-model"
    ],
    "queue_floor_met": true,
    "stale_state_detected": false,
    "recent_completions": [
      "define-user-requested-document-retention-rules"
    ],
    "risks": [
      "underfoot queue changes can stale handoff boards quickly"
    ]
  },
  "response": {
    "status": "working",
    "message": "Writing the first concrete agent_state.json contract.",
    "current_action": "documenting required keys and examples",
    "recommended_next": [
      "define-agent-inbox-outbox-event-model",
      "define-json-dashboard-render-surface"
    ],
    "completed": [],
    "blocked": [],
    "notes": [
      "Markdown remains authoritative for durable truth"
    ],
    "updated_files": [
      "docs/systems/OHMIC_LIVE_AGENT_STATE_JSON_CONTRACT_2026-03-15.md"
    ]
  }
}
```

## Guardrails

- keep this file small enough to render quickly
- do not duplicate full queue truth here
- do not treat it as the only copy of user intent
- do not let dashboard convenience overwrite repo-backed authority

## Follow-On Dependencies

This contract should feed:

- `define-agent-inbox-outbox-event-model`
- `define-orchestrator-lock-and-worker-heartbeat-model`
- `define-stable-idle-stop-and-crash-recovery-rules`
- `define-json-dashboard-render-surface`
- `define-json-dashboard-input-writeback-flow`
