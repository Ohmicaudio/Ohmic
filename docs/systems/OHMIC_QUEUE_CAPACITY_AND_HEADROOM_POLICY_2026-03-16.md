# Ohmic Queue Capacity And Headroom Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how much queue headroom the shared system should maintain so parallel
workers can keep moving without repeatedly collapsing the ready stack to zero.

## Core Rule

The system needs more than a tiny survival queue.

It should maintain:

- a hot ready floor
- a hot ready target
- a warm queued reserve
- a larger pool of total queueable actions

## Queue Tiers

### 1. Hot Ready

Tasks that can be claimed immediately.

These should be:

- bounded
- actionable
- not blocked by missing packeting

### 2. Warm Queued

Tasks that are already known and mostly packeted, but not yet promoted into the
top ready lane.

These should be:

- near-term follow-ons
- grouped execution waves
- lane reserves for active initiatives

### 3. Cold Queueable

Known future actions preserved as waves, parent packets, or grouped stacks.

These should be:

- coherent
- truthful
- easy to promote quickly

## Recommended Capacity

Per active project:

- hot ready floor: `20` real tasks
- hot ready target: `28-32`
- warm queued reserve: `10-20`
- total queueable actions across all tiers: `50+`

For heavier parallel periods or `x + 1` worker mode:

- hot ready floor: `24`
- hot ready target: `32-40`
- warm queued reserve: `15-25`
- total queueable actions: `60-80+`

## Per-Worker Routed Stack Guidance

Recommended routed stack depth:

- trusted performer: `6`
- orchestrator-performer hybrid: `7`
- max normal stack: `8-10`
- fresh worker: `4-6`

This does not mean giant context.
It means the queue should already know what comes next for that worker.

## Refill Triggers

Refill should happen when any of these are true:

- hot ready falls below floor
- more than `3` tasks close in one lane without replacement
- active workers outnumber same-family ready tasks by too much
- one initiative has only one remaining ready packet

## Throughput Rule

Queue maintenance should keep pace with throughput.

If workers are burning through admin, cleanup, or implementation packets faster
than refill happens, the system should:

- package larger follow-on waves
- promote parent/child packet bursts
- keep reserve tasks near each active family

## Reporting Fields

Recommended tracked metrics:

- `hot_ready_count`
- `warm_queued_count`
- `cold_queueable_count`
- `active_worker_count`
- `same_family_ready_pressure`
- `queue_refill_age`

## Non-Goal

This policy does not say every task should be dumped into `ready`.

It says the system should preserve a much larger pool of queueable actions and
promote them early enough that the ready floor does not keep collapsing.

## Immediate Follow-On

This policy should feed:

1. worker stack expansion policy
2. hot-vs-warm queue tier model
3. queue refill trigger model
4. burst packet generation rules
