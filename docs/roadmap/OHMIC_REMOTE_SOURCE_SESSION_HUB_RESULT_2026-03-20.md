Date: 2026-03-20
Status: done
Project: ohmic-audio-labs

# Ohmic Remote Source Session Hub Result

## Summary

The WebSocket session hub now stores and rebroadcasts session-level media source
truth for the Wi-Fi-first audio lane instead of treating remote source selection
as an untracked envelope.

## Completed

- `wsHub` now parses session media source state from:
  - `media.source.select`
  - `sys.status.core.runtime.media_source`
- the hub stores one `mediaSource` record per session
- `welcome` now includes the current session `mediaSource`
- peers now receive `media_source_update` when the selected source changes
- injected envelopes follow the same update path so bridge-originated traffic
  does not bypass session state
- session trace now includes the current `mediaSource`

## Why This Matters

- remote source selection is no longer trapped in a single device runtime
- new peers can join a live session and immediately know the current remote
  source without waiting for another manual change
- the next source-selection packet can focus on remote-hub acknowledgement and
  DSP-consumer ownership instead of first inventing session truth

## Verification

- `npm run type-check`
- `vitest run test/services/amplabSetupCommands.test.ts test/services/amplabBleSupport.test.ts`

## Next

- close the loop by having the remote-hub side acknowledge and publish the
  active selected source back through shared status
- reflect that source choice in DSP-consumer route ownership and UI controls
