# Static Graphics Work Split

Date: 2026-03-14

## Purpose

Stop overlap while the remaining static-content graphics tasks are being executed in parallel.

## Current Recommended Split

- `codex-local`
  - owns `B:\ohmic\repos\ohmic-audio-static-content\public\mobile-electronics`
  - working task: replace `mobile-electronics` placeholder graphics
- other active agent
  - should choose either `B:\ohmic\repos\ohmic-audio-static-content\public\tuning`
  - or `B:\ohmic\repos\ohmic-audio-static-content\public\reference`
  - but not both at once unless explicitly re-coordinated

## Boundary Rules

- do not edit `competition/*` unless a fresh explicit claim is created first
- do not edit `mobile-electronics/*` while the active `codex-local` claim exists
- if `tuning/*` is claimed by another agent, leave `reference/*` open, or vice versa
- before touching any graphics bucket, create or verify a live job file in `jobs/active/`

## Remaining Ready Buckets

- `2026-03-14-replace-mobile-electronics-placeholder-graphics.md`
- `2026-03-14-replace-tuning-placeholder-graphics.md`
- `2026-03-14-replace-reference-placeholder-graphics.md`

## Notes

- `competition` had overlap already; avoid that surface until the next explicit claim is visible
- metadata-leak cleanup and `reference/index.html` style normalization are already complete and should not be reopened
