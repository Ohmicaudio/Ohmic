Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Android Generated Output Fence Slice

## Goal

Implement the first truthful Android hygiene slice by validating and preserving
the generated-output and local-state fence.

## Source

- `docs/roadmap/OHMIC_ANDROID_GENERATED_OUTPUT_FENCE_SAFE_SLICE_2026-03-15.md`

## Focus

- Android ignore-boundary behavior
- generated directory fence
- local state exclusion
- no wrapper feature work

## Acceptance

- one bounded Android fence/hygiene slice lands
- generated Android output stays out of Git truth
- tracked wrapper CRLF noise is not mistaken for semantic product work

## Completion Notes

- Verified the existing Android ignore fence is already active and effective
- `git check-ignore -v` confirmed these are fenced by `android/.gitignore`:
  - `android/local.properties`
  - `android/app/build/`
  - `android/build/`
  - `android/capacitor-cordova-android-plugins/`
  - `android/app/src/main/assets/public`
  - generated Capacitor config/assets paths
- `git status --ignored -- android` showed generated and local-state paths as
  ignored (`!!`), not staged repo truth
- No product-repo file edit was needed for this fence slice
- The remaining Android pressure is tracked-file CRLF churn, which stays
  separate from generated-output hygiene
