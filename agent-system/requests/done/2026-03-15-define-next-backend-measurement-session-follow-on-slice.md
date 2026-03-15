Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next Backend Measurement Session Follow On Slice

## Goal

Define the next backend follow-on slice after the current router and measurement
capture work so the backend lane does not go dark again.

## Source

- `docs/roadmap/OHMIC_BACKEND_FIRST_SAFE_SLICE_2026-03-15.md`
- recent backend slice notes in `docs/roadmap/`

## Focus

- next safe boundary
- likely files and tests
- what to keep out
- why the slice matters

## Acceptance

- one clear next backend slice packet exists
- the slice is smaller than the whole subsystem
- it is ready to promote to implementation without rethinking from scratch

## Completion Notes

- Defined the next truthful backend packet at
  `docs/roadmap/OHMIC_BACKEND_MEASUREMENT_CHIRP_FIXTURE_SAFE_SLICE_2026-03-15.md`
- The chosen slice is the chirp fixture helper family:
  `generate_chirp_fixture.py` plus `verify_chirp_fixture.py`
- This was selected because current backend router/control-plane files did not
  show trustworthy semantic pressure, while the chirp fixture helpers are real
  bounded backend work
- Known follow-on watchout remains the Python analyzer dependency path,
  especially environments missing `scipy`
