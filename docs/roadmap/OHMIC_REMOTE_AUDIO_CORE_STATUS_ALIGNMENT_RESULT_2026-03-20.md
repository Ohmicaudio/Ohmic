# OHMIC Remote Audio Core Status Alignment Result

Date: 2026-03-20

## Outcome

The shared hub session media-source state no longer misclassifies unrelated DSP
activity as remote program-audio playback just because `sys.status.core.stream`
contains a non-empty active topic.

## Completed

- `wsHub` now derives remote-route publish state from the DSP core stream fields
  using the selected remote publish topic as the authority
- `streaming` is now only emitted when:
  - `active_class` is `audio.program.remote`
  - and `active_topic` matches the expected remote publish topic
- `subscribed` is now emitted when:
  - `subscribe_class` is `audio.program.remote`
  - and `subscribe_topic` matches the expected remote publish topic
- the hub no longer lets an unrelated `stream.active_topic` overwrite the
  selected remote publish topic
- the shared media-source session state now also carries the raw lane evidence:
  - `subscribeTopic`
  - `subscribeClass`
  - `activeTopic`
  - `activeClass`
- that evidence now reaches the shared route card too, so live runs can show
  which subscriber lane and active lane the hub is actually seeing
- backend coverage now proves:
  - matching remote audio core status becomes `streaming`
  - a measurement active lane does not falsely become `streaming`

## Verification

- `npm run type-check`
- `npx vitest run test/backend/wsHub.mediaSource.test.ts test/services/audioTransport.test.ts test/services/CloudSync.syncContext.test.ts test/services/dspFirmwareContract.test.ts test/services/dspNetworkCommandClient.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- validate the first real remote-hub program-audio run against the tighter hub
  session truth
- confirm the DSP workspace and shared session state now agree during live audio
  playback
