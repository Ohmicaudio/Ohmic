# Ohmic Queue Headroom Dashboard Metrics

Date: 2026-03-16
Project: ohmic

## Purpose

Define the dashboard metrics and cards that should make queue headroom visible
inside the shared runtime layer.

## Core Rule

Queue health should be visible from a small, high-signal card set.

The dashboard should answer:

- is the hot-ready lane healthy
- does each active family have runway
- is refill overdue
- are active workers consuming faster than refill keeps up

## Required Metrics

### 1. `hot_ready_count`

Immediate hot-ready task count across the project.

### 2. `warm_reserve_count`

Warm queued tasks available for fast promotion.

### 3. `total_queueable_count`

Total known queueable work across hot, warm, and colder tracked tiers.

### 4. `same_family_pressure`

A compact signal derived from same-family ready depth and same-family worker
pressure.

### 5. `queue_refill_age_minutes`

Minutes since the last successful refill event that materially restored headroom.

## Recommended Card Set

### 1. Queue Headroom Card

Fields:

- `hot_ready_count`
- `warm_reserve_count`
- `total_queueable_count`
- `status_band`

Use:

- main queue health glance
- global floor monitoring

### 2. Family Pressure Card

Fields:

- `family_id`
- `same_family_ready_count`
- `warm_family_reserve_count`
- `active_worker_to_same_family_ratio`
- `status_band`

Use:

- lane starvation detection
- same-family refill checks

### 3. Refill Cadence Card

Fields:

- `queue_refill_age_minutes`
- `last_refill_actor`
- `last_refill_mode`
- `refill_urgency_score`

Use:

- stale-board detection
- refill timing visibility

### 4. Worker Load Pressure Card

Fields:

- `active_worker_count`
- `active_worker_to_ready_ratio`
- `workers_in_pressure_families`
- `status_band`

Use:

- throughput vs queue depth checks
- operator intervention signals

## Status Presentation

Each card should use a shared status vocabulary:

- `healthy`
- `watch`
- `pressure`
- `critical`

Cards should not invent card-local severity labels.

## Projection Rule

Dashboard metrics should come from a compact queue-health projection, not from
raw folder scans in the UI layer.

The UI should consume:

- current counts
- derived status bands
- recent refill summary
- affected family ids when pressure exists

## Non-Goal

This metric layer is not a full analytics suite.

It is a tight operator-facing surface for:

- queue headroom
- family starvation pressure
- refill staleness
- worker imbalance

## Immediate Follow-On

This metric set should feed:

1. queue health runtime snapshot shape
2. queue capacity dashboard card set
3. same-family pressure rollup projection
4. refill urgency score model
