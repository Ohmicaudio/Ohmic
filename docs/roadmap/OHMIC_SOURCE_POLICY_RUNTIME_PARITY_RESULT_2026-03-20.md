Date: 2026-03-20
Status: done
Project: amplab-firmware

# Ohmic Source Policy Runtime Parity Result

## Summary

The shared source-policy controls that already existed in the web workspace are
now backed by live firmware-owned state on the headless AmpLab runtime.

## Completed

- `leader.auto_master.set` now applies on firmware
- `leader.prefer_mobile_first.set` now applies on firmware
- `leader.priority.set` now applies on firmware
- `leader.source_policy.set` now applies on firmware
- `network.router.set` now applies on firmware
- `network.auto_join.set` now applies on firmware
- `network.helper_scan.set` now applies on firmware
- `network.discovery.scan` now applies on firmware
- `network.join.request` now applies on firmware
- `network.join.reset` now applies on firmware
- `sys.status.core` now reports:
  - `leadership`
  - `provisioning`
- the status payload now includes:
  - desktop/android/apple source enable flags
  - embedded/desktop/android/apple priorities
  - policy revision
  - assigned source / assigned priority
  - join-state summary
  - router / target AP summary
  - join-request timing and helper-scan flags

## Why This Matters

- the web workspace and Fire BLE path no longer need to rely on baked UI
  defaults for source-policy state
- source arbitration now has a real firmware truth source before deeper
  Wi-Fi-first audio work continues
- the next audio lane can build on actual route ownership and policy state
  instead of placeholder presentation only
- the proven policy logic is now extracted into shared core files instead of
  remaining trapped in the AmpLab board entrypoint
- the runtime transport layer now dispatches source-policy commands through
  shared core code too, reducing `main.cpp` special-casing further
- the BLE command path now routes those same source-policy and join-policy
  topics through the shared core dispatcher too, keeping transport behavior
  aligned across BLE and websocket/serial

## Verification

- `npm run type-check`
- `npx vitest run test/services/amplabBleSupport.test.ts test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx`
- `pio run -e esp32s3_ble_headless`
- live flash to `COM19`

## Next

- wire real remote-side source selection behavior onto this runtime-owned policy
- continue the Wi-Fi-first audio path with remote producer to DSP consumer
  ownership
