# OHMIC Remote Audio Activity Promotion Result

Date: 2026-03-20

## Outcome

The session hub now upgrades a selected remote source route to `streaming` when
matching `audio.remote.*` traffic is actually observed.

## Completed

- `wsHub` now inspects incoming signal frames against the current session
  `publishTopic`
- when matching signal traffic is observed, the session media-source state is
  promoted to:
  - `confirmed: true`
  - `publishState: streaming`
  - `activeTopic: <publishTopic>`
- this applies both to live client `signal` frames and to injected bridge
  signals through the public hub API
- a backend node test now proves the promotion path without needing a live remote
  device on the wire

## Why This Matters

- the Wi-Fi-first audio lane now has one more honest playback-truth seam:
  selected source
  -> expected publish topic
  -> observed matching remote traffic
  -> streaming session state
- this reduces the gap between route intent and route activity before the final
  remote-to-DSP playback closure work

## Verification

- `npm run type-check`
- `npx vitest run test/backend/wsHub.mediaSource.test.ts test/services/CloudSync.syncContext.test.ts test/services/dspFirmwareContract.test.ts test/services/dspNetworkCommandClient.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- close the remaining remote-hub to DSP playback loop by validating that:
  - hub session route is `streaming`
  - DSP stream class is `audio.program.remote`
  - DSP active topic matches the selected source publish topic
