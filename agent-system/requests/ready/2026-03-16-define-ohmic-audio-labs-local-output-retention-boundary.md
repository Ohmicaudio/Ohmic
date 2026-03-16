Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

# Define Ohmic Audio Labs Local Output Retention Boundary

## Goal

Define how long local runtime output like captures and backend measurement
artifacts should be kept, moved, or purged.

## Focus

- `captures/*`
- `output/*`
- `services/backend/storage/measurement-captures/*`

## Acceptance

- temporary runtime output has explicit retention classes
- repo-local runtime evidence stops living forever by accident
