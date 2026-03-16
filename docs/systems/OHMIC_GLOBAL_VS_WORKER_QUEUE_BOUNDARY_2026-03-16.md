# Ohmic Global Vs Worker Queue Boundary

Date: 2026-03-16
Project: ohmic

## Purpose

Define the boundary between the canonical global queue and the worker-specific
task stack so assignment, reporting, and queue truth stay coherent.

## Core Rule

The global queue is the canonical shared work source.

The worker stack is the worker's local execution view.

They are related, but they are not interchangeable.

## Why This Boundary Matters

Without a hard boundary:

- workers appear to invent private queues
- reporting mixes global backlog with local in-flight state
- completion ownership gets muddy
- the same task can look available and claimed at the same time

The boundary keeps one shared source of truth while still allowing workers to
carry a bounded local frame.

## Global Queue Responsibilities

The global queue owns:

- canonical task existence
- task status lifecycle
- priority and ready/blocked/done placement
- shared visibility across workers
- global reporting totals

The global queue should answer:

- what work exists
- what state it is in
- whether it is ready, blocked, active, or done

## Queue Tier Rule

The global queue should distinguish between:

- `hot ready`
  - tasks immediately actionable without more packeting
- `warm queued`
  - packetizable follow-ons that are not yet promoted to ready
- `cold backlog`
  - known future actions grouped under waves, stacks, or parent packets

This keeps the visible ready queue useful while still preserving a much larger
set of queueable actions.

## Worker Stack Responsibilities

The worker stack owns:

- which queued work the worker is actively carrying
- the current primary task
- near-term follow-ons
- chosen fallback
- maintenance/verification slot

The worker stack should answer:

- what this worker is doing now
- what this worker is likely to do next
- what this worker can safely fall back to

## Shared Objective Versus Worker Slice

One shared objective may generate several worker-local slices.

Rules:

- the objective belongs to the global queue as the shared reference
- each worker only carries its own slice on its stack
- no worker should claim ownership of the whole shared objective unless that is
  the explicit task

This keeps fanout compatible with a single global source of truth.

## Claim Boundary Versus Task Boundary

The global queue tracks the task.

The claim tracks temporary active ownership of the touched path or packet.

Meaning:

- a task may exist without an active claim
- a claim should point back to the task or slice it is protecting
- the claim is not the canonical task object

This prevents claim files from accidentally becoming the real work registry.

## Assignment Flow

Recommended flow:

1. task appears in the global queue
2. worker selects eligible task
3. worker places task on local stack
4. worker creates active claim if editing or ownership protection is needed
5. task remains globally visible, but now shows active ownership

This keeps assignment visible without moving truth out of the queue.

## Completion Ownership

Completion should always reconcile back to the global queue.

Meaning:

- a worker may finish the local slice
- the task status transition to `done` must happen in the canonical queue
- worker-local stack entries should clear after reconciliation

Worker stack state should never be the only evidence that work is complete.

## Reporting Boundary

Global reports should read from the global queue and associated correctness
reports.

Worker reports may also read stack and claim state for:

- active load
- follow-on pressure
- fallback frequency

But backlog totals and task lifecycle counts should remain queue-derived.

## Minimal Boundary Rules

Rules:

- global queue owns status
- worker stack owns local selection
- claims own temporary protection
- reporting must know which source each metric came from
- completion reconciles into the queue first, then clears stack state
- queue health should be measured at both the hot-ready and total-queueable
  layers

## Queue Capacity Guidance

Recommended per active project:

- hot ready floor: `20`
- hot ready target: `28-32`
- warm queued reserve: `10-20`
- total queueable actions across hot/warm/cold tiers: `50+`

That means the system should stop treating a near-empty ready folder as healthy
just because some cold roadmap ideas exist somewhere else.

## Example Relationship

```text
global queue
-> task: ready

worker stack
-> primary: task

claim
-> protects task paths during active work

completion
-> queue task moved to done
-> claim completed
-> worker stack clears primary slot
```

## First Safe Implementation

The first implementation only needs:

1. explicit queue status ownership
2. explicit worker stack record
3. explicit claim linkage
4. reconciliation rules for completion

That is enough to keep one source of truth while supporting several workers.

## Immediate Follow-On

This boundary should feed:

1. multi-worker shared-objective fanout rules
2. live task route training lane
3. later runtime queue/stack projections
