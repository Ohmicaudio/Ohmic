Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T180009Z-0d376d41

# Implement JSON Dashboard Status Card Mapper Prototype

## Goal

Turn the dashboard status-card rules into a first concrete mapper that converts
the JSON state summary into display-ready cards.

## Source

- `docs/systems/OHMIC_DASHBOARD_*`
- `docs/systems/OHMIC_LIVE_AGENT_STATE_JSON_CONTRACT_2026-03-15.md`

## Focus

- routine status cards
- blocked state emphasis
- freshness hints
- compact summary output

## Acceptance

- a first mapper exists in code or script form
- it can render at least a few key dashboard cards from live JSON
- mapping behavior is documented where the code alone is not obvious

## Outcome

Completed on 2026-03-15.

Result:

- implemented a first dashboard card mapper that turns the reconciled runtime
  JSON into display-ready summary, queue-health, current-action, and
  blockers/risk cards
- used the runtime summaries as inputs instead of inferring dashboard state from
  markdown directly
- documented the prototype so follow-on UI work can mirror the same card shape

## Artifact

- `B:\ohmic\tools\sync\map-dashboard-status-cards.ps1`
- `B:\ohmic\generated\agent-work\runtime\dashboard_status_cards.json`
- `B:\ohmic\docs\systems\OHMIC_JSON_RUNTIME_RECONCILIATION_AND_DASHBOARD_PROTOTYPES_2026-03-15.md`
