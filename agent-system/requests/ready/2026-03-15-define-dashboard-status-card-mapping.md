Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Status Card Mapping

## Goal

Define how live agent JSON state should map into a small set of dashboard cards
or panes without exposing raw internal detail everywhere.

## Focus

- summary card
- queue health card
- current action card
- blockers or risk card

## Acceptance

- one simple dashboard-mapping packet exists
- it fits the current JSON contracts
- it stays UI-light and contract-first
