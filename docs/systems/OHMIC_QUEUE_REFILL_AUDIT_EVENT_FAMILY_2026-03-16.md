# Ohmic Queue Refill Audit Event Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit events emitted when the system refills, promotes, demotes, or
generates burst children so queue growth remains explainable later.

## Core Rule

Every meaningful refill mutation should emit one explicit audit event.

The system should be able to explain:

- why the board grew
- which source it used
- who or what caused the change

## Event Families

Suggested first families:

- `queue_refill_triggered`
- `queue_refill_completed`
- `queue_tier_promoted`
- `queue_tier_demoted`
- `queue_burst_generated`
- `queue_refill_override`

## Common Fields

Each event should carry:

- `queue_refill_event_id`
- `event_family`
- `affected_family_id`
- `source_tier`
- `target_tier`
- `packet_count_delta`
- `trigger_reason`
- `actor_type`
- `actor_id`
- `occurred_at`

Optional but useful:

- `parent_packet_id`
- `burst_batch_id`
- `same_family_pressure_snapshot`

## First Safe Implementation

The first implementation only needs:

- one explicit event per refill mutation
- source and target tier fields
- packet delta
- actor attribution
- trigger reason

That is enough to reconstruct how queue growth happened.
