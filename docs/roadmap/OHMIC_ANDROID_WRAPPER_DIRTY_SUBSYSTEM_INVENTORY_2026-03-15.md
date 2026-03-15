Status: inventory
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Android Wrapper Dirty Subsystem Inventory

## Summary

The Android/Capacitor wrapper lane is real, but it is not currently a deep
product-logic subsystem.

The dirty tree splits into two much simpler families:

- tracked wrapper/config files that are overwhelmingly line-ending churn
- untracked generated output from Capacitor sync and Gradle builds

## Scope Reviewed

- `android/*`
- `capacitor.config.ts`

## Dirty Shape

### Tracked wrapper/config churn

These files are modified in git, but the sampled diffs show line-ending churn
or low-signal wrapper text changes rather than new Android-specific product
logic:

- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/java/com/ohmicaudio/labs/MainActivity.java`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/res/xml/file_paths.xml`
- `android/app/build.gradle`
- `android/build.gradle`
- `capacitor.config.ts`

The `--numstat` profile reinforces that reading: many files show perfectly
balanced add/remove counts, which is consistent with CRLF/LF normalization noise.

### Generated or sync output noise

These are not good first commit candidates:

- `android/app/build/`
- `android/build/`
- `android/capacitor-cordova-android-plugins/`
- `android/app/src/main/assets/`
- `android/local.properties`

This is Gradle output, Capacitor sync output, copied web assets, local-machine
state, or plugin-generated material.

## Notable Detail

Two tracked ignore files are currently deleted:

- `android/.gitignore`
- `android/app/.gitignore`

That strongly suggests wrapper hygiene drift is part of why generated files are
flooding the worktree.

## Meaningful App-Specific Android Work

No clear first Android product feature slice surfaced from this inventory.

The sampled tracked files still point at the current app identity and wrapper
permissions, but the visible diffs do not yet justify bundling them into a
feature commit. Right now this lane looks more like wrapper hygiene than
feature implementation.

## First Safe Android Slice Recommendation

Take an Android wrapper hygiene slice, not an Android feature slice:

- restore `android/.gitignore`
- restore `android/app/.gitignore`
- keep generated build/plugin/assets/local files out of the next commit
- normalize tracked wrapper text files only if needed for a clean baseline
- defer any branding, manifest, or asset identity changes until they are
  intentional and reviewed as product work

## Finish Condition

- Android is no longer treated as mysterious background churn
- generated wrapper noise is separated from tracked wrapper config
- the next Android task can be a bounded hygiene commit instead of a vague
  cleanup sweep
