Title: Repair mojibake in remaining cyd-remote docs
Status: done
Owner: codex-local
Created: 2026-03-14
Completed: 2026-03-14
Project: cyd-remote

## Summary

The remaining `cyd-remote` mojibake pile was cleaned without reopening unrelated docs.

Completed repo work:

- safe B-drive doc normalization had already landed in `cyd-remote` commit `0f36c7a`
- the remaining handoff/link cleanup landed in `cyd-remote` commit `66aec84`

## Outcome

- restored the damaged docs to clean content
- preserved the intended B-drive normalization
- kept `PINOUT_CANONICAL_V1.md`, `DSP_AGENT2_RESEARCH_QUESTIONS.md`, and `DSP_NATIVE_INTEGRATION_WISHLIST.md` at clean `HEAD` because they did not need additional repo-path changes
- updated the remaining companion-spec links and migration wording where the B-drive normalization was still intended

## Files Repaired

- `B:\ohmic\repos\cyd-remote\docs\OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_FIRMWARE_APPLY_AND_PRESET_STATE_MACHINE.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_FIRMWARE_OBJECT_MODEL.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_FIRMWARE_OPEN_DECISIONS.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_MEASUREMENT_AND_GENERATOR_JOBS.md`

## Verification

- no obvious mojibake remained in the originally claimed file set after repair
- `cyd-remote` pushes now contain the clean doc state on `origin/main`
