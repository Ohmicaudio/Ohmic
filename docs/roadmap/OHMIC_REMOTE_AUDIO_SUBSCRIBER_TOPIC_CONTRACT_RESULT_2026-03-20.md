Date: 2026-03-20
Status: done
Project: ohmic-audio-labs

# Ohmic Remote Audio Subscriber Topic Contract Result

## Summary

The shared audio contract now defines the expected DSP subscriber topic for each
remote source so the Wi-Fi-first playback lane has a concrete consumer target.

## Completed

- added shared expected subscriber-topic mapping in
  `services/hardware/audioTransport.ts`
- defined expected DSP topics for remote sources:
  - `phone.bt -> audio.remote.phone.bt`
  - `sd.local -> audio.remote.sd`
  - `usb.local -> audio.remote.usb`
  - `remote.stream -> audio.remote.main`
- `DspDeckSummary` now shows the expected subscriber topic alongside the actual
  runtime subscriber state from `sys.status.core`

## Why This Matters

- source ownership without a subscriber-topic contract still leaves playback
  behavior underspecified
- the DSP-facing workspace now shows the contract the next runtime step needs to
  satisfy
- this narrows the next work to actual subscriber/playback realization rather
  than more route-label cleanup

## Verification

- `npm run type-check`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- wire actual DSP subscriber/playback behavior to match the expected topic
  contract
- reflect any real runtime subscriber mismatches back into shared status
