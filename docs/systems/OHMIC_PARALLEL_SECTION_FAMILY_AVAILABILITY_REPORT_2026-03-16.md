# Ohmic Parallel Section Family Availability Report

Date: 2026-03-16
Project: ohmic

## Purpose

Define the worker-facing report that shows whether at least two parallel
section families are alive with enough runway to keep execution healthy.

## Report Shape

`parallel_section_family_availability_report`

Required fields:

- `parallel_section_family_count`
- `parallel_section_family_floor`
- `parallel_section_family_floor_met`
- `single_family_emergency_mode`
- `blocked_parallel_family_count`
- `successor_depth_by_family`
- `reported_at`

## Successor Depth Payload

`successor_depth_by_family` should expose one entry per family with:

- `family_id`
- `active_wave_count`
- `hot_successor_count`
- `staged_successor_count`
- `alive_with_runway`
- `availability_reason`

## Interpretation Rule

The report should say a family is alive with runway only when it meets the
balanced runway minimum or has an explicit exception that explains why it is
still being counted.

## Availability Reasons

Suggested first values:

- `balanced_runway_met`
- `high_throughput_runway_met`
- `blocked_family_exception`
- `single_family_emergency_override`
- `runway_shortfall`

## Worker Use

Workers should be able to see:

- whether the two-family floor is currently met
- which family is short on runway
- whether the system is surviving on an exception instead of healthy depth

## Non-Goal

This report does not choose the refill action by itself.

It makes the state directly visible so refill, promotion, and routing can be
justified later.
