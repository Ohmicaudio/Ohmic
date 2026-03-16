# Ohmic Queue Refill Trigger Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the explicit conditions that should trigger queue refill before the hot
lane starves or one active family runs out of usable follow-on work.

## Core Rule

Refill should happen because measurable triggers fired.

It should not depend on a human noticing "the board feels low."

## Trigger Families

### 1. Count Trigger

Fire when total hot-ready count falls below the declared floor.

Suggested first thresholds:

- standard mode: `< 20`
- heavy parallel mode: `< 24`

This is the broadest refill trigger and should always be active.

### 2. Same-Family Trigger

Fire when an active family is down to its last hot-ready packet.

Suggested first thresholds:

- warning at `2`
- refill-required at `1`

This prevents active lanes from collapsing even when total ready count still
looks healthy.

### 3. Throughput Trigger

Fire when workers close tasks faster than replacement packets appear.

Suggested first signal:

- `3+` task closures in one family without a matching refill event

This is the main anti-starvation trigger for fast-moving bursts.

### 4. Refill Age Trigger

Fire when the board has not been materially refilled for too long while work is
still being consumed.

Suggested first thresholds:

- warning at `45 minutes`
- escalation at `90 minutes`

### 5. Worker Ratio Trigger

Fire when active worker count is too high relative to same-family or total
hot-ready depth.

Suggested first signals:

- total hot-ready per active worker drops below `4`
- same-family hot-ready per active worker drops below `2`

### 6. Warm Reserve Depletion Trigger

Fire when warm reserve drops under the minimum needed to recover hot-ready
quickly.

Suggested first thresholds:

- warning when warm reserve `< 10`
- refill-required when warm reserve `< 6`

## Trigger Precedence

Suggested priority:

1. same-family trigger
2. count trigger
3. worker ratio trigger
4. throughput trigger
5. warm reserve depletion trigger
6. refill age trigger

This order favors active work continuity over generic background neatness.

## Trigger Output

Each fired trigger should produce a structured refill signal with at least:

- `trigger_id`
- `trigger_family`
- `trigger_reason`
- `affected_family`
- `hot_ready_count`
- `warm_reserve_count`
- `active_worker_count`
- `fired_at`

## De-Dupe Rule

Repeated refill triggers should not spam the board.

The system should collapse repeated triggers when:

- the same trigger family fires for the same work family
- no meaningful refill or state change happened since the last signal

## First Safe Implementation

The first implementation only needs:

- count trigger
- same-family trigger
- throughput trigger
- refill age trigger
- structured refill signal output

That is enough to make refill behavior explicit and auditable.
