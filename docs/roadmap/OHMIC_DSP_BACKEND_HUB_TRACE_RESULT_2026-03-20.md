# OHMIC DSP Backend Hub Trace Result

Date: 2026-03-20

## Outcome

The DSP workspace now polls the backend `/api/ws/trace` route and shows the hub's
own remote-route state beside the local session and DSP runtime views.

## Completed

- `DspDeckSummary` now fetches backend hub trace state during its normal poll loop
- the DSP workspace now shows a `Hub Trace Route` block with:
  - publish topic/state
  - subscriber topic/class
  - active topic/class
  - last update source
- this gives the first live remote-audio run three distinct truth surfaces in one place:
  - browser/session route state
  - backend hub route state
  - DSP runtime route state

## Verification

- `npm run type-check`
- `npx vitest run test/backend/wsHub.mediaSource.test.ts test/services/audioTransport.test.ts test/services/CloudSync.syncContext.test.ts test/services/dspFirmwareContract.test.ts test/services/dspNetworkCommandClient.test.ts test/components/AmpLabControlSurfaces.test.tsx`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- use the new hub-trace block to validate the first real remote-hub audio run
- confirm browser, backend hub, and DSP runtime converge on the same route truth
