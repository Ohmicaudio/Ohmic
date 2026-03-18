Status: done
Priority: high
Date: 2026-03-17
Project: firmware
Owner: d
Claim ID: 20260318T003350Z-6f1c2d4a

# Expose Shared Network Status Profile And Scan Topics Over Firmware Envelope

## Goal

Expose shared network status, saved-profile, and scan topics over the producer
firmware envelope so surfaces can query network truth without depending on
page-specific HTTP wiring.

## Source

- `docs/roadmap/OHMIC_SHARED_NETWORK_COMMAND_SURFACE_WAVE_2026-03-17.md`

## Focus

- `sys.network.status`
- `sys.network.profiles`
- `sys.network.scan`

## Acceptance

- network status is available through the shared envelope
- profile and scan truth are available through the shared envelope
- the result is verified in firmware builds

## Result

- `docs/roadmap/OHMIC_SHARED_NETWORK_STATUS_PROFILE_AND_SCAN_TOPICS_RESULT_2026-03-17.md`
