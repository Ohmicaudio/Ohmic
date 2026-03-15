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

## Completion Notes

- Defined the next truthful Android packet at
  `docs/roadmap/OHMIC_ANDROID_GENERATED_OUTPUT_FENCE_SAFE_SLICE_2026-03-15.md`
- The candidate slice is generated-output and ignore-boundary hygiene, not
  tracked wrapper text edits
- This conclusion was based on two findings:
  - tracked Android wrapper/config files are still CRLF-only churn under
    `git diff --ignore-cr-at-eol`
  - the real Android pressure is generated/local output under `android/app/build`,
    `android/build`, `android/capacitor-cordova-android-plugins`, and
    `android/local.properties`
