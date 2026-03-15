Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Android Wrapper Tracked Text First Commit Slice

## Goal

Define the first clean Android wrapper slice that deals only with tracked text
files and keeps generated Capacitor or Gradle noise out.

## Source

- `docs/roadmap/OHMIC_ANDROID_WRAPPER_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`

## Focus

- tracked text files only
- exclude build output and generated plugin dirs
- commit-sized cleanup boundary

## Acceptance

- one first Android tracked-text slice packet exists
- the slice avoids generated output entirely
- the implementation step becomes safe to claim afterward

## Completion Notes

- Defined the packet at
  `docs/roadmap/OHMIC_ANDROID_WRAPPER_TRACKED_TEXT_FIRST_SLICE_2026-03-15.md`
- The first tracked-text slice is limited to seven wrapper/config files:
  `android/app/build.gradle`, `AndroidManifest.xml`, `MainActivity.java`,
  `strings.xml`, `file_paths.xml`, `android/build.gradle`, and
  `capacitor.config.ts`
- Generated Android build output, copied assets, plugin dirs, and broader
  wrapper churn remain explicitly out of scope
