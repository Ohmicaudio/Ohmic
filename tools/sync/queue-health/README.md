# Queue Health Runtime

This folder holds the first bounded queue-health runtime scaffolds that extend
the shared `tools/sync` JSON loop.

Current files:

- `common.ps1`
- `runtime-ready-count.ps1`
- `same-family-pressure-rollup.ps1`
- `refill-urgency-score.ps1`
- `health-runtime-snapshot.ps1`
- `dashboard-card-mapper.ps1`
- `pressure-alert-shell.ps1`

Projection inputs:

- `generated/agent-work/runtime/ready_tasks.json`
- `generated/agent-work/runtime/active_claims.json`
- `generated/agent-work/runtime/agent_state.json`
- `generated/agent-work/runtime/reconciliation_summary.json`

Generated runtime outputs when the write helpers are used:

- `queue_health_ready_count.json`
- `same_family_pressure_rollup.json`
- `queue_refill_urgency_score.json`
- `queue_health_runtime.json`
- `queue_headroom_dashboard_cards.json`
- `queue_pressure_alert_shell.json`

These are intentionally thin seams. They package queue and claim truth into
stable shapes without replacing the existing sync pipeline.
