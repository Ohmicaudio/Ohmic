Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Identify Next Semantic Android Wrapper Slice After CRLF Churn

## Goal

Find the next truthful Android wrapper implementation slice after filtering out
line-ending-only tracked-file churn.

## Source

- `agent-system/requests/done/2026-03-15-implement-android-wrapper-tracked-text-cleanup-slice.md`
- `docs/roadmap/OHMIC_ANDROID_WRAPPER_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`
- `docs/roadmap/OHMIC_ANDROID_WRAPPER_TRACKED_TEXT_FIRST_SLICE_2026-03-15.md`

## Focus

- semantic diff only
- tracked Android wrapper/config files
- explicit exclusion of generated build/plugin/assets noise
- narrow next slice candidate

## Acceptance

- one real Android slice candidate is named from actual semantic pressure
- false-ready Android cleanup work is excluded
- the next Android implementation task is easier to promote honestly
