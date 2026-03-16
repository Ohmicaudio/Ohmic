# Ohmic Queue Health Projection Input Contract

Date: 2026-03-16
Project: ohmic

## Purpose

Define the exact runtime summaries that the first queue-health projections are
allowed to consume.

## Allowed Inputs

- `generated/agent-work/runtime/ready_tasks.json`
- `generated/agent-work/runtime/active_claims.json`
- `generated/agent-work/runtime/agent_state.json`
- `generated/agent-work/runtime/reconciliation_summary.json`

## Contract Rule

Queue-health projections may summarize these runtime files, but they may not
replace the authoritative folder truth in:

- `agent-system/requests/ready`
- `agent-system/jobs/active`
- `agent-system/requests/blocked`
- `agent-system/requests/done`

## Generated Timestamping

Every queue-health projection should stamp `generated_at` in UTC so the shell
can distinguish fresh summaries from stale ones.
