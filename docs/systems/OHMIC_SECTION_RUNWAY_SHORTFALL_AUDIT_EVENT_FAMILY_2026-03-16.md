# Ohmic Section Runway Shortfall Audit Event Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit event family emitted when a section family falls below its
declared runway target.

## Event Shape

`section_runway_shortfall_audit_event`

Required fields:

- `event_id`
- `family_id`
- `active_wave_count`
- `hot_successor_count`
- `staged_successor_count`
- `target_hot_successor_count`
- `target_staged_successor_count`
- `shortfall_reason`
- `actor_type`
- `actor_id`
- `occurred_at`

## Shortfall Reasons

Suggested first values:

- `hot_successor_below_target`
- `staged_successor_missing`
- `parallel_family_floor_broken`
- `drain_prediction_triggered`
- `blocked_family_exception_active`

## Actor Rule

The event should preserve who or what surfaced the shortfall:

- worker
- operator
- runtime
- orchestrator

## Review Use

This event family exists so later review can distinguish:

- ordinary closeout pressure
- repeated same-family starvation
- exception-driven one-family survival

## First Safe Implementation

Only one stable event family is needed for now.

Later systems can emit many instances of it without changing the shape.
