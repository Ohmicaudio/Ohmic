Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T124119Z-fabe40cd

# Recover Ohmic Audio Labs Build And Live Link Floor Wave

## Goal

Queue the next bounded `ohmic-audio-labs` recovery family so the repo regains
both a truthful build floor and a trustworthy live-link path after the active
smoke-test wave.

## Source

- `docs/roadmap/OHMIC_AUDIO_LABS_BUILD_AND_LIVE_LINK_RECOVERY_WAVE_2026-03-16.md`

## Focus

- root build truth
- hardware host/type closure
- active-instrument contract closure
- live-link command and AP-path truth

## Acceptance

- one explicit follow-on family exists in `ready`
- the child tasks are narrow enough to claim independently
- the family stays repair-oriented instead of turning into a broad redesign

## Remaining

- `2026-03-16-restore-live-link-http-fallback-and-ap-truth.md` remains the
  open child in this family while the live-link candidate normalization lane is
  already active elsewhere

## Result

- the recovery family is now grounded in:
  - `docs/roadmap/OHMIC_AUDIO_LABS_BUILD_AND_LIVE_LINK_RECOVERY_WAVE_2026-03-16.md`
  - `docs/roadmap/OHMIC_LIVE_LINK_CANDIDATE_NORMALIZATION_SECOND_SLICE_2026-03-16.md`
- the build floor is restored and the live-link HTTP fallback/AP truth repair
  landed
- the only honest remaining item is the bounded phone-assisted rerun, which is
  now separated from this recovery closeout
