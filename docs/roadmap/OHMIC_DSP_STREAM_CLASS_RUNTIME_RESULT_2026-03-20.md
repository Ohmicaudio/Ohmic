# OHMIC DSP Stream Class Runtime Result

Date: 2026-03-20

## Outcome

The shared DSP stream runtime now classifies the lane behind the current topic,
so the node can report whether it is dealing with remote program audio,
measurement traffic, telemetry, or DSP-state traffic.

## Completed

- shared core stream runtime now derives:
  - `subscribe_class`
  - `active_class`
- current class mapping includes:
  - `audio.remote.* -> audio.program.remote`
  - `measure.fft.frame -> measurement.fft`
  - `measure.* -> measurement`
  - `amplab.telemetry` / `amplab.control.state -> telemetry`
  - `dsp.state.* -> dsp.state`
- `sys.status.core.stream` now publishes those class fields beside:
  - `subscribe_topic`
  - `active_topic`
  - `event_count`
  - `last_event_ms`
- DSP workspace now renders both topic strings and stream classes

## Why This Matters

- the Wi-Fi-first audio lane can now distinguish real program-audio routing from
  other event traffic on the same shared runtime surface
- it becomes easier to tell when the DSP is aligned to the expected remote audio
  lane versus a measurement-only or telemetry-only subscription
- the next playback closure slice can use this as a stronger runtime truth floor

## Verification

- `npm run type-check`
- `npx vitest run test/services/dspFirmwareContract.test.ts test/services/dspNetworkCommandClient.test.ts test/services/CloudSync.syncContext.test.ts`
- `pio run -e esp32s3_dsp_headless`
- `pio run -e esp32s3_dsp_headless -t upload`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- close the remote-hub to DSP playback/runtime loop using:
  - selected remote source
  - expected publish topic
  - subscriber topic/class
  - active topic/class
- validate that live observed DSP activity class matches the chosen remote source on hardware
