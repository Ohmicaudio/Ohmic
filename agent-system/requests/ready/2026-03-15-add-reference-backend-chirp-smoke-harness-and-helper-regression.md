Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Add Reference Backend Chirp Smoke Harness And Helper Regression

## Goal

Implement the next grouped backend chirp packet so the helper contract and the
reference backend path remain durable without pretending backend is the
canonical runtime.

## Source

- `docs/roadmap/OHMIC_BACKEND_CHIRP_REGRESSION_AND_BOOTSTRAP_WAVE_2026-03-15.md`

## Focus

- helper regression coverage
- one reference backend chirp smoke harness
- minimal runtime/bootstrap note updates only if required

## Acceptance

- the already-proven chirp path is preserved
- backend remains clearly secondary to local-web
- the reference backend smoke can fail explicitly instead of silently rotting
