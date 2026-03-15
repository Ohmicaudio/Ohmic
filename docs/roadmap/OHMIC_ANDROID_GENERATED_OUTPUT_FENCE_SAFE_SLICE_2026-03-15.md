Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Android Generated Output Fence Safe Slice

## Purpose

Define the next truthful Android wrapper slice after CRLF-only tracked-file
churn was filtered out.

## Recommended Next Slice

Take an Android generated-output fence and ignore-boundary hygiene slice, not a
tracked wrapper text edit.

This slice should focus on confirming that generated Android output stays out of
Git truth and that the existing ignore boundary is actually doing its job.

## Why This Slice Is Truthful

- every tracked Android wrapper/config file currently appears to be CRLF-only
  churn under `git diff --ignore-cr-at-eol`
- the real live Android pressure is generated output and local machine state:
  - `android/app/build/`
  - `android/build/`
  - `android/capacitor-cordova-android-plugins/`
  - `android/local.properties`
- the ignore policy already exists in:
  - `android/.gitignore`
  - `android/app/.gitignore`

So the next semantic Android move is to validate and preserve that fence,
instead of pretending a wrapper-feature edit is waiting in the tracked diff.

## Exact Candidate Scope

### In-bounds

- `android/.gitignore`
- `android/app/.gitignore`
- explicit review of:
  - `android/local.properties`
  - `android/app/build/`
  - `android/build/`
  - `android/capacitor-cordova-android-plugins/`
  - `android/app/src/main/assets/public`
  - generated Capacitor config/assets if they appear

### Out of scope

- tracked wrapper/config files that are only CRLF churn
- launcher asset branding
- Gradle wrapper/version changes
- manifest or app identity changes
- Android feature work

## Verification

For the eventual implementation slice:

- confirm ignore rules match the generated/local directories that are present
- confirm no generated Android directories are accidentally staged
- if cleanup is performed, record it as local/generated hygiene rather than
  product behavior change

## Finish Condition

- the next Android slice is named from real pressure instead of fake diff noise
- generated output and local state are clearly fenced from repo truth
- later Android feature work can start from a calmer boundary
