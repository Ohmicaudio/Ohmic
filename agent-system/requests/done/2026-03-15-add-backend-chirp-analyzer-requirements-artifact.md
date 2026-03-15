Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Add Backend Chirp Analyzer Requirements Artifact

## Goal

Add one durable dependency artifact for the backend chirp analyzer runtime so
the bootstrap note can become executable without guesswork.

## Source

- `docs/roadmap/OHMIC_BACKEND_CHIRP_ANALYZER_PYTHON_DEPENDENCY_BOOTSTRAP_2026-03-15.md`

## Focus

- analyzer-specific Python dependency artifact
- minimal package list
- no broad Python packaging migration

## Acceptance

- one concrete dependency artifact exists for the chirp analyzer runtime
- package scope stays narrow
- next operator can bootstrap the analyzer environment directly

## Completion Notes

- Landed in `ohmic-audio-labs` as commit `c9c2653` `Add chirp analyzer requirements artifact`
- Added:
  - `services/backend/tools/requirements-chirp-analyzer.txt`
- Package scope stayed intentionally narrow:
  - `numpy`
  - `scipy`
- This is enough for the next operator to create a venv and install the
  analyzer runtime without guessing package names
