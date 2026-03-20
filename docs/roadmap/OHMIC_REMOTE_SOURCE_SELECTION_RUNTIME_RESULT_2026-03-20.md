Date: 2026-03-20
Status: done
Project: amplab-firmware

# Ohmic Remote Source Selection Runtime Result

## Summary

The shared runtime now owns a concrete remote-audio source selection seam instead
of reporting every Wi-Fi-first route as a generic `remote.stream`.

## Completed

- added shared `media.source.select` command handling in the source-policy core
- added shared runtime state for the selected remote source id
- `runtime.media_source.upstream` can now report:
  - `phone.bt`
  - `sd.local`
  - `usb.local`
  - `remote.stream`
- the headless AmpLab runtime now relays `media.source.select` toward the remote
  hub over WebSocket when the remote link is active
- the app repo now has a shared `buildAmpLabMediaSourceSelectCommand(...)`
  helper for future Fire/web control hookups

## Why This Matters

- the Wi-Fi-first audio lane now talks about real remote sources instead of only
  a generic upstream placeholder
- status surfaces can distinguish phone Bluetooth, SD, and USB media on the
  remote hub without inventing a separate app-only model
- the next audio slice can focus on remote-hub acknowledgement and source
  arbitration behavior instead of first creating the command and state seam

## Verification

- `npm run type-check`
- `vitest run test/services/amplabSetupCommands.test.ts test/services/amplabBleSupport.test.ts`
- `pio run -e esp32s3_ble_headless`
- live flash to `COM19`

## Next

- teach the remote hub side to acknowledge and report the active selected source
- surface explicit source-selection controls in the shared web/Fire hardware UI
- carry the same source truth into DSP-consumer route ownership
