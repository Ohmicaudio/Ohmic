Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T153935Z-d13c5722

# Restore Targeted Hardware Component Vitest Runtime After Act Fix

## Goal

Repair the component-test runtime enough to run the targeted hardware-focused
Vitest pack that was previously blocked by the `React.act` failure.

## Source

- `docs/roadmap/OHMIC_REACT_COMPONENT_TEST_RUNTIME_RECOVERY_WAVE_2026-03-16.md`

## Focus

- test runtime setup
- targeted hardware component suite
- honest pass/fail reporting after the harness fix

## Acceptance

- the targeted hardware component pack runs past the prior `React.act` runtime
  crash
- any remaining failures are behavioral or fixture-level, not harness startup
- the result is recorded honestly

## Result

- the targeted hardware-focused hook lane now runs cleanly
- `npx vitest run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`
  passes after restoring the intended test contexts
- the earlier crash claim is no longer the truthful failure description
