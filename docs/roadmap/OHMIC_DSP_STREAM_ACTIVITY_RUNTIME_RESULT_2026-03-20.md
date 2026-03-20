# OHMIC DSP Stream Activity Runtime Result

Date: 2026-03-20

## Outcome

The DSP node now distinguishes subscriber intent from observed upstream stream activity.

The shared runtime path now:

- accepts a subscriber topic
- reports `subscribed` while waiting for upstream frames
- flips to `streaming` when matching upstream events are actually observed
- records `active_topic`, `last_event_ms`, and `event_count`

## Live validation

- app `type-check` passed
- Vitest passed:
  - `dspFirmwareContract.test.ts`
  - `dspNetworkCommandClient.test.ts`
  - `amplabBleSupport.test.ts`
- `esp32s3_dsp_headless` build passed
- `esp32s3_dsp_headless` upload passed to `COM27`
- Fire app sync passed
- Fire app install passed

## Code seams closed

- shared stream runtime now tracks observed event activity in `src/core/ohmic_core_stream_runtime.*`
- DSP remote-client state reports real observed activity through `sys.status.core.stream`
- `dsp_state_subscribe_stream()` now keeps shared runtime subscriber state aligned with local startup subscriptions
- DSP workspace now renders:
  - `active_topic`
  - `last_event_ms`
  - `event_count`

## Why this matters

This moves the audio lane one step closer to actual playback truth:

- before: the DSP node only knew what topic it had been asked to subscribe to
- now: the DSP node can also report whether matching upstream events have actually started arriving

That gives us a much better runtime truth surface for the upcoming remote-hub to DSP playback closure.
