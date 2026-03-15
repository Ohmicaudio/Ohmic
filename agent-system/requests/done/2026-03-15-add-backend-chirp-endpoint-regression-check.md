Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T200641Z-b0fae27b

# Add Backend Chirp Endpoint Regression Check

## Goal

Add one repeatable smoke artifact for the now-working chirp analysis endpoint.

## Source

- `docs/roadmap/OHMIC_BACKEND_CHIRP_ENDPOINT_REGRESSION_CHECK_SLICE_2026-03-15.md`

## Focus

- repeatable request shape
- explicit runtime/env wiring
- no broad backend test harness expansion

## Acceptance

- one reusable chirp endpoint smoke path exists
- manual shell reconstruction is no longer required

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\repos\ohmic-audio-labs\services\backend\tools\smoke-chirp-endpoint.mjs`
- `B:\ohmic\repos\ohmic-audio-labs\services\backend\package.json`
- `B:\ohmic\docs\roadmap\OHMIC_BACKEND_CHIRP_ENDPOINT_REGRESSION_CHECK_2026-03-15.md`

Result:

- the chirp endpoint now has a reusable smoke helper with explicit runtime and
  timeout wiring
- `npm run measure:chirp:endpoint-smoke` is available inside
  `services/backend`
- a real local endpoint run returned `200` with the expected runtime metadata
  and timing report shape
