Date: 2026-03-20
Status: done
Project: ohmic-audio-labs

# Ohmic DSP Core Status Audio Route Result

## Summary

The DSP-facing app contract now consumes `sys.status.core` so the workspace can
show both route ownership and stream subscriber intent from the same shared
runtime seam.

## Completed

- added `sys.status.core` to the shared DSP firmware transport contract
- added `requestDspCoreStatus(...)` to the DSP command client
- extended `DspDeckSummary` polling to include:
  - core runtime media-source state
  - core stream state
  - core stream reason
  - core subscribe topic
- `DspDeckSummary` now renders:
  - shared media-route summary from `runtime.media_source`
  - DSP subscriber card from `stream.*`

## Why This Matters

- source selection alone is not enough for the Wi-Fi-first audio lane
- the DSP workspace now shows whether the consumer runtime thinks it should be
  subscribed and what topic it expects
- this keeps the next audio step focused on actual playback/subscriber behavior
  instead of more UI-only source routing

## Verification

- `npm run type-check`
- `vitest run test/services/CloudSync.syncContext.test.ts test/services/amplabSetupCommands.test.ts test/services/amplabBleSupport.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- wire confirmed remote source selection through actual DSP subscriber/playback
  behavior
- align any remaining DSP firmware status gaps with the shared `sys.status.core`
  model
