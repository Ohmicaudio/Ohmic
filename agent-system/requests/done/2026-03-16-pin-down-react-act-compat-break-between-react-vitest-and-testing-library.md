Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T153935Z-d13c5722

# Pin Down React Act Compat Break Between React Vitest And Testing Library

## Goal

Identify the exact runtime compatibility seam causing `React.act is not a
function` in the current component-test harness.

## Source

- `docs/roadmap/OHMIC_REACT_COMPONENT_TEST_RUNTIME_RECOVERY_WAVE_2026-03-16.md`

## Focus

- React version and export behavior
- Vitest environment/setup layer
- `@testing-library/react` compatibility expectations

## Acceptance

- the failing seam is narrowed to a concrete dependency, setup, or import layer
- the diagnosis is based on current runtime behavior and package state
- the next repair step is obvious and bounded

## Result

- confirmed the current repo no longer reproduces `React.act is not a function`
- narrowed the remaining break to test-context drift inside
  `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabDiscoveryTelemetryHooks.test.tsx`
- made the next repair step obvious: restore the intended active-device context
  in that targeted hook test file
