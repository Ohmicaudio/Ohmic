# OHMIC DSP Auto Subscriber Alignment Result

Date: 2026-03-20

## Outcome

The DSP workspace now closes the last manual source-selection gap by auto-applying
the expected remote audio subscriber topic when the shared session route changes
and the DSP runtime is not yet aligned.

## Completed

- `DspDeckSummary` now watches the shared remote media-source session state and:
  - derives the expected subscriber topic
  - detects when the DSP subscriber lane is not yet aligned
  - auto-sends `dsp.stream.subscribe` once the route is active enough to act on
- the auto-align decision now lives in shared app transport logic instead of only
  inside the DSP workspace component, so the rule is testable and reusable
- the auto-apply path refreshes `sys.status.core` immediately after the subscribe
  request so the workspace reflects the new DSP runtime truth without a manual step
- the manual `Apply Expected Topic` action remains available as a fallback, but
  the normal remote-source selection path no longer depends on it

## Verification

- `npm run type-check`
- `npx vitest run test/services/audioTransport.test.ts test/backend/wsHub.mediaSource.test.ts test/services/CloudSync.syncContext.test.ts test/services/dspFirmwareContract.test.ts test/services/dspNetworkCommandClient.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- validate the live remote-hub to DSP playback lane with the auto-subscriber step
  in place
- finish the first end-to-end audio test against a real remote program-audio source
