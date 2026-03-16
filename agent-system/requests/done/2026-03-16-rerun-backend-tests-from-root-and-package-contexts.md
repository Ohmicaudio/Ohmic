Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T113000Z-3c2a6d91

# Rerun Backend Tests From Root And Package Contexts

## Goal

Verify the repaired backend lane by rerunning tests from both the root repo
context and the `services/backend` package context.

## Source

- `docs/roadmap/OHMIC_BACKEND_PACKAGE_TEST_ENTRYPOINT_RECOVERY_WAVE_2026-03-16.md`

## Acceptance

- root-context backend test invocation is rerun
- package-context backend test invocation is rerun
- any remaining divergence is recorded explicitly

## Result

- reran `npm run backend:test` from
  `B:\ohmic\repos\ohmic-audio-labs` successfully
- reran `npm test` from
  `B:\ohmic\repos\ohmic-audio-labs\services\backend` successfully after the
  package-local script repair
- remaining divergence is now only operator-facing naming truth: the root lane
  is `backend:test`, not `test:backend`
