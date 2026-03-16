# Ohmic Queue Runtime Generated File Boundary

Date: 2026-03-16
Project: ohmic

## Purpose

Define which queue-health files are generated runtime artifacts versus
source-truth docs or requests.

## Generated Runtime Files

When queue-health write helpers are used, these files are generated outputs:

- `generated/agent-work/runtime/queue_health_ready_count.json`
- `generated/agent-work/runtime/same_family_pressure_rollup.json`
- `generated/agent-work/runtime/queue_refill_urgency_score.json`
- `generated/agent-work/runtime/queue_health_runtime.json`
- `generated/agent-work/runtime/queue_headroom_dashboard_cards.json`
- `generated/agent-work/runtime/queue_pressure_alert_shell.json`

## Source Truth

These are not generated and must stay hand-authored:

- request packets under `agent-system/requests`
- policy docs under `docs/systems`
- queue-health source scripts under `tools/sync/queue-health`

## Overwrite Rule

Generated runtime files may be overwritten by the loop at any time. They should
never be treated as the only record of policy.
