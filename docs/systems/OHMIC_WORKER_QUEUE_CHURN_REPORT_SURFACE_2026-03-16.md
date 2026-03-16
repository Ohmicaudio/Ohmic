# Ohmic Worker Queue Churn Report Surface

Date: 2026-03-16
Project: ohmic

## Purpose

Define the worker-facing churn report surface that explains board movement which
would otherwise be easy to misread during active closeout and refill waves.

## Core Rule

Workers should not have to infer queue churn from raw file movement alone.

The system should surface a compact internal report that explains the most
important forms of underfoot board change.

## High-Value Churn Reports

### 1. Family Refill During Closeout

Report when a task family is refilled while a worker is closing a packet in that
same family.

Why it matters:

- explains why the board changed during closeout
- prevents the worker from treating refill as accidental drift
- helps distinguish healthy refill from conflict

Minimum fields:

- `family_id`
- `closing_task_id`
- `refill_event_id`
- `new_child_count`
- `actor`
- `timestamp`

### 2. Intentionally Stale Or Superseded Ready Report

Report when a ready item remains visible or is being demoted because it is
intentionally stale, superseded, or waiting behind a better grouped packet.

Why it matters:

- helps the worker avoid treating every stale ready file as a mistake
- clarifies whether the right move is deletion, demotion, or ignore-for-now

Minimum fields:

- `task_id`
- `staleness_reason`
- `replacement_task_id` or `replacement_family_id`
- `intended_state`
- `timestamp`

### 3. System-Created Claim Origin Report

Report when an active claim was created by the system, runtime helper, or
automation path instead of by the current human-guided worker.

Why it matters:

- prevents confusion about authorship
- helps workers trust claim origin and not assume a human conflict
- distinguishes self-created claims from system-created protective claims

Minimum fields:

- `claim_id`
- `claim_origin`
- `claim_owner`
- `claim_reason`
- `linked_task_id`
- `timestamp`

### 4. Wave As Single Packet Intent Report

Report when a queue wave or section family should be treated as one coherent
packet family instead of many unrelated singles.

Why it matters:

- helps workers plan around grouped intent
- prevents accidental fragmentation
- clarifies when successors belong to one section runway

Minimum fields:

- `wave_id` or `family_id`
- `parent_packet_id`
- `child_count`
- `single_packet_intent`
- `parallel_section_family`
- `timestamp`

## Presentation Shape

The first implementation only needs a compact worker-facing report with one row
per churn event or active churn signal.

Suggested shape:

```text
worker_queue_churn_report
- event_type
- family_id
- related_task_id
- related_claim_id
- intent_summary
- actor
- timestamp
```

## Use

This report should help the worker answer:

- did the board move because of healthy refill
- is this stale item intentional
- did the system create this claim
- is this wave supposed to be treated as one grouped lane

## Non-Goal

This is not a giant forensic ledger.

It is a worker-facing planning aid for live queue churn.

## Immediate Follow-On

This surface should feed:

1. family refill during closeout report
2. intentionally stale or superseded ready report
3. system-created claim origin report
4. wave-as-single-packet intent report
