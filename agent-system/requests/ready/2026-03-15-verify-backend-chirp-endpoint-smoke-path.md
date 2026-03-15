Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify Backend Chirp Endpoint Smoke Path

## Goal

Run one narrow backend endpoint smoke check for `POST /api/measurement/analyze/chirp`
using the now-proven chirp analyzer runtime.

## Source

- `docs/roadmap/OHMIC_BACKEND_CHIRP_ENDPOINT_SMOKE_SLICE_2026-03-15.md`

## Focus

- `measurementReferenceAnalyzer.ts`
- endpoint invocation through backend code
- exact runtime/env wiring

## Acceptance

- endpoint path is exercised once
- success or exact failure is recorded honestly
- helper/tool truth remains the reference baseline
