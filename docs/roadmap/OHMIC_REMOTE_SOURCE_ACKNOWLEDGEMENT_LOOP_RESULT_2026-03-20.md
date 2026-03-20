# OHMIC Remote Source Acknowledgement Loop Result

Date: 2026-03-20

## Outcome

The shared session model now carries explicit remote publish-topic truth instead of
only a pending-vs-confirmed source selection bit.

## Completed

- `wsHub` now tracks these fields inside the session media-source record:
  - `publishTopic`
  - `publishState`
  - `activeTopic`
- `media.source.select` now resolves immediately to the concrete expected remote
  publish topic for the selected source:
  - `phone.bt -> audio.remote.phone.bt`
  - `sd.local -> audio.remote.sd`
  - `usb.local -> audio.remote.usb`
  - `remote.stream -> audio.remote.main`
- `dsp.stream.subscribe` now updates the same shared session route model instead
  of living as a separate DSP-only fact
- `sys.status.core.stream.subscribe_topic` and `stream.active_topic` now tighten
  that session state into confirmed publish / active topic truth
- the shared `RemoteSourceSessionCard` now renders publish topic/state and active
  topic alongside source ownership

## Why This Matters

- the Wi-Fi-first audio lane no longer has to infer route truth from mixed UI and
  DSP runtime hints
- remote source selection, subscriber intent, and observed stream activity now
  share one session-level route model
- the next playback closure slice can focus on real remote-to-DSP program flow
  instead of first inventing another acknowledgement layer

## Verification

- `npm run type-check`
- `npx vitest run test/services/CloudSync.syncContext.test.ts test/services/dspFirmwareContract.test.ts test/services/dspNetworkCommandClient.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- close the remote-hub to DSP playback/runtime loop on top of this now-shared
  publish-topic truth
- validate that observed DSP stream activity matches the selected remote source
  on live hardware
