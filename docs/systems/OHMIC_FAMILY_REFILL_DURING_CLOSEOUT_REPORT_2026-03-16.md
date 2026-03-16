# Ohmic Family Refill During Closeout Report

Date: 2026-03-16
Project: ohmic

## Purpose

Define the worker-facing report emitted when a task family is refilled during
closeout of a packet in that same family.

## Report Shape

`family_refill_during_closeout_report`

Required fields:

- `report_id`
- `closing_task_id`
- `closing_claim_id`
- `family_id`
- `refill_event_id`
- `new_child_count`
- `actor_type`
- `actor_id`
- `reported_at`

## Relationship To Notice Payload

The compact notice payload is for immediate worker visibility.

This report is the durable record that preserves linkage between closeout and
same-family refill so later review can separate healthy replenishment from
confusing churn.

## Worker Use

Workers should be able to tell:

- the family stayed coherent
- refill was intentional
- the refill belonged to the same family they were already closing
