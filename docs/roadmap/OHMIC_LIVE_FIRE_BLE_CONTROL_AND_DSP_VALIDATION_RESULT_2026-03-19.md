Date: 2026-03-19
Status: done
Project: ohmic-audio-labs

# Ohmic Live Fire BLE Control And DSP Validation Result

## Summary

The Fire BLE onboarding card now validates real control-state changes on the
live AmpLab board instead of only proving transport or ack delivery.

## What Landed

- live BLE volume changes now settle back into `dsp.state.live`
- live BLE mute changes now settle back into `dsp.state.live`
- unsupported stream actions now surface as explicit runtime truth instead of
  silent failure

## Live Verification

- reused the connected `BLEFIX-20260319-1834` Fire session
- verified `VOLUME DOWN` changes card state from `Volume 100%` to `Volume 95%`
- verified `MUTE ON` changes card state from `Mute off` to `Mute on`
- verified `STREAM START` remains an explicit unsupported gap:
  - `unsupported stream.start`
  - `amplab.control.state vol=95% mute=on stream=missing`

## Evidence

- Fire screenshots:
  - `tmp/fire_control_volume_down.png`
  - `tmp/fire_control_mute_on.png`
  - `tmp/fire_control_stream_start.png`

## Current Live Truth

- BLE control parity is real for:
  - volume
  - mute
- BLE stream control still does not start a source on the live AmpLab runtime
- the remaining gap is now the stream-source/runtime implementation, not BLE
  connect/control transport

## Remaining Gap

- `stream.start` / `stream.stop` still report `stream source not implemented`
- that audio/runtime gap should be the next active BLE lane
