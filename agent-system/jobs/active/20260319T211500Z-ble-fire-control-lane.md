claim_id: 20260319T211500Z-ble-fire-control-lane
status: active
owner: codex
project: ohmic-audio-labs
task: run-wifi-first-remote-audio-transport-wave
started: 2026-03-19T21:15:00Z
expires: 2026-03-20T03:15:00Z

# Files

- B:\ohmic\repos\ohmic-audio-labs\components\Mobile\AmpLabBleTestSuite.tsx
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\amplab
- B:\ohmic\repos\ohmic-audio-labs\test\services
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\dsp\firmwareContract.ts
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\remote
- B:\ohmic\repos\ohmic-audio-labs\components\Hardware
- B:\ohmic\repos\amplab-firmware\src\main.cpp
- B:\ohmic\repos\amplab-firmware\src\dsp\dsp_state.cpp
- B:\ohmic\repos\amplab-firmware\src\dsp\dsp_state.hpp
- B:\ohmic\repos\amplab-firmware\platformio.ini
- B:\ohmic\docs\roadmap\OHMIC_BLE_SETUP_AUTH_AND_OTA_RUNWAY_WAVE_2026-03-18.md

# Notes

- BLE scan, connect, setup status, setup commands, control-state feedback, and DSP transport parity are now live.
- Fire/mobile BLE card now validates saved profile truth, joined-state truth, Wi-Fi scan settle, and live volume/mute control truth on the Fire surface.
- Live stream runtime validation is complete: `stream.start` reaches `streaming`, `dsp.state.live` continues over BLE, and `stream.stop` returns to `idle` on the real Fire + AmpLab path.
- Live BLE telemetry transport is now validated on the Fire card with explicit `amplab.telemetry` topic flow and stop/start behavior.
- A narrow remote-source bridge now exists in code: the BLE headless build enables the remote DSP/WebSocket client, caches canonical `measure.fft.frame`, and exposes it to the BLE stream layer and Fire card.
- Live board validation is now complete: the headless AmpLab can retarget its remote WebSocket client at runtime, attach to a live upstream FFT producer, and cache canonical `measure.fft.frame` metadata in `api/status/core.runtime.remote_fft`.
- Fire-side proof is now complete on the live device:
  - WebView DevTools automation clicked `SCAN AMP`, selected `OHMIC-AMP-75DC3C`, clicked `CONNECT SELECTED`, and clicked `MEASURE FRAME`
  - the Fire BLE log shows repeated `RX measure.fft.frame`
  - live board status reports `stream.state=streaming`, `stream.reason=ble remote fft stream active`, and `stream.subscribe_topic=measure.fft.frame`
- The fake `measurement_adc` floor is now replaced with a real basic-node source:
  - `OHMIC_HAS_MEASUREMENT_ADC=1` on the live AmpLab envs
  - `setupAnalogADC()` now configures the documented basic-node ADC pins
  - `api/status/core.runtime.measurement_source` now reports live `adc.basic` values and sample counters
  - `amplab.telemetry` now carries live `dc_v` and `sig_in_vrms` from that source
- BLE is now stable enough to stop pretending it should be the primary media lane.
- Next execution priority is the real product path:
  - Wi-Fi is the primary audio transport
  - the remote unit is the source hub for phone Bluetooth, SD, and USB
  - BLE stays responsible for setup, trust, control, rescue, and last-resort fallback
- The shared hardware routing copy is now being aligned to that architecture:
  - AmpLab and StreetHub surfaces describe the remote hub as `Remote Hub (Wi-Fi / HiFi)`
  - bench USB sources remain available but are explicitly framed as bench-node fallback paths
- OTA remains staged behind the same trust/authority floor, but it is not ahead of the Wi-Fi-first audio transport lane.
