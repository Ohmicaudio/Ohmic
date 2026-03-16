Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Orchestrator Rescue Slot Release Rules

## Goal

Define when an orchestrator-heavy stack should release a protected rescue slot
back into normal fallback rotation.

## Focus

- stable-state release
- stale rescue release
- pressure decay
- operator release
- auditability

## Acceptance

- one rescue-release packet is explicit
- protected rescue slots do not linger longer than needed
