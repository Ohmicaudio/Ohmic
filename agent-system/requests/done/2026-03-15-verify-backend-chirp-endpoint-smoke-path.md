Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: codex
Claim ID: 20260315T194200Z-c4da1a7f

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

## Outcome

Completed on 2026-03-15.

Result:

- backend dev server started successfully in the Windows Node shell with
  `OHMIC_CHIRP_ANALYZER_PYTHON` pointed at the dedicated chirp analyzer venv
- `POST /api/measurement/analyze/chirp` returned `ok: true`
- runtime resolved correctly to the Windows venv interpreter and the local
  reconciled smoke fixture WAV
- endpoint report matched the proven tool-level baseline:
  - `paired_event_count: 11`
  - `initial_offset_ms: 7`
  - `drift_ppm: 0`

## Verification

- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && set OHMIC_CHIRP_ANALYZER_PYTHON=B:\ohmic-local\runtime\chirp-analyzer-venv-win\Scripts\python.exe && set OHMIC_BACKEND_PORT=8791 && set OHMIC_BACKEND_HOST=127.0.0.1 && C:\PROGRA~1\nodejs\npm.cmd --prefix services\backend run dev"`
- Windows PowerShell `Invoke-RestMethod` POST to `http://127.0.0.1:8791/api/measurement/analyze/chirp`

## Follow-On

- `B:\ohmic\docs\roadmap\OHMIC_BACKEND_CHIRP_ENDPOINT_REGRESSION_CHECK_SLICE_2026-03-15.md`
