Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

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
