# Ohmic Queue Starvation Warning Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define the warnings that should fire before the queue reaches zero or one
active family silently runs out of viable follow-on work.

## Core Rule

Warnings should fire before failure, not after empty-board collapse.

## Warning Classes

Suggested first warning classes:

- `global_hot_ready_watch`
- `global_hot_ready_critical`
- `same_family_watch`
- `same_family_critical`
- `refill_stale_warning`
- `worker_to_ready_imbalance`
- `warm_reserve_exhausted`

## Global Warning Thresholds

Suggested first thresholds:

- watch when global hot-ready is below target but above floor
- critical when global hot-ready is at or below floor

## Same-Family Warning Thresholds

Suggested first thresholds:

- watch when family ready depth is `floor + 1`
- critical when family ready depth is at or below floor

## Alert Rule

Warnings should at minimum expose:

- warning class
- affected family or `global`
- current count or ratio
- recommended next action
- emitted timestamp

Recommended next actions:

- `promote_warm_reserve`
- `generate_burst`
- `run_refill_now`
- `pause_stack_expansion`

## First Safe Implementation

The first implementation only needs:

- global warning classes
- same-family warning classes
- stale-refill warning
- warm-reserve exhaustion warning
- structured alert output

That is enough to make starvation visible before the board empties.
