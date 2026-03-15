Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Chirp Endpoint Smoke Slice

## Purpose

Define the next narrow backend verification step after the chirp helper and
analyzer toolchain passes end-to-end in a dedicated Windows virtualenv.

## Current Truth

The tool-level chirp path is now proven through:

- `bootstrap-chirp-analyzer-env.ps1`
- `requirements-chirp-analyzer.txt`
- `generate_chirp_fixture.py`
- `verify_chirp_fixture.py`
- `chirp_analyzer.py`

The next strongest backend check is not more helper work. It is one endpoint
smoke pass proving that `POST /api/measurement/analyze/chirp` can invoke the
same analyzer runtime through backend code.

## Exact Slice Scope

- `services/backend/src/measurementReferenceAnalyzer.ts`
- `services/backend/src/index.ts`
- backend README command/env notes only if needed

## Required Runtime Inputs

- `OHMIC_CHIRP_ANALYZER_PYTHON` pointing at the proven Windows venv interpreter
- one generated chirp fixture WAV or backend capture ref
- narrow request payload for `POST /api/measurement/analyze/chirp`

## Acceptance

- one backend endpoint smoke path runs against the chirp analyzer runtime
- success or exact backend/runtime failure is recorded precisely
- no unrelated backend auth/router/control-plane changes are mixed in

## Explicitly Out Of Scope

- capture storage refactors
- generalized backend test harness work
- frontend measurement UI
- broader Python environment policy
