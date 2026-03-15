Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next Android Wrapper Tracked-Text Slice

## Goal

Choose the next bounded Android wrapper slice now that ignore-file hygiene is
already complete.

## Focus

- tracked Android wrapper/config files only
- no generated build/plugin/assets output
- no broad web/runtime changes

## Candidate Surfaces

- `android/app/capacitor.build.gradle`
- `android/capacitor.settings.gradle`
- any still-tracked wrapper text/config files that represent a coherent
  Android-specific slice

## Acceptance

- one narrow next Android implementation task is identified
- generated-wrapper noise stays out of scope
