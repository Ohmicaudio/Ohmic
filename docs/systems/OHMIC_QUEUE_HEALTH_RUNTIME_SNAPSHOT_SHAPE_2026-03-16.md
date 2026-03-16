# Ohmic Queue Health Runtime Snapshot Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the compact runtime snapshot object that packages queue headroom,
pressure, and refill state for projections and shell modules.

## Core Rule

Queue-health consumers should read one reconciled snapshot, not rebuild health
from raw folder scans and claim files on the UI side.

## Suggested Object

`QueueHealthRuntimeSnapshot`

Minimum top-level fields:

- `generated_at`
- `ready_count`
- `active_claim_count`
- `blocked_count`
- `hot_ready_count`
- `warm_reserve_count`
- `status_band`
- `derived_flags[]`
- `last_refill_at`
- `refill_age_minutes`
- `pressured_families[]`

Optional but useful:

- `same_family_pressure_rollups[]`
- `refill_urgency`
- `source_latest_write_time`

## First Safe Implementation

The first implementation only needs:

- global counts
- shared status band
- refill timing summary
- pressured-family summary
- generated timestamp

That is enough for runtime projections and card mappers to consume one stable
health object.
