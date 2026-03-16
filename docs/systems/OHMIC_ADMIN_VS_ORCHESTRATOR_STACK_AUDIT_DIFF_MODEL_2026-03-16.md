# Ohmic Admin Vs Orchestrator Stack Audit Diff Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit shape used to compare administrator-heavy and orchestrator-heavy
stack behavior.

## Suggested Fields

- `worker_mode`
- `primary_family`
- `family_count`
- `queue_repair_share`
- `documentation_fallback_share`
- `spillback_count`
- `reserve_slot_mix`

## Rule

The audit model should make these two hybrid modes comparable without claiming
they are supposed to look identical.
