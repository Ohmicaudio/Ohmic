Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T161520Z-843e5b96

# Retarget Current Host Origin Propagation Wave

## Goal

Retarget the app's host-origin propagation surfaces to the current truthful LAN
host instead of stale history.

## Source

- `docs/roadmap/OHMIC_CURRENT_HOST_ORIGIN_PROPAGATION_WAVE_2026-03-16.md`

## Focus

- host origin selection
- QR/deep-link host propagation
- stale host hint fallback

## Acceptance

- current host origin propagation favors the live host identity
- stale host hints are no longer silently preferred

## Result

Completed on 2026-03-16.

Outputs:

- `B:\ohmic\repos\ohmic-audio-labs\services\linkDeviceOrigins.ts`
- `B:\ohmic\repos\ohmic-audio-labs\test\services\linkDeviceOrigins.test.ts`
- `B:\ohmic\docs\roadmap\OHMIC_CURRENT_HOST_ORIGIN_PROPAGATION_WAVE_2026-03-16.md`

Outcome:

- host-origin propagation now prefers the current backend-reported LAN identity over stale history
