Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T042044Z-86e381e9

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

## Result

- defined the retention/move packet in
  `docs/roadmap/OHMIC_BACKEND_MEASUREMENT_CAPTURE_RETENTION_EXECUTION_SLICE_2026-03-16.md`
- bounded the move set to `measurement-captures.v1.json` plus the
  `measurement-captures/**` payload only
- explicitly held out `device-registry.test.json` and
  `auth-control-plane.v1.sqlite*` so runtime auth state and source-visible test
  fixtures do not get mixed into the capture wave
