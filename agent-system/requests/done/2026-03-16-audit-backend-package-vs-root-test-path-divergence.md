Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T113000Z-3c2a6d91

# Audit Backend Package Vs Root Test Path Divergence

## Goal

Record the exact mismatch between the root backend test invocation and the
`services/backend` package-local `test` script.

## Source

- `docs/roadmap/OHMIC_BACKEND_PACKAGE_TEST_ENTRYPOINT_RECOVERY_WAVE_2026-03-16.md`

## Acceptance

- the current root invocation path is recorded
- the package-local invocation path is recorded
- the mismatch is described concretely enough to fix without guesswork

## Result

- recorded that the root lane already runs truthfully at
  `npm run backend:test`
- recorded that the package-local lane was pointing at nonexistent local
  `test\backend` files from `services\backend`
- recorded that the real backend tests live under
  `B:\ohmic\repos\ohmic-audio-labs\test\backend`
