# Ohmic Closeout Refill Notice Payload

Date: 2026-03-16
Project: ohmic

## Purpose

Define the compact worker-facing payload shown when a family is refilled while
the worker is closing out a packet in that same family.

## Payload Shape

`closeout_refill_notice_payload`

Required fields:

- `closing_task_id`
- `closing_family_id`
- `refill_event_id`
- `new_child_count`
- `actor_type`
- `actor_id`
- `occurred_at`

## Use Rule

This payload should explain underfoot refill without making it look random.

The worker should be able to tell:

- which packet was closing
- which family was refilled
- how many new children appeared
- who or what caused the refill

## Non-Goal

This payload is the compact notice only.

The durable report that preserves the full linkage belongs in the closeout
report shape.
