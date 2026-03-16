Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Backend Package Test Entrypoint Recovery Wave

## Purpose

Repair the backend package-local test entrypoint so service-level work can be
run truthfully from both the repo root and the package root.

## Included Outputs

- `B:\ohmic\agent-system\requests\done\2026-03-16-recover-backend-package-local-test-entrypoint-wave.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-audit-backend-package-vs-root-test-path-divergence.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-fix-services-backend-test-script-to-run-from-package-root.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-rerun-backend-tests-from-root-and-package-contexts.md`

## Unified Outcome

The backend code already has a healthier verification surface than the app
shell, but the package-local `test` script is not self-consistent. This wave
restores trust in the backend lane by:

- documenting the path mismatch
- fixing the package-local invocation
- rerunning tests from both operating contexts

## Most Important Truth

This is not a backend logic failure. It is a packaging and operator-trust seam.

## Audit Findings

- The repo-root backend lane is healthy at `npm run backend:test`, which expands
  to `npm run test -- --run test/backend` from
  `B:\ohmic\repos\ohmic-audio-labs`.
- The package-local backend lane was broken because
  `B:\ohmic\repos\ohmic-audio-labs\services\backend\package.json` ran
  `vitest --run test/backend` from the package root, where no local
  `test\backend` tree exists.
- The real backend tests live under
  `B:\ohmic\repos\ohmic-audio-labs\test\backend`.

## Repair

- The package-local `test` script now runs
  `vitest --root ../.. --run test/backend` so package-root execution reuses the
  real repo-root Vitest surface instead of searching for nonexistent local test
  files.
- No root script change was needed because `npm run backend:test` was already
  truthful and passing.

## Verification

- `npm run backend:test` from `B:\ohmic\repos\ohmic-audio-labs`
  - passed: `18` files, `49` tests
- `npm test` from `B:\ohmic\repos\ohmic-audio-labs\services\backend`
  - passed after the script repair by re-rooting Vitest to the repo root
