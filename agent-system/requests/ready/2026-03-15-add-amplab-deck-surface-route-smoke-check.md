Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Add AmpLab Deck Surface Route Smoke Check

## Goal

Add one route-like regression check that mounts the AmpLab deck surface through
the real shell path rather than only the host panel and hook tests.

## Source

- `docs/roadmap/OHMIC_HARDWARE_DISCOVERY_TELEMETRY_REGRESSION_CHECK_2026-03-15.md`
- `agent-system/requests/ready/2026-03-15-verify-browser-ui-live-amplab-link-flow.md`

## Focus

- real deck-surface mounting path
- explicit AmpLab branch selection
- linked-unit and telemetry props visible through the shell

## Acceptance

- one route-like smoke check exists for the AmpLab shell path
- it stays below full browser automation and below live device execution
