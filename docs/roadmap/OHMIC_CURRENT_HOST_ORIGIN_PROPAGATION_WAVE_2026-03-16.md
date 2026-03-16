Status: completed_wave
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Current Host Origin Propagation Wave

## Purpose

Push the current live host identity through the app's link/origin surfaces so
host rollover does not leave QR, deep-link, or host-origin state stuck on stale
LAN identities.

## Why This Exists

The host-side rerun proved the live desktop moved from stale `192.168.1.91` to
current `192.168.1.115`. That is enough to justify a focused propagation lane.

## Included Outputs

- `B:\ohmic\agent-system\requests\done\2026-03-16-retarget-current-host-origin-propagation-wave.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-prefer-current-backend-status-preferredip-over-stale-host-hints.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-add-host-origin-rollover-coverage-for-link-device-origins.md`
- `B:\ohmic\repos\ohmic-audio-labs\services\linkDeviceOrigins.ts`
- `B:\ohmic\repos\ohmic-audio-labs\test\services\linkDeviceOrigins.test.ts`

## Unified Outcome

The app should stop carrying forward stale host identities when backend status
already knows the current preferred LAN host.

## Implementation

- `buildRankedLanHosts()` now treats backend status as authoritative when it
  has current LAN hosts
- stale browser or sync-origin host hints are no longer carried forward when
  backend status already names the current preferred host
- host rollover coverage is now pinned in
  `test/services/linkDeviceOrigins.test.ts`

## Verification

- `npx vitest run test/services/linkDeviceOrigins.test.ts`
