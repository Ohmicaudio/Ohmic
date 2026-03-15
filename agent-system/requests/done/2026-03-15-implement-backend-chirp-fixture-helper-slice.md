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

## Completion Notes

- Landed in `ohmic-audio-labs` as commit `7a5a65d` `Add backend chirp fixture helper tools`
- Included only:
  - `services/backend/tools/generate_chirp_fixture.py`
  - `services/backend/tools/verify_chirp_fixture.py`
- Generator verified successfully:
  - wrote WAV and manifest under `B:\ohmic-local\exports\measure-chirp-fixtures`
  - reported `paired_event_count: 11` and `initial_offset_ms: 7.0`
- Verifier failed precisely because the analyzer runtime is missing Python numeric
  dependencies:
  - `ModuleNotFoundError: No module named 'numpy'`
- Router and control-plane backend churn stayed out of the slice
