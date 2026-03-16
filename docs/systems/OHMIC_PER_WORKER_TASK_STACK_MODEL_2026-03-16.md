# Ohmic Per-Worker Task Stack Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define how each worker should hold its own bounded stack so a global queue can
feed several workers without context overload or hidden duplication.

## Core Rule

Each worker should carry a small explicit stack.

The global queue is not the same thing as the worker's live stack.

## Why This Model Is Needed

Without a bounded worker stack:

- workers silently carry too many loose tasks
- fallback choices become ad hoc
- context overload grows without being visible
- the same objective gets duplicated across workers

The stack model makes in-flight work explicit and bounded.

## Recommended Stack Slots

Each worker should have these slots:

### 1. Primary Task

Purpose:

- the one task currently being executed

Rule:

- exactly one primary task at a time

### 2. Near-Term Follow-Ons

Purpose:

- one or two likely next tasks already selected from the queue

Rule:

- should stay tightly related to the current lane
- these are candidates, not parallel active tasks

### 3. Fallback Task

Purpose:

- one safe alternate task if the primary task blocks

Rule:

- should already satisfy trust and collision rules
- should be lower-cost to enter than re-scanning the whole queue

### 4. Maintenance Or Verification Slot

Purpose:

- one bounded maintenance, verification, or truth-cleanup task that can be used
  when higher-value work is blocked or waiting

Rule:

- should remain narrow and low collision

## Preferred Stack Depth

Recommended preferred depth:

- `1` primary
- `1-2` near-term follow-ons
- `1` fallback
- `0-1` maintenance slot

That means most workers should operate comfortably with a stack depth of about
`3` to `5` records.

## Maximum Stack Depth

Recommended hard maximum:

- `5`

Beyond that, the worker is likely carrying too much invisible planning state
and should push extra work back to the queue or split objectives more clearly.

## Near-Term Follow-On Rules

Near-term follow-ons should be:

- from the same lane or objective
- already safe for the worker's trust tier
- distinct enough that they are not duplicate claims of the same work

They should not be:

- a second hidden primary task
- broad speculative backlog bookmarks

## Fallback Task Rules

The fallback task should be chosen using the same fallback policy that governs
worker behavior.

It should:

- be safe if the primary blocks
- be narrower than a fresh queue scan
- not overlap with another active claim

Only one explicit fallback task is needed at a time.

## Maintenance Or Verification Slot

This slot exists because workers often need a truthful low-risk place to land
when blocked.

Good examples:

- one queue-truth cleanup
- one regression verification slice
- one narrow docs-truth correction

Bad examples:

- broad repo cleanup
- unrelated backlog exploration
- anything that quietly becomes a second objective

## Same-Objective Multi-Worker Fan-Out

One objective may feed several workers, but each worker should still carry only
its own bounded slice.

Meaning:

- one shared objective can split into many worker-local task packets
- no worker should treat the whole objective as its personal stack

This prevents "shared objective" from becoming "infinite shared task."

## Minimal Stack Record

Suggested object:

- `worker_id`
- `primary_task_ref`
- `follow_on_refs[]`
- `fallback_task_ref`
- `maintenance_task_ref`
- `stack_depth`
- `last_reconciled_at`

## Example Shape

```json
{
  "worker_id": "worker_docs_01",
  "primary_task_ref": "2026-03-16-define-worker-registry-schema",
  "follow_on_refs": [
    "2026-03-16-define-per-worker-task-stack-model",
    "2026-03-16-define-global-vs-worker-queue-boundary"
  ],
  "fallback_task_ref": "2026-03-15-normalize-design-sandbox-stitch-support-surface",
  "maintenance_task_ref": "2026-03-16-run-gemini-first-verification-packet",
  "stack_depth": 5,
  "last_reconciled_at": "2026-03-16T03:12:00Z"
}
```

## Relationship To The Queue

The queue remains the shared supply of work.

The stack is the worker's selected local execution frame.

Rules:

- queue items are not on a worker stack until selected
- stack entries should be reconciled back to the queue regularly
- hidden private task piles should be avoided

## Immediate Follow-On

This model should feed:

1. global vs worker queue boundary
2. multi-worker shared-objective fanout rules
3. later runtime stack state projections
