# Ohmic System Claim Origin Type Catalog

Date: 2026-03-16
Project: ohmic

## Purpose

Define the origin types used when an active claim was created by the system
rather than directly by the current worker.

## Catalog

- `runtime_protective_claim`
- `auto_refresh_claim`
- `queue_health_reconciliation_claim`
- `orchestrator_generated_claim`
- `operator_forced_system_claim`

## Use Rule

This catalog should be the stable source for worker-facing claim-origin
reporting and queue-churn summaries.
