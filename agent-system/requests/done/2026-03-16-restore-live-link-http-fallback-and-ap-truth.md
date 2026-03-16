Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T124119Z-fabe40cd

# Restore Live Link Http Fallback And AP Truth

## Goal

Recover the truthful HTTP fallback target set after the device-link extraction,
including the browser/host command path and explicit handling of the ESP32 AP
endpoint at `192.168.4.1`.

## Source

- `docs/roadmap/OHMIC_AUDIO_LABS_BUILD_AND_LIVE_LINK_RECOVERY_WAVE_2026-03-16.md`

## Focus

- `useAmpLabControlPlane`
- `useDeviceLinkPlane`
- `useAmpLabDiscoveryPlane`
- discovery/control behavior when the device is in AP mode or reachable through
  the local browser/desktop host path

## Acceptance

- HTTP command fallback does not silently lose viable local targets
- ESP32 AP-mode discovery/command behavior is explicit and tested
- the device-link extraction keeps the new shared seam without reducing real
  reachability truth

## Result

- restored explicit AP-path truth through:
  - `components/Hardware/useAmpLabDiscoveryPlane.ts`
  - `components/Hardware/useDeviceLinkPlane.ts`
  - `services/ohmicLiveLink/ConnectionManager.ts`
- documented the closeout in
  `docs/roadmap/OHMIC_LIVE_LINK_CANDIDATE_NORMALIZATION_SECOND_SLICE_2026-03-16.md`
- verified the repaired code with a passing build and the focused
  `ohmicLiveLinkConnectionManager` regression suite
