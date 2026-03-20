Date: 2026-03-20
Status: done
Project: ohmic-audio-labs

# Ohmic DSP Remote Source Workspace Result

## Summary

The shared remote-source session route is now visible and controllable from the
DSP-facing workspace, not just the remote-hub card in the hardware tab.

## Completed

- extracted a shared `RemoteSourceSessionCard` component
- moved the common remote-source selector and ownership presentation into that
  shared hardware component
- wired `DspDeckSummary` to the shared `CloudSync` session media-source state
- `DspDeckSummary` now shows:
  - session link state
  - selected remote source
  - pending vs confirmed route state
  - producer to consumer ownership
- the Fire app was synced and reinstalled after this workspace pass

## Why This Matters

- the DSP unit is the primary consumer of the digital audio stream
- the DSP-facing workspace should not depend on a remote-only UI pocket to
  understand or change active source routing
- this keeps the Wi-Fi-first audio lane aligned with the real product topology

## Verification

- `npm run type-check`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- carry the same confirmed route model into the next DSP playback/subscriber
  behavior lane
- keep extracting shared audio-route controls out of unit-specific surfaces
