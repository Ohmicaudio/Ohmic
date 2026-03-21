# OHMIC Remote BLE Command Parity Result

Date: 2026-03-20

## What changed

- remote BLE bootstrap now accepts shared route/media commands:
  - `media.source.select`
  - `media.route.preference.set`
- remote `sys.status.core` now includes `runtime.media_source`
- remote BLE bootstrap now reports:
  - `preference_id`
  - `preference_detail`
  - selected remote source upstream
  - expected remote publish topic/class

## Why

The live Fire screenshot showed the remote BLE link was coming up, but route/source button presses were receiving:

- `PM error unknown cmd`
- `RX amplab.ack`

That meant remote BLE bootstrap had connect parity, but not command-surface parity with the shared route/media contract.

## Validation

- `cyd24r` build succeeded locally after the patch
- live flash to `COM16` was attempted twice and blocked both times by a busy/denied serial port

## Remaining blocker

- `COM16` must be freed before the patched remote firmware can be flashed live
