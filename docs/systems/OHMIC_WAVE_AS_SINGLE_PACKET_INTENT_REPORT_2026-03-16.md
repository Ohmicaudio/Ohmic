# Ohmic Wave As Single Packet Intent Report

Date: 2026-03-16
Project: ohmic

## Purpose

Define the report that marks a queue wave as one coherent packet family rather
than many unrelated singles.

## Report Shape

`wave_as_single_packet_intent_report`

Required fields:

- `family_id`
- `parent_packet_id`
- `grouped_wave_intent`
- `child_task_count`
- `parallel_family_context`
- `reported_at`

## Relationship To Intent Flag

The intent flag is the stable reusable shape.

This report is the worker-facing rendering of that grouped intent when the wave
is visible in queue churn or refill activity.
