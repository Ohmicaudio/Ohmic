# Ohmic Agent Inbox Outbox Event Model

Date: 2026-03-15
Status: working contract

## Purpose

Define the append-only event model for `agent_inbox.jsonl` and
`agent_outbox.jsonl` in the live JSON loop.

The goal is to preserve intent, reduce duplicate handling, and make crash
recovery simpler than a single mutable input field.

## Why Append-Only

Prefer append-only logs because they:

- preserve the original user instruction
- allow replay after crash or restart
- support dedupe by event id
- support multiple agents and wrappers more safely
- avoid losing the only copy of user intent when a field is overwritten

## File Roles

### `agent_inbox.jsonl`

Use for:

- user instructions
- wrapper-generated commands
- control events that should be processed by the agent loop

### `agent_outbox.jsonl`

Use for:

- agent responses
- status updates
- completion records
- blocked or needs-input notifications

## Event Shape

Minimum event object:

```json
{
  "event_id": "evt_20260315_0001",
  "created_at": "2026-03-15T19:20:00Z",
  "actor": "user",
  "event_type": "instruction",
  "payload": {},
  "handled": false
}
```

## Required Fields

- `event_id`
- `created_at`
- `actor`
- `event_type`
- `payload`
- `handled`

## Recommended Fields

- `project`
- `session_id`
- `handled_at`
- `handled_by`
- `result_event_id`
- `supersedes_event_id`
- `dedupe_key`
- `priority`

## Field Definitions

### `event_id`

Unique stable id for the event.

Rule:

- never reuse it

### `created_at`

UTC timestamp for ordering and replay.

### `actor`

Who produced the event.

Recommended values:

- `user`
- `ui`
- `runner`
- `agent`
- `system`

### `event_type`

What kind of event this is.

Recommended inbox types:

- `instruction`
- `continue`
- `pause`
- `resume`
- `replan`
- `audit_request`

Recommended outbox types:

- `status`
- `result`
- `blocked`
- `needs_input`
- `completion`
- `audit_report`

### `payload`

Event-specific content.

Examples:

- user text
- route/task request
- response summary
- result packet

### `handled`

Whether the event has already been consumed by the loop.

Rule:

- inbox events start `false`
- once processed, mark `true`

### `handled_at`

UTC timestamp of handling.

### `handled_by`

Agent or runner id that processed the event.

### `result_event_id`

Optional pointer to the outbox event that answered an inbox event.

### `dedupe_key`

Optional stable key for collapsing repeated identical control events.

## Inbox Event Example

```json
{
  "event_id": "evt_20260315_0001",
  "created_at": "2026-03-15T19:20:00Z",
  "project": "ohmic",
  "session_id": "loop_20260315_01",
  "actor": "user",
  "event_type": "instruction",
  "payload": {
    "text": "continue with highest priority"
  },
  "handled": false,
  "priority": "normal"
}
```

## Handled Inbox Example

```json
{
  "event_id": "evt_20260315_0001",
  "created_at": "2026-03-15T19:20:00Z",
  "project": "ohmic",
  "session_id": "loop_20260315_01",
  "actor": "user",
  "event_type": "instruction",
  "payload": {
    "text": "continue with highest priority"
  },
  "handled": true,
  "handled_at": "2026-03-15T19:20:06Z",
  "handled_by": "codex",
  "result_event_id": "evt_20260315_0102",
  "priority": "normal"
}
```

## Outbox Event Example

```json
{
  "event_id": "evt_20260315_0102",
  "created_at": "2026-03-15T19:20:06Z",
  "project": "ohmic",
  "session_id": "loop_20260315_01",
  "actor": "agent",
  "event_type": "status",
  "payload": {
    "status": "working",
    "message": "Claiming next inbox/outbox contract slice.",
    "recommended_next": [
      "define-orchestrator-lock-and-worker-heartbeat-model"
    ]
  },
  "handled": false
}
```

## Pending Vs Processed Rule

### Pending

An inbox event is pending when:

- `handled` is `false`

### Processed

An inbox event is processed when:

- `handled` is `true`
- `handled_at` is set
- `handled_by` is set

The loop should not silently drop an event without marking it handled.

## Replay And Dedupe Rule

Replay safety depends on:

- stable `event_id`
- append-only file history
- explicit `handled` markers
- optional `dedupe_key` for identical repeated controls

Rule:

- if an event has already been handled, do not process it again unless a
  replay tool intentionally requests it

## Mutable Summary Vs Append-Only Truth

The current `input` section in `agent_state.json` should be treated as a
summary of the current inbox head.

It is not the full inbox truth.

So:

- `agent_state.json` = current summary
- `agent_inbox.jsonl` = full input history
- `agent_outbox.jsonl` = full response history

## Crash Recovery Rule

After a crash or restart:

1. read inbox events newest to oldest or oldest to newest according to runner
   policy
2. select events with `handled: false`
3. resume from the oldest unhandled actionable event
4. write a new outbox event instead of mutating old results

## Guardrails

- do not overwrite old inbox events
- do not treat outbox as authoritative queue truth
- do not let one mutable dashboard field become the only input history
- do not rely on event order without timestamps and ids

## Follow-On Dependencies

This event model should feed:

- `define-orchestrator-lock-and-worker-heartbeat-model`
- `define-stable-idle-stop-and-crash-recovery-rules`
- `define-runner-wrapper-cycle-for-json-agent-loop`
- `define-json-dashboard-input-writeback-flow`
