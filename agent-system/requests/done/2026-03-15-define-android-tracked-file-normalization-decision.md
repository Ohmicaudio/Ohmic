Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Android Tracked File Normalization Decision

## Goal

Decide whether the current tracked Android wrapper churn should be normalized,
discarded, or preserved as intentional text changes instead of leaving it as
ambiguous CRLF noise.

## Source

- `agent-system/requests/done/2026-03-15-implement-android-generated-output-fence-slice.md`
- `docs/roadmap/OHMIC_ANDROID_WRAPPER_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`

## Focus

- tracked Android wrapper/config files only
- CRLF normalization versus intentional edit decision
- safe next action for the Android lane

## Acceptance

- one explicit decision note exists for the tracked Android churn
- the next Android action is safer to claim
- generated-output fence work stays separate

## Completion Notes

- Decision note created at
  `docs/roadmap/OHMIC_ANDROID_TRACKED_FILE_NORMALIZATION_DECISION_2026-03-15.md`
- Decision: do not treat the current tracked Android wrapper churn as semantic
  product work
- Recommended path is to normalize only during a dedicated cleanup pass or when
  those exact files are already being intentionally edited
- This keeps tracked CRLF churn separate from the already-verified
  generated-output fence
