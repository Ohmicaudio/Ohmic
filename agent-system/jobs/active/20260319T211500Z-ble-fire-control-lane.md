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
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\audioTransport.ts
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\sourceArbitration.ts
- B:\ohmic\repos\ohmic-audio-labs\services\ohmicLiveLink
- B:\ohmic\repos\ohmic-audio-labs\services\backend\src\wsHub.ts
- B:\ohmic\repos\ohmic-audio-labs\test\services
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\dsp\firmwareContract.ts
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
  - the DSP unit is the primary consumer of the digital audio stream
  - the remote unit is the source hub for phone Bluetooth, SD, and USB
  - BLE stays responsible for setup, trust, control, rescue, and last-resort fallback
- The shared hardware routing copy is now being aligned to that architecture:
  - AmpLab and StreetHub surfaces describe the remote hub as `Remote Hub (Wi-Fi / HiFi)`
  - bench USB sources remain available but are explicitly framed as bench-node fallback paths
- The shared status contract is now being aligned too:
  - `sys.status.core.runtime.media_source` is the next explicit source-arbitration seam
  - Fire BLE parsing/render now accepts that object alongside `measurement_source` and `remote_fft`
- The generic source/transport presentation is no longer just living inside the AmpLab shell:
  - the hardware surface now uses a shared `MediaSourceStatusCard`
  - the remaining `AmpLab*` transport mentions are state/adapters and live-device plumbing, not generic routing ownership
- The shared source-arbitration model is now explicit in app code:
  - `services/hardware/sourceArbitration.ts` drives source options, default transport labels, and friendly media-source presentation
  - the hardware workspace and Fire BLE card now read from that same shared model instead of duplicating raw labels
- The Wi-Fi-first audio lane now has one explicit shared contract seam too:
  - `services/hardware/audioTransport.ts` defines the shared remote-audio source catalog and media-source presentation contract
  - that contract is the handoff point between remote-hub media ownership, DSP consumer expectations, and web/Fire status presentation
- The runtime status contract is now being tightened to match:
  - `runtime.media_source` is carrying explicit producer / consumer / route-class semantics instead of only a generic upstream string
  - remote-hub Wi-Fi / HiFi primary routing and local bench fallback can now be represented by one normalized status shape
- The shared source-arbitration controls are now backed by real firmware-owned state:
  - `leader.auto_master.set`, `leader.prefer_mobile_first.set`, `leader.priority.set`, and `leader.source_policy.set` now apply on the headless AmpLab runtime
  - `sys.status.core` now carries matching `leadership` and `provisioning` objects so the web workspace and Fire BLE path can read real source-policy state instead of UI defaults
- The companion join-policy controls are now part of that same runtime-owned seam:
  - `network.router.set`, `network.auto_join.set`, `network.helper_scan.set`, `network.discovery.scan`, `network.join.request`, and `network.join.reset` now apply on the headless AmpLab runtime too
  - `sys.status.core.provisioning` now carries the join-request timing and helper-scan fields that the hardware control surface was already prepared to display
- The policy runtime is no longer stranded in the board file:
  - shared `leadership` / `provisioning` policy helpers now live in `src/core/ohmic_core_source_policy.*`
  - `main.cpp` is back to being the board integration surface that calls into shared policy logic
- The matching runtime transport dispatch is moving with it:
  - source-policy websocket/serial handling now routes through shared core dispatch instead of a `main.cpp` custom request block
- The BLE command path now matches that extraction too:
  - source-policy and join-policy BLE topics route through the same shared core dispatcher instead of duplicated ladders in both BLE callback implementations
- OTA remains staged behind the same trust/authority floor, but it is not ahead of the Wi-Fi-first audio transport lane.
