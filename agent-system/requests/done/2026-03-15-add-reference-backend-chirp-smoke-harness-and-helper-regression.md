Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T014107Z-51f66d46

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

## Result

- added a focused backend regression for `/api/measurement/analyze/chirp`
  covering both the explicit `analyzer_script_missing` failure and a bounded
  successful reference-runtime path using a fake external analyzer
- added helper-contract regression coverage for the chirp smoke helper and the
  PowerShell/bootstrap entrypoints so the usage surface and expected contract
  cannot silently drift
- verified:
  - `npx vitest run test/backend/measurementAnalyzeChirpEndpoint.test.ts test/backend/chirpToolingContract.test.ts`
  - `npm run backend:type-check`
  - `node services/backend/tools/smoke-chirp-endpoint.mjs --help`
