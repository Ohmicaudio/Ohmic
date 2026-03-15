Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Android Wrapper Tracked Text First Slice

## Purpose

Define the first clean Android wrapper slice as tracked text/config work only,
so Android cleanup can start without bundling generated Capacitor or Gradle
noise.

## Recommended First Slice

Take the smallest tracked wrapper text family that still reflects the current
wrapper identity and configuration surface:

- `android/app/build.gradle`
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/java/com/ohmicaudio/labs/MainActivity.java`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/res/xml/file_paths.xml`
- `android/build.gradle`
- `capacitor.config.ts`

## Why This Slice First

- these files are tracked wrapper/config text, not generated output
- they form one coherent boundary around wrapper identity, permissions, and app
  packaging
- they avoid the Android asset/icon churn that can easily balloon the slice
- they keep Gradle build folders, Capacitor-copied assets, and plugin output
  out of the first hygiene commit

## Explicitly Out Of Scope

- `android/app/build/`
- `android/build/`
- `android/app/src/main/assets/`
- `android/capacitor-cordova-android-plugins/`
- `android/local.properties`
- all launcher icon and drawable asset churn
- `android/gradlew`
- `android/gradlew.bat`
- `android/gradle/wrapper/gradle-wrapper.properties`
- `android/gradle.properties`
- `android/settings.gradle`
- `android/variables.gradle`
- `android/app/proguard-rules.pro`
- Android test stubs

## Keep Out Unless Proven Necessary

- `android/.gitignore`
- `android/app/.gitignore`

These remain part of wrapper hygiene, but they should only ride with the first
tracked-text commit if they are still actually missing or if generated output
cannot be fenced off cleanly without them.

## Verification

For the eventual implementation slice:

- record the exact file set committed
- confirm no generated Android directories or local machine files are included
- if practical, run one narrow wrapper sanity check after the slice lands:
  - `npm run android:doctor`
  - or one explicit statement of why wrapper verification is still deferred

## Finish Condition

- one bounded Android wrapper tracked-text packet exists
- the packet stays text/config only
- generated Android noise remains excluded
- the next implementation task can be claimed safely without re-scoping Android from scratch
