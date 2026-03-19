Date: 2026-03-19
Status: done
Project: ohmic-audio-labs

# Ohmic Live Fire BLE Telemetry Transport Result

## Summary

The live Fire BLE lane now carries a second real stream family beyond
control-state updates. The Fire card can start a BLE telemetry stream, receive
repeated `amplab.telemetry` packets, render the latest frame, and stop the
stream back to `idle`.

## What Landed

- Fire/mobile BLE card now exposes an explicit `Telemetry Stream` action
- shared BLE DSP transport helpers now build stream start/stop commands with an
  explicit topic
- AmpLab firmware now publishes compact `amplab.telemetry` frames over BLE when
  the selected stream topic is `amplab.telemetry`
- runtime stream status now reports `reason=ble telemetry stream active` and
  `subscribe_topic=amplab.telemetry` while that stream is active

## Live Verification

- reflashed live AmpLab on `COM19`
- synced and reinstalled the Fire build
- verified Fire card connects on the current bundle and reaches `CONNECTED`
- verified `Telemetry Stream` produces:
  - repeated `RX amplab.telemetry`
  - card control state `Stream streaming (ble telemetry stream active)`
  - on-card telemetry summary `DC 0.0V / 0.0A`, `Power 0.0W`, and control bits
- verified `STREAM STOP` returns the card and firmware status to `idle`
- verified firmware status live:
  - `stream.state=streaming`
  - `stream.reason=ble telemetry stream active`
  - `stream.subscribe_topic=amplab.telemetry`

## Current Live Truth

- BLE stream transport is no longer limited to control-state `dsp.state.live`
- Fire can validate both control-state and telemetry-topic BLE streaming on the
  real AmpLab board
- this is still telemetry-first rather than true audio-frame transport, which is
  the next honest follow-on slice
