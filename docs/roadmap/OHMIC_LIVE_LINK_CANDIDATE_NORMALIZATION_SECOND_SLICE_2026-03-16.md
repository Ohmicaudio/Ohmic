Status: implementation_note
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Live Link Candidate Normalization Second Slice

## Scope

Close the first repair-oriented follow-through after the base `Ohmic Live Link`
extraction.

## What Changed

In `services/ohmicLiveLink/ConnectionManager.ts`:

- candidate ordering now prefers explicit reachable LAN IPs before the firmware
  AP address and alias-only hostnames
- reserved AP identity `192.168.4.1` survives as the no-reach fallback ahead of
  stale aliases
- quiet discovery stays narrow on first load, while manual refresh can broaden
  the sweep when AP truth is the only explicit target

In `components/Hardware/useDeviceLinkPlane.ts`:

- the first live-link probe is now quiet-first so the shell can render before a
  broad sweep
- candidate sorting is delegated to the shared connection-manager comparator

In `components/Hardware/useAmpLabDiscoveryPlane.ts`:

- HTTP target hints always include the ESP32 AP endpoint `http://192.168.4.1`
- the registry base and stored `amplab_ip` value are preserved as explicit
  fallback hints

In `test/services/ohmicLiveLinkConnectionManager.test.ts`:

- added regression coverage for AP-only quiet/manual discovery behavior
- added regression coverage for explicit LAN-vs-AP-vs-alias ordering
- added regression coverage for reserved AP fallback selection

## Verification

Ran:

- `npm run build`
- `npx vitest run test/services/ohmicLiveLinkConnectionManager.test.ts`
- `npx vitest run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`

Result:

- build passed
- `ohmicLiveLinkConnectionManager` passed `8` tests
- `AmpLabDiscoveryTelemetryHooks` still times out in `4` older hook tests and
  is not treated as resolved by this slice

## Current Boundary

- desktop direct requests to `http://192.168.1.113/api/status` and
  `http://192.168.4.1/api/status` both timed out during closeout
- the Fire tablet is back on `adb`, but no honest post-fix phone-side link pass
  was recorded while the live device endpoints were timing out

## Remaining Work

- rerun the bounded phone-assisted AmpLab smoke flow when the live endpoint is
  reachable again
- align the older discovery telemetry fixture tests to the current contract in
  the separate fixture-alignment lane
