Date: 2026-03-20
Status: done
Project: ohmic-audio-labs

# Ohmic Remote Source Client State Result

## Summary

The shared client session model now consumes the session-hub media source state,
and the Hardware tab surfaces that source label directly from `CloudSync`.

## Completed

- `CloudSync` now stores session-level `mediaSource` from:
  - `welcome`
  - `media_source_update`
- `CloudSync` now exposes `selectRemoteMediaSource(...)` so the shared client
  session model can request remote source changes over the same transport seam
- `getSyncMeta()` now exposes that shared session media source
- `HardwareTab` now shows the current remote source label and transport from the
  shared session model
- `HardwareTab` now exposes a shared remote-source selector instead of keeping
  that choice buried in backend-only or device-local state
- Android app was synced and `installDebug` succeeded after this UI/state pass

## Why This Matters

- the selected remote source is now visible in shared app state instead of only
  living in backend diagnostics or local device status
- Wi-Fi-first audio routing can now be reasoned about from one shared client
  state seam before the remote-hub acknowledgement loop is finished

## Verification

- `npm run type-check`
- `vitest run test/services/amplabSetupCommands.test.ts test/services/amplabBleSupport.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- have the remote-hub side acknowledge the selected source explicitly
- carry that acknowledged source through DSP-consumer route ownership
