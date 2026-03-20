Date: 2026-03-18
Status: ready
Project: ohmic-audio-labs

# Ohmic BLE Setup Auth And OTA Runway Wave

## Why

BLE discovery, pairing, trust, and first-time setup never became one canonical
device workflow. OTA also has no proper home yet. It should not be built as a
special updater side path.

The next correct runway is:

- BLE setup/auth first
- shared network/bootstrap truth second
- OTA capability immediately after on the same trust/authority floor

## Target

- define BLE discovery and pairing truth
- define pre-trust vs post-trust device identity exposure
- define BLE operator authority and auth mapping to LAN/web surfaces
- define Wi-Fi/bootstrap handoff over BLE and recovery paths
- stage OTA as a capability over that trusted shared command model

## Current Priority Shift

- BLE is now stable enough for scan, connect, setup, control, telemetry, and
  remote FFT validation on the live Fire + AmpLab path
- the next main execution lane is no longer "more BLE as media transport"
- current product priority is:
  - Wi-Fi-first audio transport
  - remote-unit source arbitration for phone Bluetooth, SD, and USB
  - BLE as setup/control/fallback
  - OTA after the shared trust/authority and media-control floor

## Rules

- command-first and surface-agnostic
- no one-off mobile-only pairing logic
- no OTA flow that invents a separate authority model
- public designator is operator-facing identity
- stronger canonical identity and trust state live underneath it

## Child Requests

- `2026-03-18-run-ble-setup-auth-and-ota-runway-wave.md`
- `2026-03-18-define-ble-pairing-trust-and-authority-floor.md`
- `2026-03-18-extract-shared-amplab-ble-contract-and-transport-foundation.md`
- `2026-03-18-define-ble-bootstrap-and-recovery-network-handoff.md`
- `2026-03-18-stage-ota-capability-over-shared-trust-and-command-contract.md`
- `2026-03-19-close-ble-control-state-vs-runtime-status-parity.md`
- `2026-03-19-validate-ble-profile-select-and-join-on-live-amplab.md`
- completed: `2026-03-19-extend-ble-control-lane-toward-audio-transport-parity.md`
- completed: `2026-03-19-close-live-ble-stream-source-gap-on-amplab.md`
- completed: `2026-03-19-prototype-live-ble-audio-telemetry-transport-on-amplab.md`
- `2026-03-19-prototype-live-ble-measurement-frame-transport-on-amplab.md`
- `2026-03-19-wire-real-amplab-measurement-source-for-ble-transport.md`
- `2026-03-19-validate-live-remote-fft-frame-bridge-on-amplab.md`
- `2026-03-20-run-wifi-first-remote-audio-transport-wave.md`
