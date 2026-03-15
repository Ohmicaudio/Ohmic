Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic

# Define Orchestrator Lock And Worker Heartbeat Model

## Goal

Define the minimum lock and heartbeat model for multi-agent JSON-loop runs.

## Focus

- one orchestrator lease
- performer leases
- stale timeout
- takeover rules

## Acceptance

- clear rule for when an agent becomes orchestrator
- clear stale-lock recovery path
- compatible with the shared claim model rather than replacing it
