Title: Repair mojibake in remaining cyd-remote docs
Status: ready
Owner: unassigned
Created: 2026-03-14
Project: cyd-remote

## Summary

The `B:\ohmic\repos\cyd-remote` doc-normalization pass was split into two parts:

- safe B-drive path fixes were committed and pushed in `cyd-remote` commit `0f36c7a`
- a second doc set still carries mojibake/encoding damage and should be repaired in a dedicated pass

Do not reopen the already-pushed clean slice. Repair only the remaining corrupted docs.

## Files

- `B:\ohmic\repos\cyd-remote\docs\OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md`
- `B:\ohmic\repos\cyd-remote\docs\PINOUT_CANONICAL_V1.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_AGENT2_RESEARCH_QUESTIONS.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_FIRMWARE_APPLY_AND_PRESET_STATE_MACHINE.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_FIRMWARE_OBJECT_MODEL.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_FIRMWARE_OPEN_DECISIONS.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_MEASUREMENT_AND_GENERATOR_JOBS.md`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\DSP_NATIVE_INTEGRATION_WISHLIST.md`

## What To Fix

- mojibake punctuation such as `â€”`, `â€“`, `â†’`, `â€œ`, `â€`, `â€™`
- symbol corruption such as `Ã—`, `âœ…`, `âœ“`, `âš ï¸`
- any line-ending noise introduced during previous path normalization

## Guardrails

- preserve the intended B-drive repo references already in the working tree
- prefer ASCII-safe replacements when meaning is preserved cleanly
- do not bulk-rewrite unrelated docs
- verify each repaired file no longer contains obvious mojibake before commit

## Finish Condition

- all listed files are free of obvious mojibake
- intended B-drive path updates are preserved
- changes are committed in `B:\ohmic\repos\cyd-remote`
