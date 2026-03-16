Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T034328Z-75332219

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

## Result

- defined retention classes in
  `docs/roadmap/OHMIC_OHMIC_AUDIO_LABS_LOCAL_OUTPUT_RETENTION_BOUNDARY_2026-03-16.md`
- classified runtime output into session-disposable, short-term evidence, and
  durable-fixture-candidate buckets
- set promotion and purge rules so captures and output stop accumulating by
  inertia
