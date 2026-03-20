Date: 2026-03-20
Status: done
Project: ohmic-audio-labs

# Ohmic Remote Source Acknowledgement Loop Result

## Summary

The shared session-hub media-source state now distinguishes a requested remote
source from a confirmed runtime-owned route, and the Hardware tab surfaces the
remote-hub to DSP ownership path directly.

## Completed

- `wsHub` now records `media.source.select` as a pending session source request
- `wsHub` now treats `sys.status.core.runtime.media_source` as the confirmed
  source reflection
- shared session media-source state now carries:
  - `producer`
  - `consumer`
  - `confirmed`
- `CloudSync` now normalizes that richer session media-source shape from:
  - `welcome`
  - `media_source_update`
- `HardwareTab` now shows:
  - pending vs confirmed source state
  - remote source transport
  - route ownership from producer to consumer

## Why This Matters

- remote source selection is no longer just an optimistic request edge
- the shared app state can now tell the difference between:
  - a source request being queued
  - the remote hub actually publishing that source toward the DSP consumer
- the Wi-Fi-first audio lane now has an explicit confirmed ownership seam before
  deeper source-arbitration and playback work

## Verification

- `npm run type-check`
- `vitest run test/services/CloudSync.syncContext.test.ts test/services/amplabSetupCommands.test.ts test/services/amplabBleSupport.test.ts`

## Next

- carry confirmed remote source ownership into the next DSP playback/subscriber
  lane
- align the web app’s runtime source-selection surface with the same confirmed
  session model
