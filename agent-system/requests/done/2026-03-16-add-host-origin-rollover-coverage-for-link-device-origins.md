Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T161520Z-843e5b96

# Add Host Origin Rollover Coverage For Link Device Origins

## Goal

Protect the host-origin propagation fix with focused regression coverage for LAN
host rollover.

## Source

- `docs/roadmap/OHMIC_CURRENT_HOST_ORIGIN_PROPAGATION_WAVE_2026-03-16.md`

## Focus

- host-origin tests
- current-vs-stale LAN identity behavior

## Acceptance

- a host LAN rollover case is covered directly
- stale host origin preference regressions are caught

## Result

Completed on 2026-03-16.

Outputs:

- `B:\ohmic\repos\ohmic-audio-labs\test\services\linkDeviceOrigins.test.ts`
- `B:\ohmic\docs\roadmap\OHMIC_CURRENT_HOST_ORIGIN_PROPAGATION_WAVE_2026-03-16.md`

Outcome:

- focused rollover coverage now protects the link-device origin ranking path
