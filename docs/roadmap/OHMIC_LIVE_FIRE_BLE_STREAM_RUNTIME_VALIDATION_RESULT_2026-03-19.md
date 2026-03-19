Date: 2026-03-19
Status: done
Project: amplab-firmware

# Ohmic Live Fire BLE Stream Runtime Validation Result

## Summary

The live Fire BLE lane is no longer stuck at `stream source not implemented`.
The real AmpLab board now accepts BLE `stream.start` and `stream.stop`, reports
stream runtime truth through shared status, and continues `dsp.state.live`
frames while streaming.

## What Landed

- AmpLab firmware now exposes runtime stream truth through
  `ohmic_core_runtime_stream_*` hooks instead of a hardcoded unsupported stub
- BLE `stream.start`, `stream.stop`, and `dsp.stream.subscribe` now drive a
  real control-state stream runtime on the headless AmpLab board
- active BLE streaming now emits periodic `dsp.state.live` packets on the live
  Fire path
- Fire/mobile BLE surface now shows stream state moving between `idle` and
  `streaming` on the real device

## Live Verification

- reflashed live AmpLab on `COM19`
- verified HTTP status before reconnect:
  - `stream.state=idle`
  - `stream.available=true`
  - `stream.transport=ble`
- validated on the real Fire card:
  - `STREAM START` changes stream state to `streaming`
  - repeated `RX dsp.state.live` arrives while streaming
  - control state renders `Stream streaming (ble control-state stream active)`
  - `STREAM STOP` returns stream state to `idle`
  - card log shows `ok stream.stop` plus `amplab.control.state` idle truth

## Artifacts

- `tmp/fire_stream_started.png`
- `tmp/fire_stream_stopped.png`

## Current Live Truth

- BLE stream runtime is now a real validated control-state stream on the live
  Fire + AmpLab path
- this closes the old stream-source/runtime gap
- this is still not true audio transport parity yet; it is the stable floor for
  the next telemetry or audio follow-on slice
