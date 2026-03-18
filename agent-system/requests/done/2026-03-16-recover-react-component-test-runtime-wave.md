Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T153935Z-d13c5722

# Recover React Component Test Runtime Wave

## Goal

Restore a trustworthy React component-test runtime now that the root app code
and test fixture types are back in a green TypeScript state.

## Source

- `docs/roadmap/OHMIC_REACT_COMPONENT_TEST_RUNTIME_RECOVERY_WAVE_2026-03-16.md`

## Focus

- React/Vitest/testing-library runtime compatibility
- targeted hardware component tests first
- broader UI verification after the seam is repaired

## Acceptance

- one explicit component-test runtime family exists in `ready`
- the children are runnable and narrow enough to claim independently
- the family stays verification-oriented instead of drifting into unrelated test
  cleanup

## Result

- narrowed the real failure from a vague React runtime claim to one specific
  hook test file
- repaired the targeted component-test lane in
  `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabDiscoveryTelemetryHooks.test.tsx`
- reran the broader component pack successfully after the targeted repair
