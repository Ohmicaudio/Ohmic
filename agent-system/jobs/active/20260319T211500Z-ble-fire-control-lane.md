claim_id: 20260319T211500Z-ble-fire-control-lane
status: active
owner: codex
project: ohmic-audio-labs
task: validate-live-ble-control-and-dsp-actions-on-fire
started: 2026-03-19T21:15:00Z
expires: 2026-03-20T03:15:00Z

# Files

- B:\ohmic\repos\ohmic-audio-labs\components\Mobile\AmpLabBleTestSuite.tsx
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\amplab
- B:\ohmic\repos\ohmic-audio-labs\test\services
- B:\ohmic\repos\amplab-firmware\src\main.cpp
- B:\ohmic\docs\roadmap\OHMIC_BLE_SETUP_AUTH_AND_OTA_RUNWAY_WAVE_2026-03-18.md

# Notes

- BLE scan, connect, setup status, setup commands, control-state feedback, and DSP transport parity are now live.
- Fire/mobile BLE card now validates saved profile truth, joined-state truth, and Wi-Fi scan settle on the live Fire surface.
- Current active packet is the next live control/DSP validation pass over the same BLE lane.
