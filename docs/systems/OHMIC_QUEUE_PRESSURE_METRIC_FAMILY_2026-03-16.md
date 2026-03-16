# Ohmic Queue Pressure Metric Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the metric family that tells the shared system when a queue or work
family is drifting from healthy headroom into starvation pressure.

## Core Rule

Queue pressure should be measured, not guessed from a folder glance.

The system should track:

- global hot-ready pressure
- same-family pressure
- refill staleness
- worker-to-ready imbalance
- reserve depletion

## Metric Family

### 1. `hot_ready_count`

Count of globally ready tasks that can be claimed immediately.

Use:

- primary floor check
- global starvation warning
- refill trigger input

### 2. `same_family_ready_count`

Count of ready tasks in the currently active family or initiative.

Use:

- lane starvation detection
- worker fallback safety
- family reserve checks

### 3. `warm_family_reserve_count`

Count of near-term warm queued tasks available for fast promotion in the same
family.

Use:

- promotion viability
- burst refill eligibility
- family runway estimation

### 4. `queue_refill_age_minutes`

Elapsed time since the last successful refill or promotion event that added hot
ready capacity.

Use:

- stale-board detection
- cadence policy input
- audit reporting

### 5. `active_worker_to_ready_ratio`

Ratio between active workers and total hot-ready tasks.

Use:

- pressure trend detection
- overconsumption warnings
- burst refill thresholding

### 6. `active_worker_to_same_family_ratio`

Ratio between active workers in one family and same-family ready tasks.

Use:

- family overload detection
- same-family emergency refill
- safe fanout checks

## Status Bands

Recommended status bands:

- `healthy`
  - global hot-ready above target
  - same-family ready depth above family floor
- `watch`
  - global hot-ready above floor but below target
  - same-family ready depth narrowing
- `pressure`
  - global hot-ready at or below floor
  - or one active family near single-packet survival
- `critical`
  - ready queue approaching zero
  - or active workers outnumber same-family ready tasks with no warm reserve

## Derived Flags

Recommended derived flags:

- `global_floor_breach`
- `family_floor_breach`
- `refill_stale`
- `worker_imbalance_warning`
- `warm_reserve_exhausted`

These should be easier to consume than raw counts alone.

## Reporting Shape

Minimum reporting bundle:

```text
queue_pressure
- hot_ready_count
- same_family_ready_count
- warm_family_reserve_count
- queue_refill_age_minutes
- active_worker_to_ready_ratio
- active_worker_to_same_family_ratio
- status_band
- derived_flags[]
```

## Operational Use

The system should use this family for:

1. automatic refill triggers
2. queue headroom dashboard cards
3. starvation warnings
4. burst generation decisions
5. worker stack reserve tuning

## Non-Goal

This metric family is not a giant analytics dashboard.

It is a compact operating signal set for deciding:

- refill now or later
- promote a family reserve or not
- warn the operator or not
- keep assigning or top up first

## Immediate Follow-On

This metric family should feed:

1. queue headroom dashboard metrics
2. queue starvation warning rules
3. queue refill cadence policy
4. same-family ready floor policy
