Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Backend Chirp Fixture Helper Slice

## Goal

Land the bounded backend measurement-helper slice for chirp fixture generation
and verification.

## Source

- `docs/roadmap/OHMIC_BACKEND_MEASUREMENT_CHIRP_FIXTURE_SAFE_SLICE_2026-03-15.md`

## Focus

- `generate_chirp_fixture.py`
- `verify_chirp_fixture.py`
- narrow tool-level verification
- honest note about Python dependency gaps if they remain

## Acceptance

- one bounded backend helper commit lands
- the chirp fixture tools are verified or blocked precisely
- router/control-plane churn stays out
