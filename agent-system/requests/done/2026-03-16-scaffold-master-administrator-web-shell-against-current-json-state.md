Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T022929Z-794231bc

# Scaffold Master Administrator Web Shell Against Current JSON State

## Goal

Define the first actual web-shell scaffold for the Master Administrator using
the current shared JSON state and dashboard/writeback concepts as the initial
backing model.

## Focus

- intake queue panel
- aggregation queue panel
- routing desk panel
- audit/recent-actions panel
- command/input surface

## Acceptance

- one first web-shell scaffold is defined
- it clearly reuses existing JSON/runtime work
- the browser/backend/provider split stays clean

## Result

- defined the first JSON-backed shell in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_WEB_SHELL_AGAINST_JSON_STATE_2026-03-16.md`
- turned the administrator surface into five bounded panels: intake queue,
  aggregation queue, routing desk, audit/recent actions, and command input
- kept the browser on reconciled JSON view state and backend-owned command
  submission instead of drifting into provider or orchestrator responsibilities
