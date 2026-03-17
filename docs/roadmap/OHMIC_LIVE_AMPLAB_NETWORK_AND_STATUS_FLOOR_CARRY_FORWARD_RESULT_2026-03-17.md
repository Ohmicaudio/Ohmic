Date: 2026-03-17
Status: done
Project: firmware

# Ohmic Live AmpLab Network And Status Floor Carry-Forward Result

## Summary

The live AmpLab shared-runtime branch now carries the minimum working LAN/AP and
status floor forward without regressing the live device below current operator
expectations.

## What Landed

- `esp32s3` now builds with AmpLab-specific shared-runtime profile flags instead
  of generic `OHMIC_*` defaults
- `/api/status` now serves the intended hybrid legacy-plus-shared payload on the
  live AmpLab
- `/api/status/core` now serves the pure shared-core payload instead of being
  swallowed by the legacy prefix route
- `/api/wifi/status`, `/api/wifi/profiles`, and `/api/wifi/scan` now exist on
  the shared-runtime branch as a carried-forward minimum floor
- station plus AP truth is refreshed from live runtime state instead of static
  defaults

## Live Verification

- flashed live AmpLab on `COM27`
- verified `http://192.168.1.113/api/status`
- verified `http://192.168.1.113/api/status/core`
- verified `http://192.168.1.113/api/wifi/status`
- verified `./tools/pio run -e cyd_2432s028_display`

## Current Live Truth

- runtime role now reports `master`
- default network mode now reports `peer_lan_live`
- live station IP reports `192.168.1.113`
- legacy device name now resolves as `AmpLab-D4DB1C`
- `/api/status/core` now reports schema `ohmic.firmware.core.status.v1`

## Remaining Gap

The Wi-Fi profile and enrollment surface is still only a floor. The next real
carry-forward slice is profile persistence, selection, scan results, and
connect/recovery actions over the shared runtime.
