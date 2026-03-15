# Ohmic JSON Agent Loop Model

Date: 2026-03-15
Status: working design

## Purpose

Define a reusable JSON-driven control loop for the Ohmic agent system so a UI
or wrapper process can drive long-running orchestration and execution without
depending on chat formatting.

This is not a replacement for Markdown authority.
It is the live transport and control model layered on top of the file-backed
system.

## Core Principle

Keep durable truth in Markdown and git-tracked files.
Use JSON as the live mailbox, state packet, and renderer-facing surface.

So the split is:

- Markdown: authority, memory, queue, durable docs
- JSON: live session state, inbox, outbox, loop control, rendered status

## Loop Ownership

The external runner or UI owns the wake/sleep cycle.

The model assumes:

1. the wrapper reads the latest JSON state
2. the wrapper invokes the agent
3. the agent reads the designated input/event fields
4. the agent performs work
5. the agent writes structured JSON output back
6. the wrapper renders that JSON and decides whether to invoke again

The agent does not self-wake forever without that wrapper.

## Required Live Surfaces

Minimum recommended files:

- `agent_state.json`
- `agent_inbox.jsonl`
- `agent_outbox.jsonl`
- `agent_locks.json`
- `agent_runtime.json`

Optional supporting files:

- `ready_tasks.json`
- `active_claims.json`
- `recent_audits.jsonl`

## Concrete Contract

The first concrete `agent_state.json` packet contract lives in:

- `docs/systems/OHMIC_LIVE_AGENT_STATE_JSON_CONTRACT_2026-03-15.md`

## Minimum State Shape

```json
{
  "session": {
    "project": "ohmic",
    "mode": "orchestrate",
    "active_repo": "B:\\ohmic",
    "updated_at": "2026-03-15T12:34:56Z"
  },
  "input": {
    "pending": true,
    "message_id": "msg_104",
    "text": "continue with highest priority"
  },
  "state": {
    "summary": "Queue healthy. App slices still lead.",
    "ready_count": 10,
    "active_claim_count": 2,
    "board_health": "healthy"
  },
  "response": {
    "status": "working",
    "message": "Claiming next verification lane.",
    "recommended_next": [
      "verify-first-osm-slice-in-correct-node-shell"
    ]
  }
}
```

## Event Model

Use append-only events for user input and machine output when possible.

Why:

- easier crash recovery
- easier dedupe
- easier multi-agent coordination
- avoids overwriting the only copy of user intent

Recommended fields:

- event id
- created timestamp
- actor
- event type
- payload
- handled status
- handled by
- handled at

## Multi-Agent Model

The live loop should support:

- one active orchestrator lease
- multiple performer leases
- per-task claims
- heartbeat timestamps
- stale lease timeouts

The loop should not assume all agents are doing the same job.

## Stop Condition

Do not stop just because the queue is empty for one moment.

Use stable idle instead:

- no pending user input
- no expired claims
- no stale generated state
- no mandatory unclaimed task
- no queue-floor replenishment debt
- no pending worker-audit duty

Then use an idle counter or backoff window before sleeping or exiting.

## Crash Recovery

Crash recovery should rely on:

- append-only inbox/outbox logs
- lease timestamps
- resumable state packet
- deterministic queue and claim files still living in the repo

The JSON loop should be disposable.
The repo-backed system should still be reconstructable.

## Reuse Goal

This model should be portable to the next project with only:

- new repo roots
- new project overlays
- new queue/task namespaces

The control pattern should stay the same.
