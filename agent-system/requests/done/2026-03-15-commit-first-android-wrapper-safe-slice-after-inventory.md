Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T120653Z-58e1f0e3

# Commit First Android Wrapper Safe Slice After Inventory

## Blocker

Wait for:

- `inventory-android-wrapper-dirty-subsystem`

## Goal

Turn the Android wrapper inventory into one bounded Android-specific slice if a
real safe lane exists.

## Recommended First Slice

- restore `android/.gitignore`
- restore `android/app/.gitignore`
- exclude `android/app/build/`, `android/build/`,
  `android/capacitor-cordova-android-plugins/`, `android/app/src/main/assets/`,
  and `android/local.properties`
- treat wrapper text-file normalization as optional cleanup only if needed for a
  clean baseline

## Acceptance

- distinguishes generated wrapper noise from intentional app changes
- does not mix web/runtime code into the slice

## Outcome

Completed on 2026-03-15.

Result:

- used the inventory guidance to confirm the Android wrapper has a real safe
  lane separate from web/runtime code
- restored `android/.gitignore` and `android/app/.gitignore` in the working
  tree to verify that generated wrapper output drops out of `git status`, then
  confirmed those files already match `HEAD` and therefore do not produce a
  tracked repo delta on their own
- committed the actual bounded Android-only repo delta instead:
  `android/app/capacitor.build.gradle` and `android/capacitor.settings.gradle`
  now register the already-declared `@capacitor/app` plugin in the native
  wrapper
- left the rest of the repo dirt and the broader Android-generated noise out of
  the commit

## Verification

- ran `git status --short android` before and after restoring the ignore files
  to confirm the untracked generated wrapper output disappeared once the ignore
  rules were back in place
- ran `git ls-files --others --exclude-standard -- android` to confirm there
  were no remaining untracked Android wrapper files after the restore
- confirmed `@capacitor/app` already exists in `package.json` and
  `package-lock.json`, making the committed gradle/settings changes a clean
  native-wrapper sync instead of a wider dependency change
