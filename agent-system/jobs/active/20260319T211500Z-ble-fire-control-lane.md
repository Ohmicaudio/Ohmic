claim_id: 20260319T211500Z-ble-fire-control-lane
status: active
owner: codex
project: ohmic-audio-labs
task: validate-live-fire-ble-measure-frame-on-amplab
started: 2026-03-19T21:15:00Z
expires: 2026-03-20T03:15:00Z

# Files

- B:\ohmic\repos\ohmic-audio-labs\components\Mobile\AmpLabBleTestSuite.tsx
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\amplab
- B:\ohmic\repos\ohmic-audio-labs\test\services
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\dsp\firmwareContract.ts
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
- The local ADC path is still absent on headless AmpLab, and `measurement_adc` stays disabled.
- A narrow remote-source bridge now exists in code: the BLE headless build enables the remote DSP/WebSocket client, caches canonical `measure.fft.frame`, and exposes it to the BLE stream layer and Fire card.
- Live board validation is now complete: the headless AmpLab can retarget its remote WebSocket client at runtime, attach to a live upstream FFT producer, and cache canonical `measure.fft.frame` metadata in `api/status/core.runtime.remote_fft`.
- Current active packet is the remaining Fire-side proof: validate the BLE card can request and render that bridged `measure.fft.frame` stream end to end on the live device.
