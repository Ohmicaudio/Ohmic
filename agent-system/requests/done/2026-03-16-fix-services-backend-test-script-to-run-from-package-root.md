Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T113000Z-3c2a6d91

# Fix Services Backend Test Script To Run From Package Root

## Goal

Repair `services/backend/package.json` so `npm test` from the package root
targets the real backend test surface.

## Source

- `docs/roadmap/OHMIC_BACKEND_PACKAGE_TEST_ENTRYPOINT_RECOVERY_WAVE_2026-03-16.md`

## Acceptance

- the package-local `test` script runs the correct test target
- the change stays tightly scoped to backend package execution
- no unrelated backend behavior changes are mixed into the repair

## Result

- changed
  `B:\ohmic\repos\ohmic-audio-labs\services\backend\package.json` to run
  `vitest --root ../.. --run test/backend`
- kept the repair tightly scoped to the package-local test entrypoint
