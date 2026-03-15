# Ohmic Agent Runtime JSON Contract

Date: 2026-03-15
Status: working contract

## Purpose

Define the minimal `agent_runtime.json` contract for loop bookkeeping that does
not belong in `agent_state.json`.

This file is for operational runtime state, not user-facing summary.

## Why Separate It

Keep `agent_state.json` cleaner for:

- dashboard rendering
- current summary
- current response

Use `agent_runtime.json` for:

- loop bookkeeping
- wake/sleep counters
- last cycle metadata
- runner health notes

## Top-Level Shape

```json
{
  "session_id": "loop_20260315_01",
  "updated_at": "2026-03-15T19:55:00Z",
  "loop": {},
  "idle": {},
  "health": {}
}
```

## Required Fields

- `session_id`
- `updated_at`
- `loop`
- `idle`
- `health`

## `loop`

Purpose:

- current loop bookkeeping

Required fields:

- `last_cycle_started_at`
- `last_cycle_finished_at`
- `last_mode`

Recommended fields:

- `cycle_count`
- `last_action`
- `last_invoke_reason`
- `last_result`

Example:

```json
{
  "last_cycle_started_at": "2026-03-15T19:54:00Z",
  "last_cycle_finished_at": "2026-03-15T19:54:05Z",
  "last_mode": "mixed",
  "cycle_count": 42,
  "last_action": "define-runner-wrapper-cycle-for-json-agent-loop",
  "last_invoke_reason": "queue healthy and current task available",
  "last_result": "completed"
}
```

## `idle`

Purpose:

- idle detection and backoff bookkeeping

Required fields:

- `idle_counter`
- `idle_state`

Recommended fields:

- `last_sleep_seconds`
- `next_wake_at`
- `stable_idle_confirmed_at`
- `last_idle_reason`

Example:

```json
{
  "idle_counter": 0,
  "idle_state": "active",
  "last_sleep_seconds": 0,
  "last_idle_reason": "queue not empty"
}
```

Allowed `idle_state` values:

- `active`
- `candidate_idle`
- `stable_idle`
- `sleeping`

## `health`

Purpose:

- record operational issues seen by the wrapper

Required fields:

- `last_error`

Recommended fields:

- `stale_leases_detected`
- `stale_state_detected`
- `queue_floor_met`
- `last_recovery_action`

Example:

```json
{
  "last_error": null,
  "stale_leases_detected": false,
  "stale_state_detected": false,
  "queue_floor_met": true,
  "last_recovery_action": "none"
}
```

## Full Example

```json
{
  "session_id": "loop_20260315_01",
  "updated_at": "2026-03-15T19:55:00Z",
  "loop": {
    "last_cycle_started_at": "2026-03-15T19:54:00Z",
    "last_cycle_finished_at": "2026-03-15T19:54:05Z",
    "last_mode": "mixed",
    "cycle_count": 42,
    "last_action": "define-runner-wrapper-cycle-for-json-agent-loop",
    "last_invoke_reason": "current JSON-loop task available",
    "last_result": "completed"
  },
  "idle": {
    "idle_counter": 0,
    "idle_state": "active",
    "last_sleep_seconds": 0,
    "last_idle_reason": "queue still active"
  },
  "health": {
    "last_error": null,
    "stale_leases_detected": false,
    "stale_state_detected": false,
    "queue_floor_met": true,
    "last_recovery_action": "none"
  }
}
```

## What Does Not Belong Here

Do not store full durable truth here:

- queue contents
- memory truth
- full task history
- full inbox/outbox history
- claim file bodies

Those stay in their own authoritative surfaces.

## Relationship To Other Files

- `agent_state.json`
  - current summary and response
- `agent_inbox.jsonl`
  - append-only input truth
- `agent_outbox.jsonl`
  - append-only response truth
- `agent_locks.json`
  - live orchestrator/worker leases
- `agent_runtime.json`
  - wrapper bookkeeping only

## Guardrails

- do not treat runtime bookkeeping as project truth
- do not overwrite append-only event history with runtime summaries
- do not let runtime convenience replace queue and claim inspection

## Follow-On Dependencies

This runtime contract should feed:

- `define-json-dashboard-render-surface`
- `define-json-dashboard-input-writeback-flow`
- `define-runner-error-and-exit-status-model`
- `define-state-reconciliation-pass-between-repo-truth-and-json-summary`
