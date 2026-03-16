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

These are intentionally thin seams. They package queue and claim truth into
stable shapes without replacing the existing sync pipeline.
