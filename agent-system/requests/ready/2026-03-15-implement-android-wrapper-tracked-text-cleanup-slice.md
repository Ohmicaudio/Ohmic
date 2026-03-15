Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Android Wrapper Tracked Text Cleanup Slice

## Goal

Implement the first Android wrapper cleanup slice once the tracked-text boundary
is clear, improving the repo without reopening generated-noise churn.

## Source

- `docs/roadmap/OHMIC_ANDROID_WRAPPER_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`
- Android tracked-text first slice packet

## Focus

- tracked wrapper files only
- line-ending and text cleanup if intentional
- no generated directories
- no feature expansion

## Acceptance

- one Android wrapper cleanup slice lands cleanly
- generated output remains untouched
- the wrapper lane is calmer afterward
