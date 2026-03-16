Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

# Define Backend Measurement Capture Retention Execution Slice

## Goal

Define the concrete execution slice for backend measurement captures so they
can be retained, relocated, or purged without guessing.

## Focus

- `services/backend/storage/measurement-captures/*`
- `services/backend/storage/measurement-captures.v1.json`

## Acceptance

- backend capture handling is explicit
- the next execution step can act without deleting evidence by accident
