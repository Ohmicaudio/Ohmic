Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Android Tracked File Normalization Sweep Packet

## Purpose

Define one future cleanup-only packet for tracked Android wrapper normalization
so later execution does not have to rediscover scope, value, or stopping rules.

## Current Read

This is not current feature work.

The earlier Android decision note captured a period where tracked wrapper files
looked dirty but collapsed under `git diff --ignore-cr-at-eol`, which made them
low-signal normalization pressure instead of trustworthy Android progress.

As of this planning pass, both of these checks are currently quiet:

- `git diff --name-only -- android capacitor.config.ts`
- `git diff --ignore-cr-at-eol --name-only -- android capacitor.config.ts`

That means this packet should remain dormant until tracked wrapper text churn
returns or a real Android wrapper change is already being made.

## Open This Packet Only When

- tracked Android wrapper text files reappear as modified
- the churn still disappears under `git diff --ignore-cr-at-eol`
- repo calmness or review clarity is the actual goal

## Do Not Open This Packet When

- only generated Android output is noisy
- `android/local.properties` is the only Android change
- launcher icons, splash assets, or copied web assets are the visible churn
- the repo is already in the middle of unrelated Android feature work
- any file in the packet still carries semantic content changes under
  `git diff --ignore-cr-at-eol`

## Exact Future File Set

Normalize only this tracked text/config family:

- `android/app/build.gradle`
- `android/app/proguard-rules.pro`
- `android/app/src/androidTest/java/com/getcapacitor/myapp/ExampleInstrumentedTest.java`
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/java/com/ohmicaudio/labs/MainActivity.java`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/res/xml/file_paths.xml`
- `android/app/src/test/java/com/getcapacitor/myapp/ExampleUnitTest.java`
- `android/build.gradle`
- `android/gradle.properties`
- `android/gradle/wrapper/gradle-wrapper.properties`
- `android/gradlew`
- `android/gradlew.bat`
- `android/settings.gradle`
- `android/variables.gradle`
- `capacitor.config.ts`

Only pull these hygiene companions in if they are also genuinely part of the
same normalization problem at execution time:

- `android/.gitignore`
- `android/app/.gitignore`

## Explicitly Out Of Scope

- `android/app/build/`
- `android/build/`
- `android/app/src/main/assets/`
- `android/capacitor-cordova-android-plugins/`
- `android/local.properties`
- `android/gradle/wrapper/gradle-wrapper.jar`
- launcher icon churn
- splash/image asset churn
- any Android feature, branding, permission, or packaging change that is
  actually semantic

## Execution Gate

Before running the future packet:

1. Capture the candidate file list with:
   - `git diff --name-only -- android capacitor.config.ts`
2. Re-run with line-ending normalization ignored:
   - `git diff --ignore-cr-at-eol --name-only -- android capacitor.config.ts`
3. Only proceed with files that disappear under step 2.
4. If any candidate still shows semantic diff, split that file into a separate
   Android wrapper change instead of bundling it into normalization.

## Verification

For the eventual cleanup commit:

- record the exact file list committed
- confirm no generated Android directories or local-machine files are included
- note whether `android/.gitignore` or `android/app/.gitignore` were needed
- keep the commit message honest that this is normalization only

## Finish Condition

- one low-priority future normalization packet exists
- the packet is clearly separate from Android feature work
- later execution can start from this exact scope and gate instead of
  rediscovering the rationale
