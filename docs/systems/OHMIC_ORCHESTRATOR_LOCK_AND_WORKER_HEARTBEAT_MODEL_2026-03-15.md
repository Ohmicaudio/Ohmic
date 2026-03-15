# Ohmic Orchestrator Lock And Worker Heartbeat Model

Date: 2026-03-15
Status: working contract

## Purpose

Define the minimum lock and heartbeat model for multi-agent JSON-loop runs.

This model exists to coordinate live loop roles.

It does not replace:

- repo-backed task claims
- queue truth
- Markdown authority

## Core Rule

There should be:

- at most one active orchestrator lease
- zero or more active worker leases

The orchestrator lease controls board-shaping authority.

Worker leases show that execution is alive and help stale-session recovery.

## File

Recommended live file:

- `agent_locks.json`

## Top-Level Shape

```json
{
  "updated_at": "2026-03-15T19:30:00Z",
  "orchestrator": {},
  "workers": []
}
```

## Orchestrator Lease

Minimum fields:

- `agent_id`
- `session_id`
- `started_at`
- `heartbeat_at`
- `expires_at`
- `mode`

Recommended fields:

- `project`
- `active_repo`
- `current_focus`
- `last_audit_at`

Example:

```json
{
  "agent_id": "codex",
  "session_id": "loop_20260315_01",
  "project": "ohmic",
  "active_repo": "B:\\ohmic",
  "started_at": "2026-03-15T19:30:00Z",
  "heartbeat_at": "2026-03-15T19:34:00Z",
  "expires_at": "2026-03-15T19:39:00Z",
  "mode": "orchestrate",
  "current_focus": "queue replenishment and handoff truth"
}
```

## Worker Lease

Minimum fields:

- `agent_id`
- `session_id`
- `task_id`
- `started_at`
- `heartbeat_at`
- `expires_at`

Recommended fields:

- `project`
- `active_repo`
- `claim_id`
- `mode`

Example:

```json
{
  "agent_id": "codex",
  "session_id": "loop_20260315_02",
  "project": "ohmic",
  "active_repo": "B:\\ohmic\\repos\\ohmic-audio-labs",
  "task_id": "commit-osm-topbar-shell-token-and-label-slice",
  "claim_id": "20260315T131907Z-213f72c9",
  "started_at": "2026-03-15T19:35:00Z",
  "heartbeat_at": "2026-03-15T19:38:00Z",
  "expires_at": "2026-03-15T19:43:00Z",
  "mode": "perform"
}
```

## Lease Durations

Recommended starting values:

- orchestrator lease: `5 minutes`
- worker lease: `5 minutes`
- heartbeat refresh target: every `1-2 minutes`

Rule:

- renew before expiry
- do not keep dead leases alive indefinitely

## When An Agent Becomes Orchestrator

An agent may take the orchestrator lease when:

- no valid orchestrator lease exists
- the visible board is stale or thin
- no other agent is clearly maintaining orchestration truth

Do not take it when:

- another valid orchestrator lease is healthy
- the board is current and queue health is fine

## Takeover Rule

An orchestrator lease may be taken over when:

- `expires_at` is in the past
- and `heartbeat_at` is stale
- and no recent board/queue truth update suggests the orchestrator is still
  alive

Recommended safe takeover pattern:

1. re-read the queue and active claims
2. confirm the old lease is stale
3. write the new orchestrator lease
4. record the takeover in outbox or runtime notes

## Worker Heartbeat Rule

Workers should refresh their lease while a task is genuinely active.

If a worker lease expires:

- do not assume the work is invalid
- do assume the lock may be stale
- rely on repo-backed task claims and visible task state before taking over

## Compatibility With Shared Claims

This lock file is not the same as the claim system.

Use both:

- `agent_locks.json` for live loop role coordination
- claim files for concrete file/path edit protection

Rule:

- never let the live lock file replace file-scoped claims

## Minimal `agent_locks.json` Example

```json
{
  "updated_at": "2026-03-15T19:40:00Z",
  "orchestrator": {
    "agent_id": "codex",
    "session_id": "loop_20260315_01",
    "project": "ohmic",
    "active_repo": "B:\\ohmic",
    "started_at": "2026-03-15T19:30:00Z",
    "heartbeat_at": "2026-03-15T19:39:00Z",
    "expires_at": "2026-03-15T19:44:00Z",
    "mode": "mixed",
    "current_focus": "JSON-loop contract lane"
  },
  "workers": [
    {
      "agent_id": "codex",
      "session_id": "loop_20260315_02",
      "project": "ohmic",
      "active_repo": "B:\\ohmic\\repos\\ohmic-audio-labs",
      "task_id": "commit-osm-topbar-shell-token-and-label-slice",
      "claim_id": "20260315T131907Z-213f72c9",
      "started_at": "2026-03-15T19:35:00Z",
      "heartbeat_at": "2026-03-15T19:39:00Z",
      "expires_at": "2026-03-15T19:44:00Z",
      "mode": "perform"
    }
  ]
}
```

## Guardrails

- do not allow multiple healthy orchestrator leases at once
- do not use heartbeats as proof that a task claim is safe to ignore
- do not let expired worker leases automatically delete task truth
- do not treat lock freshness as a substitute for queue inspection

## Follow-On Dependencies

This model should feed:

- `define-stable-idle-stop-and-crash-recovery-rules`
- `define-runner-wrapper-cycle-for-json-agent-loop`
- `define-agent-runtime-json-contract`
