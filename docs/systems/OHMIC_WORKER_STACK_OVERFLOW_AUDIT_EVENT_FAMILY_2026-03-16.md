# Ohmic Worker Stack Overflow Audit Event Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit event family that explains worker-stack overflow and recovery.

## Event Family

- `worker_stack_soft_breach_detected`
- `worker_stack_hard_breach_detected`
- `worker_stack_spillback_applied`
- `worker_stack_recovery_completed`

## Minimum Fields

- `worker_id`
- `stack_depth`
- `primary_family`
- `family_count`
- `trigger_reason`
- `recorded_at`

## Rule

Audit events explain overflow decisions after the fact. They do not replace the
stack policy itself.
