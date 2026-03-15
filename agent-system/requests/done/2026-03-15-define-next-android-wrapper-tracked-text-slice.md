Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T121435Z-53329572

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

## Outcome

Completed on 2026-03-15.

Result:

- identified the next coherent Android wrapper tracked-text slice as app
  identity and deep-link consistency
- the slice centers on:
  `android/app/src/main/AndroidManifest.xml`,
  `android/app/src/main/res/values/strings.xml`, and
  `capacitor.config.ts`
- the reason this is the next safe lane is that the package/app identity still
  uses `com.ohmicaudio.labs`, while the manifest deep-link scheme is already
  `ohmiclabs` and `strings.xml` still exposes the old package-style custom URL
  scheme, creating a bounded but real wrapper-level mismatch
- recorded that as a follow-up implementation task instead of mixing it into
  the earlier plugin-sync slice

## Verification

- confirmed the Android wrapper worktree is clean after the prior safe slice,
  so the next task can start from a controlled baseline
- reviewed `AndroidManifest.xml`, `strings.xml`, and `capacitor.config.ts` to
  confirm the current package/app identity and the deep-link/custom-scheme
  mismatch that justifies the new slice

## Follow-Up

- `2026-03-15-normalize-android-wrapper-app-identity-and-deep-link-scheme.md`
