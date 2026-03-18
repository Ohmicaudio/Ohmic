Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Hybrid Stack Mode Switch Audit Event Family

## Goal

Define the audit events emitted when a hybrid worker shifts between
administrator-heavy and orchestrator-heavy stack modes.

## Focus

- mode switch event
- old/new dominant mode
- trigger reason
- operator override
- timestamping

## Acceptance

- one mode-switch audit packet is explicit
- hybrid stack mode changes become reviewable later
