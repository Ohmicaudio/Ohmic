# OHMIC DSP Subscriber Intent Runtime Result

Date: 2026-03-20

## Outcome

The shared DSP transport now accepts and persists `dsp.stream.subscribe` instead of hard-failing it as unsupported.

That closes a real monotype-runtime gap:

- the app can now push expected subscriber intent to a DSP node through the shared transport contract
- the DSP-target runtime reports the accepted subscriber topic back through `sys.status.core.stream`
- the DSP headless environment now builds cleanly on the same shared-core path instead of leaking BLE-only assumptions into the DSP build

## Live validation

- `esp32s3_dsp_headless` build passed
- `esp32s3_dsp_headless` upload passed to `COM27`
- Fire app sync passed
- Fire app `installDebug` passed

## Code seams closed

- shared core stream subscriber state added in `src/core/ohmic_core_stream_runtime.*`
- shared DSP transport now accepts `dsp.stream.subscribe`
- default core status stream fields now read from shared runtime state when a board does not override them
- DSP workspace now has an explicit `Apply Expected Topic` action to push the expected subscriber topic to the live DSP target
- DSP app contract now accepts `dsp.stream.subscribe` envelopes

## Why this matters

This moves the Wi-Fi-first audio lane from “expected topic shown in UI” to “runtime subscriber intent owned by shared transport and visible on the live DSP node.”

It also forced the DSP build to stop depending on BLE-only symbols, which is exactly the kind of cleanup needed for the monotype firmware goal.
