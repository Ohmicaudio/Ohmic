Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify Backend Chirp Analyzer Venv Smoke Path

## Goal

Run the first reproducible venv-backed chirp analyzer smoke path and record the
truthful result.

## Source

- `docs/roadmap/OHMIC_BACKEND_CHIRP_ANALYZER_VENV_SMOKE_VERIFICATION_SLICE_2026-03-15.md`
- `services/backend/tools/bootstrap-chirp-analyzer-env.sh`
- `services/backend/tools/bootstrap-chirp-analyzer-env.ps1`

## Focus

- one bootstrapped Python environment
- fixture generation
- verifier execution
- exact success or failure note

## Acceptance

- one shell path is exercised end-to-end
- result is recorded precisely
- follow-on stays narrow if a shell-specific gap remains
