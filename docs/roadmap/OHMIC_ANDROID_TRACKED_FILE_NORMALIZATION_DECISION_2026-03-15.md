Status: decision_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Android Tracked File Normalization Decision

## Decision

Do not treat the current tracked Android wrapper churn as semantic product work.

The safe default is:

- do not commit the current tracked Android file set as feature work
- do not mix it into other Android or product slices
- only normalize it in one dedicated cleanup pass, or when an intentional
  Android wrapper change is already being made

## Why

The current tracked Android wrapper/config set produced no semantic diff under:

- `git diff --ignore-cr-at-eol`

That means the visible worktree pressure in these files is currently
line-ending-only churn, not trustworthy Android feature or wrapper logic work.

## Affected Tracked Files

Representative set:

- `android/app/build.gradle`
- `android/app/proguard-rules.pro`
- `android/app/src/androidTest/java/com/getcapacitor/myapp/ExampleInstrumentedTest.java`
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/java/com/ohmicaudio/labs/MainActivity.java`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/res/xml/file_paths.xml`
- `android/build.gradle`
- `android/gradle.properties`
- `android/gradle/wrapper/gradle-wrapper.properties`
- `android/gradlew`
- `android/gradlew.bat`
- `android/settings.gradle`
- `android/variables.gradle`
- `capacitor.config.ts`

## What This Means Operationally

### Allowed

- keep treating generated Android output as a separate hygiene fence
- ignore this tracked churn during unrelated Android work
- open a dedicated normalization slice later if cleanliness becomes worth the review cost

### Not Allowed

- bundling this tracked churn into feature commits
- calling it Android progress when it is only formatting noise
- letting it blur ownership of real Android wrapper changes

## Preferred Next Action

Use one of these two paths later:

1. dedicated normalization sweep
   - only if repo calmness is the actual goal
2. piggyback normalization on a real Android wrapper change
   - only if the exact files are already being intentionally edited

## Current Recommendation

Prefer path 2 for now.

This repo is still too broadly dirty for a low-signal Android normalization
sweep to deserve priority on its own.
