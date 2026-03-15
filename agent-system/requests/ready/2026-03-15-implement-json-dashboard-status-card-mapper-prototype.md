Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic

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
