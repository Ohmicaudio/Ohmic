Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T113000Z-3c2a6d91

# Recover Backend Package Local Test Entrypoint Wave

## Goal

Restore a truthful backend package-local test lane so the service can be
verified from both the repo root and `services/backend`.

## Source

- `docs/roadmap/OHMIC_BACKEND_PACKAGE_TEST_ENTRYPOINT_RECOVERY_WAVE_2026-03-16.md`

## Focus

- backend package script consistency
- root-vs-package invocation truth
- bounded verification after the script seam is repaired

## Acceptance

- one explicit backend test-entrypoint family exists in `ready`
- the children are narrow enough to claim independently
- the lane stays focused on packaging and verification truth, not backend
  feature work

## Result

- recorded the root-vs-package mismatch in
  `B:\ohmic\docs\roadmap\OHMIC_BACKEND_PACKAGE_TEST_ENTRYPOINT_RECOVERY_WAVE_2026-03-16.md`
- repaired `B:\ohmic\repos\ohmic-audio-labs\services\backend\package.json` so
  package-local `npm test` re-roots Vitest to the repo root
- reran the backend test lane successfully from both the repo root and the
  package root
