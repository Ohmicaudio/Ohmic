# Ohmic Agent Sanity And Error Check Hook Layer

Date: 2026-03-16
Project: ohmic

## Purpose

Define the hook points where sanity checks and explicit error checks should run
before, during, and after task completion.

## Core Rule

The agent loop should have stable hook points for cheap sanity checks.

These checks should catch obvious broken or inconsistent states early without
requiring the whole loop to be rewritten around a single giant validator.

## Why A Hook Layer Is Needed

Without hook points, the system tends to miss obvious issues until late:

- queue state drift
- stale or missing claims
- scope widening after a task is already active
- verification being skipped or overstated
- completion being recorded while the board is inconsistent

The hook layer makes those checks routinized instead of ad hoc.

## Recommended Hook Points

### 1. Pre-Task Sanity Hook

Run before claiming or taking a task.

Purpose:

- confirm the task is still ready
- confirm there is no overlapping active claim
- confirm the worker is eligible for the task's trust and scope
- confirm the queue state is not already stale or contradictory

Example checks:

- request still exists in `ready`
- no conflicting claim
- task is not already completed or blocked elsewhere

### 2. Pre-Edit Scope Hook

Run before substantial edits begin.

Purpose:

- confirm touched paths still match the claimed surface
- confirm the task has not silently widened into a different lane
- confirm the worker still has enough context/budget to proceed

Example checks:

- changed files remain inside the packet boundary
- no unrelated directories are creeping in
- current context budget is below the hard ceiling

### 3. Post-Edit Sanity Hook

Run after edits but before declaring success.

Purpose:

- ensure the edits remain scoped
- ensure changed files are coherent with the task
- check for obvious syntax or formatting breakage when relevant

Example checks:

- `git diff --check`
- changed paths still match the request/claim
- no accidental unrelated file edits were staged

### 4. Verification/Error Hook

Run when the task's acceptance implies checks.

Purpose:

- ensure verification actually happened when available
- capture explicit pass/fail/error state
- prevent invented success claims

Example checks:

- named test command ran
- build or route smoke check result captured
- "no test available" recorded truthfully

### 5. Queue/Claim Reconciliation Hook

Run before moving the request to `done`.

Purpose:

- ensure the request file, claim file, and completion state agree
- ensure the task is leaving `ready` truthfully
- ensure the board is not left in a contradictory state

Example checks:

- request status is updated
- claim id in request matches the actual claim
- completed claim record points at the `done` request path

### 6. Post-Completion Review Hook

Run after closeout.

Purpose:

- attach correctness or review state
- note reopen risk
- catch immediate closure defects

Example checks:

- correctness report fields exist
- result note mentions actual verification evidence
- obvious reopen trigger is not ignored

## Hook Categories

Hooks should be cheap and layered.

Suggested categories:

- `sanity`
- `scope`
- `verification`
- `queue_truth`
- `correctness`

Not every task needs every heavy check, but every task should pass through the
relevant hook categories.

## Hook Outcomes

Each hook should be able to return:

- `pass`
- `warn`
- `block`

Meaning:

- `pass`: continue
- `warn`: continue, but record the issue
- `block`: stop, split, fix, or escalate

## Minimal Hook Record

Suggested fields:

- `hook_id`
- `hook_kind`
- `task_ref`
- `worker_id`
- `ran_at`
- `result`
- `notes`

## Example Shape

```json
{
  "hook_id": "hook_20260316_001",
  "hook_kind": "queue_truth",
  "task_ref": "2026-03-16-define-agent-trust-tier-model",
  "worker_id": "worker_docs_01",
  "ran_at": "2026-03-16T03:21:00Z",
  "result": "pass",
  "notes": "Request state, claim state, and done-path reconciliation are aligned."
}
```

## First Safe Implementation

The first implementation only needs:

1. pre-task sanity hook
2. verification/error hook
3. queue/claim reconciliation hook

That is enough to catch the most expensive obvious failures early.

## Immediate Follow-On

This hook layer should feed:

1. Gemini verification packet
2. later runtime check execution
3. broader worker sanity automation without loop rewrite
