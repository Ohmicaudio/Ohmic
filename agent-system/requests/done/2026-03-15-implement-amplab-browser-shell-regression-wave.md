Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T012028Z-8af7ea69

# Implement AmpLab Browser Shell Regression Wave

## Goal

Execute the grouped browser-shell regression packet for AmpLab so shell route,
deck readiness, discovery telemetry, and linked/current-device presentation
travel together.

## Source

- `docs/roadmap/OHMIC_AMPLAB_BROWSER_SHELL_REGRESSION_WAVE_2026-03-15.md`

## Focus

- shell route smoke
- deck body readiness
- discovery telemetry regression
- linked/current-device shell regression

## Acceptance

- one grouped regression packet lands
- browser shell behavior is covered as one lane instead of separate microchecks
- one live browser rerun is obvious after the packet lands

## Result

- updated the AmpLab browser shell smoke to the current shell frame in
  `e2e/amplab-shell.spec.ts` instead of the stale removed header copy
- expanded the grouped regression packet so linked/current-device, shell route,
  deck readiness, and discovery fallback all travel together across the
  existing AmpLab component tests
- verified:
  - `npx vitest run test/components/HardwareLayoutAmpLabShell.test.tsx test/components/AmpLabDeckContentHost.test.tsx test/components/AmpLabHardwareDeckPanel.test.tsx test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`
  - `npx playwright test e2e/amplab-shell.spec.ts`
