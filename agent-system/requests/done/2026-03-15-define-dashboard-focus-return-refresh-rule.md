Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Focus Return Refresh Rule

## Goal

Define what should happen when the dashboard regains focus after being
backgrounded so state feels fresh without requiring manual reload.

## Focus

- immediate refresh on return
- reconciliation escalation on stale return
- relationship to background pause behavior

## Acceptance

- one bounded focus-return packet exists
- it fits the background-refresh and immediate-trigger rules
- it stays lightweight and dashboard-focused
