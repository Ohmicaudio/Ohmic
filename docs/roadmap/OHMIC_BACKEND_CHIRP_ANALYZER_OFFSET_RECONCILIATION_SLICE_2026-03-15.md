Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Chirp Analyzer Offset Reconciliation Slice

## Purpose

Define the next narrow backend analyzer slice after the first successful
venv-backed smoke path exposed a timing mismatch between the generated fixture
manifest and the analyzer report.

## Verified Current Truth

### WSL bootstrap

- `bootstrap-chirp-analyzer-env.sh` currently blocks in this shell because the
  host Python lacks `ensurepip` / `python3-venv`

### Windows bootstrap

- `bootstrap-chirp-analyzer-env.ps1` now works after a small `Split-Path`
  argument-binding fix
- Windows venv bootstrap succeeded
- `numpy` and `scipy` installed successfully

### Smoke verification

Using the Windows venv path:

- fixture generation succeeded
- analyzer verification executed successfully enough to produce a structured
  result
- verification failed on timing agreement, not environment setup

Observed mismatch:

- expected `initial_offset_ms`: `7.000`
- analyzer `initial_offset_ms`: `-13.000`
- expected `A_times_s[0]`: `1.000000`
- analyzer `A_times_s[0]`: `1.050000`
- expected `B_times_s[0]`: `1.007000`
- analyzer `B_times_s[0]`: `1.037000`

This means the next issue is semantic alignment between:

- generated expected timestamps
- analyzer detection timestamps
- verification comparison assumptions

## Exact Slice Scope

- `services/backend/tools/generate_chirp_fixture.py`
- `services/backend/tools/chirp_analyzer.py`
- `services/backend/tools/verify_chirp_fixture.py`

Documentation context allowed:

- `services/backend/README.md`

## Strongest Current Hypotheses

1. the generator manifest records chirp start times while the analyzer reports
   matched-filter peak times closer to chirp centers
2. the up/down chirp detection path may apply different effective timing bias
3. the verifier currently compares unlike timestamp semantics directly

## Acceptance

- one narrow reconciliation pass explains the offset mismatch
- the fix lands in either generator expectations, analyzer timestamps, or
  verifier comparison logic
- the change does not widen into backend service/router work

## Explicitly Out Of Scope

- backend API endpoint work
- capture storage/index changes
- broad Python environment work
- frontend measurement UI
