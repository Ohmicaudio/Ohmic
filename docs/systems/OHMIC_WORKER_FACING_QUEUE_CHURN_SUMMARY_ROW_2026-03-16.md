# Ohmic Worker Facing Queue Churn Summary Row

Date: 2026-03-16
Project: ohmic

## Purpose

Define the compact summary row a worker should see for important queue churn
events.

## Row Shape

`worker_facing_queue_churn_summary_row`

Required fields:

- `event_type`
- `family_id`
- `related_object_id`
- `intent_summary`
- `actor_type`
- `actor_id`
- `occurred_at`

## Events In Scope

Suggested first event types:

- closeout refill
- stale-ready hold
- system-created claim
- grouped wave promotion
- runway pressure warning

## Use Rule

This row should stay compact enough for dashboards and worker notices while
still pointing back to the fuller report packet for details.
