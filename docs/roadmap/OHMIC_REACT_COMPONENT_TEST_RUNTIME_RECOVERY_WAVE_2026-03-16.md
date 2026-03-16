Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic React Component Test Runtime Recovery Wave

## Purpose

Restore a truthful React component test runtime after the root TypeScript floor
was repaired and the remaining verification blocker collapsed to `React.act is
not a function`.

## Included Outputs

- `B:\ohmic\agent-system\requests\done\2026-03-16-recover-react-component-test-runtime-wave.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-pin-down-react-act-compat-break-between-react-vitest-and-testing-library.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-restore-targeted-hardware-component-vitest-runtime-after-act-fix.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-rerun-broader-ui-test-pack-and-record-remaining-runtime-breaks.md`

## Unified Outcome

The repo now has a green root type-check, but component-test verification is
still not trustworthy because the runtime harness breaks before the asserted
behavior is exercised.

This wave restores the next honest verification floor:

- identify the compat mismatch
- repair the targeted runtime seam
- rerun the hardware-focused pack
- then widen to a broader UI pass and record what still fails

## Most Important Truth

The current blocker is no longer TypeScript contract drift.

It is runtime harness incompatibility between the current React stack and the
test layer.

## Diagnosis

- The current package state does **not** reproduce `React.act is not a function`.
- `npx vitest run test/components/AmpLabControlHost.test.tsx` passed immediately,
  which disproved a global React/Vitest export incompatibility.
- The real failing surface was narrowed to
  `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabDiscoveryTelemetryHooks.test.tsx`.
- That file had two context mismatches after the Live Link split:
  - manual discovery tests were mounted with `activeDevice: 'AMPLAB'`, which
    re-enabled background auto-probing on mount and produced timeout/`act(...)`
    warning noise
  - the HTTP fallback stream test was mounted with `activeDevice: 'OTHER'`,
    which prevented the AmpLab stream path from starting at all
- The no-reachable-device case also needed one explicit stored-IP mock so it
  exercised the fallback selection path without kicking off a broad sweep.

## Repair

- Restored the manual discovery tests in
  `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabDiscoveryTelemetryHooks.test.tsx`
  to the non-auto-probing context they actually intend to cover.
- Restored the telemetry fallback test to `activeDevice: 'AMPLAB'` so the HTTP
  stream path is exercised honestly.
- Added a bounded stored-IP mock in the no-device fallback case so the test
  stays focused on fallback selection instead of broad network sweep behavior.

## Verification

- `npx vitest run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`
  - passed: `1` file, `5` tests
- `npm run test:components`
  - passed: `17` files, `63` tests
