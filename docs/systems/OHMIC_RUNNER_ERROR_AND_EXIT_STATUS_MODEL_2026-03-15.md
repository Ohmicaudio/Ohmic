# Ohmic Runner Error And Exit Status Model

Date: 2026-03-15
Status: working contract

## Purpose

Define how the future wrapper should classify recoverable errors, fatal errors,
and exit statuses for one-shot and long-running loop modes.

This is runtime control status, not business/task result status.

## Core Split

The wrapper should distinguish:

- normal loop state
- recoverable error state
- fatal error state
- normal sleep/stop exit state

## Error Classes

### Recoverable

Recoverable errors are problems where the wrapper may retry, back off, or keep
the loop alive.

Examples:

- temporary file read race
- stale lease conflict that can be rechecked
- transient parse/read failure on a generated JSON snapshot
- queue changed underfoot during a cycle

Recommended wrapper action:

- log error
- write outbox status if useful
- back off
- retry or re-evaluate

### Fatal

Fatal errors are problems where continuing the loop is not safe or meaningful.

Examples:

- required working paths missing
- cannot read or write the core loop files
- repeated unrecoverable config mismatch
- explicit fatal shutdown from wrapper policy

Recommended wrapper action:

- write fatal status if possible
- stop

## Suggested Runtime Status Values

Use a simple runtime status field such as:

- `working`
- `backoff`
- `sleeping`
- `stopped`
- `recoverable_error`
- `fatal_error`

Keep these separate from agent response status values like:

- `working`
- `done`
- `blocked`
- `needs_input`

## Suggested Exit Status Categories

Use semantic categories first, with numeric codes optional later.

Recommended categories:

- `exit_success_one_shot`
- `exit_success_sleeping`
- `exit_recoverable_error`
- `exit_fatal_error`
- `exit_stop_requested`

## One-Shot Vs Long-Running

### One-shot mode

Wrapper performs a bounded run and exits.

Normal successful exit:

- `exit_success_one_shot`

### Long-running mode

Wrapper remains alive and sleeps on stable idle.

Normal successful idle state:

- `sleeping`

Normal explicit termination:

- `exit_stop_requested`

## Error Record Shape

Minimal recommended error object:

```json
{
  "error_class": "recoverable",
  "error_code": "stale_lease_conflict",
  "message": "Worker lease expired during queue refresh.",
  "first_seen_at": "2026-03-15T20:10:00Z",
  "last_seen_at": "2026-03-15T20:10:10Z"
}
```

Recommended fields:

- `error_class`
- `error_code`
- `message`
- `first_seen_at`
- `last_seen_at`
- `attempt_count`
- `last_action`

## Decision Rules

### Continue

Continue when:

- no error exists
- or an issue was resolved inside the cycle

### Back off

Back off when:

- the error is recoverable
- and immediate retry would be noisy or wasteful

### Sleep

Sleep when:

- no fatal condition exists
- stable idle is confirmed
- wrapper policy is long-running

### Stop

Stop when:

- fatal error
- explicit stop request
- one-shot run completed successfully

## Relationship To Runtime Contract

`agent_runtime.json` should hold the latest wrapper health fields.

Suggested fields:

- `health.last_error`
- `health.last_recovery_action`
- `loop.last_result`

## Guardrails

- do not confuse `blocked` task status with fatal wrapper failure
- do not stop the whole loop for a recoverable queue race
- do not hide fatal errors behind endless retries
- do not use business-domain status strings as wrapper exit semantics

## Follow-On Dependencies

This model should feed:

- `define-dashboard-status-card-mapping`
- `define-json-dashboard-input-writeback-flow`
- `define-state-reconciliation-pass-between-repo-truth-and-json-summary`
