Status: active
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T202902Z-103dde37

# Verify Browser UI Live AmpLab Link Flow

## Goal

Verify the actual browser UI discovery and link flow against the live AmpLab
unit already found on the local network.

## Source

- `docs/roadmap/OHMIC_LIVE_AMPLAB_DSP_VALIDATION_2026-03-15.md`

## Focus

- discovery list rendering
- auto-link or manual-link behavior
- browser telemetry path after linking

## Acceptance

- one live browser-side validation pass is recorded honestly
- UI behavior is separated cleanly from raw network/device reachability

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_BROWSER_UI_LIVE_AMPLAB_LINK_FLOW_2026-03-15.md`

Result:

- browser shell validation is now recorded against the live AmpLab device
- AmpLab deck entry does not auto-link on first entry
- `Refresh Units` discovers the live device and `Link Unit` promotes the deck
  from `SIM` to real hardware transport
- browser telemetry is visible after linking
- browser console still shows `/api/proxy` 404 noise for offline fallback probes
