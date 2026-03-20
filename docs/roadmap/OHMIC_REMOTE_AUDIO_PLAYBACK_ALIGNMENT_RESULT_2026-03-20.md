# OHMIC Remote Audio Playback Alignment Result

Date: 2026-03-20

## Outcome

The DSP workspace now derives one explicit playback-alignment status from the
shared remote route state and the live DSP stream runtime.

## Completed

- added a shared playback-alignment helper in `audioTransport.ts`
- the helper compares:
  - expected publish topic
  - session `publishTopic` / `publishState`
  - DSP `subscribe_topic` / `subscribe_class`
  - DSP `active_topic` / `active_class`
- DSP workspace now renders one summarized playback status:
  - `aligned`
  - `subscribed`
  - `requested`
  - `mismatch`
  - `idle`
- added focused tests for the aligned / subscribed / mismatch cases

## Why This Matters

- the audio lane now has a faster operator-facing truth readout instead of
  forcing manual comparison across multiple fields
- it becomes clearer whether the system is merely configured correctly or
  actually converged on the intended remote program-audio lane

## Verification

- `npm run type-check`
- `npx vitest run test/services/audioTransport.test.ts test/backend/wsHub.mediaSource.test.ts test/services/CloudSync.syncContext.test.ts test/services/dspFirmwareContract.test.ts test/services/dspNetworkCommandClient.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- validate the final live remote-to-DSP playback closure using the new alignment summary:
  selected source
  -> session publish topic/state
  -> DSP active topic/class
  -> aligned playback truth
