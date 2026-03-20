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
- The runtime audio lane now has a real remote-source selection seam:
  - `media.source.select` is owned by the shared source-policy core
  - `runtime.media_source.upstream` can now report concrete remote sources like `phone.bt`, `sd.local`, and `usb.local`
  - the headless AmpLab runtime now relays that selection toward the remote hub over WebSocket for the Wi-Fi-first path
- The session hub now carries that source truth too:
  - `wsHub` records session-level media source state from `media.source.select` and `sys.status.core`
  - new peers receive the current `mediaSource` in `welcome`
  - session peers receive `media_source_update` when the selected remote source changes
- The client session model now consumes that hub state:
  - `CloudSync` stores the session `mediaSource` from `welcome` and `media_source_update`
  - `HardwareTab` now surfaces the shared remote source label from that session model
- The remote-source loop is now explicit instead of optimistic-only:
  - `wsHub` marks `media.source.select` as a pending session source request
  - `sys.status.core.runtime.media_source` now remains the authoritative confirmed source reflection
  - the shared client session model carries `producer`, `consumer`, and `confirmed`
  - `HardwareTab` shows pending vs confirmed source state plus remote-hub to DSP route ownership
- The DSP-facing workspace now consumes that same shared session route:
  - a shared `RemoteSourceSessionCard` now owns the selector and ownership presentation
  - `DspDeckSummary` now shows the same remote-source state and selector as the hardware tab
  - the DSP consumer view no longer depends on a remote-only UI pocket to understand current source ownership
- The DSP-facing app contract now reads the core runtime seam directly:
  - `services/hardware/dsp/firmwareContract.ts` now accepts `sys.status.core`
  - `DspDeckSummary` now polls that core status alongside graph/network state
  - the DSP workspace now shows:
    - core `runtime.media_source` via the shared route card
    - core `stream.state`, `stream.reason`, and `stream.subscribe_topic`
  - this gives the Wi-Fi-first audio lane an explicit subscriber/runtime view instead of only source-selection state
- The shared audio contract now defines expected DSP subscriber topics per remote source:
  - `audio.remote.phone.bt`
  - `audio.remote.sd`
  - `audio.remote.usb`
  - `audio.remote.main`
  - `DspDeckSummary` now shows that expected topic alongside the actual runtime subscriber state
- The runtime subscriber relay is now moving toward that contract too:
  - shared core source-policy code now maps remote source IDs to expected audio subscriber topics
  - the live runtime now relays `dsp.stream.subscribe` over the existing websocket client whenever the selected remote source changes
  - this keeps source selection and subscriber intent on one shared runtime path instead of separate UI-only and transport-only lanes
- The DSP-target runtime now owns subscriber intent too:
  - shared core `ohmic_core_stream_runtime.*` persists subscriber topic/status for non-BLE runtime targets
  - shared DSP transport no longer rejects `dsp.stream.subscribe` as unsupported
  - the DSP workspace now has an explicit `Apply Expected Topic` action that pushes the expected subscriber topic to the live DSP node
  - the `esp32s3_dsp_headless` environment now builds and flashes cleanly on that shared-core path
- The DSP-target runtime now tracks observed upstream stream activity too:
  - shared core stream runtime records `active_topic`, `last_event_ms`, and `event_count`
  - DSP remote-client event handling promotes stream state from `subscribed` to `streaming` when matching upstream events arrive
  - DSP workspace now shows those runtime-truth fields instead of only the requested subscriber topic
- OTA remains staged behind the same trust/authority floor, but it is not ahead of the Wi-Fi-first audio transport lane.
- The remote-source acknowledgement seam is now tighter too:
  - `wsHub` carries `publishTopic`, `publishState`, and `activeTopic` alongside the selected session media source
  - `media.source.select` now resolves to a concrete expected publish topic immediately
  - `dsp.stream.subscribe` and `sys.status.core.stream.*` now fold back into the same shared session route state
  - the shared remote-route card now shows selected source, ownership, publish topic/state, and active topic on one surface
- DSP playback/runtime truth is now getting a stronger shared-core shape too:
  - shared stream runtime now classifies subscriber and active topics
  - `sys.status.core.stream` now reports `subscribe_class` and `active_class`
  - DSP workspace can distinguish remote program audio lanes from measurement/telemetry lanes instead of only showing raw topic strings
- The hub-side playback truth is tighter now too:
  - matching `audio.remote.*` signal traffic now promotes the shared session media source from `requested/subscribed` to `streaming`
  - session media source state is no longer dependent only on command intent and DSP runtime replies
  - backend coverage now proves that a selected remote source becomes active when matching remote audio traffic is observed
- The DSP workspace now has a shared playback-alignment summary too:
  - expected publish topic
  - session route publish topic/state
  - DSP subscriber topic/class
  - DSP active topic/class
  - one derived alignment status: `aligned`, `subscribed`, `requested`, `mismatch`, or `idle`
- The DSP workspace no longer depends on a manual subscriber-apply step after
  remote source selection:
  - when a shared remote source route is active enough to act on, the workspace
    now auto-applies the expected `dsp.stream.subscribe` topic once
  - it then refreshes `sys.status.core` immediately so the DSP route view reflects
    the new subscriber truth without an extra operator click
- The DSP auto-align rule is now also extracted into shared app transport logic
  and covered by tests, so the route decision is no longer hidden only inside the
  workspace component
- The shared hub media-source state is tighter now too:
  - `sys.status.core` no longer marks remote playback as `streaming` just because
    any active topic exists
  - remote playback is only promoted from core status when the active lane is an
    `audio.program.remote` topic that matches the selected remote publish topic
  - a measurement or telemetry active lane can no longer falsely overwrite the
    selected remote publish topic in shared session state
- That shared media-source object now also carries raw lane evidence:
  - `subscribeTopic`
  - `subscribeClass`
  - `activeTopic`
  - `activeClass`
  - the route card now shows those fields so live audio runs have a cleaner
    operator-facing truth surface
- The DSP workspace now also polls backend `/api/ws/trace` and shows the hub's
  own route view beside the browser/session route view and the DSP runtime view,
  giving the first live audio run a cleaner three-way truth surface
- The compact Fire BLE onboarding card now exposes practical remote-audio source
  controls near the top:
  - `Phone BT`
  - `SD Card`
  - `USB Media`
  - `Refresh Route`
  - each action follows with a core-status refresh so the route can update on-card
