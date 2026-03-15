Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T122023Z-2f95ea4b

# Normalize Android Wrapper App Identity And Deep-Link Scheme

## Goal

Make the Android wrapper app identity and deep-link/custom-scheme values agree
across the tracked text/config files.

## Focus

- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/res/values/strings.xml`
- `capacitor.config.ts`
- include `android/app/build.gradle` only if the final identity change requires
  it

## Known Mismatch

- package/app identity is `com.ohmicaudio.labs`
- manifest deep-link scheme is `ohmiclabs`
- `strings.xml` still exposes `custom_url_scheme` as `com.ohmicaudio.labs`

## Acceptance

- one canonical Android app identity/deep-link story is applied consistently
- the slice stays Android-wrapper/config only
- no generated wrapper output or unrelated web/runtime files are mixed in

## Outcome

Completed on 2026-03-15.

Result:

- kept the Android package/app identity stable as `com.ohmicaudio.labs`
- normalized the actual deep-link scheme to `ohmiclabs` by making the manifest
  consume `@string/custom_url_scheme`
- updated `strings.xml` so the tracked Android wrapper string resource matches
  the already-used `ohmiclabs://` launch flow instead of the stale
  package-style scheme
- left `capacitor.config.ts` and `android/app/build.gradle` unchanged because
  the package/app identity itself did not need to move for this slice

## Verification

- ran `git diff --check -- android/app/src/main/AndroidManifest.xml android/app/src/main/res/values/strings.xml`
- ran `git grep -n "custom_url_scheme\\|ohmiclabs" -- android/app/src/main/AndroidManifest.xml android/app/src/main/res/values/strings.xml capacitor.config.ts`
- ran `.\gradlew.bat :app:processDebugMainManifest` from `android/`
