Date: 2026-03-20
Status: ready
Project: ohmic-audio-labs

# Close Remote Source Selection Loop Across Remote And DSP

## Goal

Carry the new `media.source.select` runtime seam through the rest of the
Wi-Fi-first audio path so source choice is acknowledged by the remote hub and
reflected in DSP-consumer route ownership.

## Why

- the shared core now owns a real `media.source.select` command
- `runtime.media_source.upstream` can now report concrete remote sources
- the remaining gap is end-to-end behavior and status truth across remote and
  DSP consumers

## Scope

- define or wire the remote-hub acknowledgement for `media.source.select`
- expose the selected source in remote status replies
- reflect that source in DSP-consumer route ownership and shared UI status

## Depends On

- `OHMIC_REMOTE_SOURCE_SELECTION_RUNTIME_RESULT_2026-03-20.md`
