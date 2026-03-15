Status: verification_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Chirp Endpoint Regression Check

## What Changed

Added a reusable backend smoke helper:

- `services/backend/tools/smoke-chirp-endpoint.mjs`

And exposed it as a backend-local package command:

- `npm run measure:chirp:endpoint-smoke`

## Smoke Contract

The helper:

- generates a real chirp WAV fixture with the existing Python generator
- posts that WAV to `POST /api/measurement/analyze/chirp`
- verifies the live response shape, runtime metadata, and basic timing report
- fails fast with an explicit request timeout instead of hanging indefinitely

## Runtime Assumptions

- backend is already running
- backend was started with `OHMIC_CHIRP_ANALYZER_PYTHON` set to a valid Python
  runtime for `chirp_analyzer.py`
- the helper may reuse that same value through
  `--expected-python` or `OHMIC_CHIRP_ANALYZER_PYTHON`

## Verification

Verified on 2026-03-15 with:

- `node tools/smoke-chirp-endpoint.mjs --help`
- `npm run build` in `services/backend`
- one real endpoint smoke against a local backend instance started with:
  - `OHMIC_BACKEND_AUTOSTART=0`
  - `OHMIC_CHIRP_ANALYZER_PYTHON=C:\Python313\python.exe`

Observed live result:

- `statusCode: 200`
- `runtime.python_command: C:\Python313\python.exe`
- `report.timing.paired_event_count: 11`
- `report.timing.initial_offset_ms: 7`
- `report.timing.drift_ppm: 0`

## Useful Note

The first in-process verification attempt hit a stale compiled `dist/index.js`
without the chirp route. Rebuilding `services/backend` fixed that and the smoke
then passed cleanly.
