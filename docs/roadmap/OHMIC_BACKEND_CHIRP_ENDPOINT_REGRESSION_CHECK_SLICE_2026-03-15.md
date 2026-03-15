Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Chirp Endpoint Regression Check Slice

## Purpose

Define the next narrow backend follow-on after the chirp analysis endpoint has
been proven manually with the Windows analyzer venv.

## Current Truth

`POST /api/measurement/analyze/chirp` now works when:

- backend runs with `OHMIC_CHIRP_ANALYZER_PYTHON` pointing at the dedicated
  Windows venv
- request points at a real local WAV asset
- analyzer runtime uses the reconciled chirp fixture helper flow

## Best Next Step

Turn that manual endpoint proof into one repeatable smoke check artifact, such
as:

- a narrow script under `services/backend/tools/`, or
- a backend smoke test entrypoint, or
- one documented command block that can be rerun without rebuilding the request
  by hand

## Exact Slice Scope

- `services/backend/src/measurementReferenceAnalyzer.ts`
- `services/backend/src/index.ts`
- `services/backend/tools/*` only if needed for a dedicated smoke helper
- `services/backend/README.md`

## Acceptance

- one repeatable endpoint smoke path exists
- runtime/env assumptions are explicit
- no unrelated backend/auth/control-plane work is mixed in
