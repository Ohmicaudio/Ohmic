Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Android Generated Output Fence Slice

## Goal

Implement the first truthful Android hygiene slice by validating and preserving
the generated-output and local-state fence.

## Source

- `docs/roadmap/OHMIC_ANDROID_GENERATED_OUTPUT_FENCE_SAFE_SLICE_2026-03-15.md`

## Focus

- Android ignore-boundary behavior
- generated directory fence
- local state exclusion
- no wrapper feature work

## Acceptance

- one bounded Android fence/hygiene slice lands
- generated Android output stays out of Git truth
- tracked wrapper CRLF noise is not mistaken for semantic product work
