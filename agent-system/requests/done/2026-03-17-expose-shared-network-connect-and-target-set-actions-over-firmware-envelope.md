Status: done
Priority: high
Date: 2026-03-17
Project: firmware
Owner: d
Claim ID: 20260318T003350Z-6f1c2d4a

# Expose Shared Network Connect And Target Set Actions Over Firmware Envelope

## Goal

Expose connect and target-selection actions through the shared firmware
envelope so host selection and LAN/AP target behavior are command-first and
surface-agnostic.

## Source

- `docs/roadmap/OHMIC_SHARED_NETWORK_COMMAND_SURFACE_WAVE_2026-03-17.md`

## Focus

- `sys.network.connect`
- `sys.network.profile.select`
- `sys.network.target.set`
- `sys.network.ap.set`

## Acceptance

- connect and target actions exist as real firmware-envelope topics
- action replies carry honest queued/accepted/error truth
- the result is verified in firmware builds

## Result

- `docs/roadmap/OHMIC_SHARED_NETWORK_CONNECT_AND_TARGET_ACTIONS_RESULT_2026-03-17.md`
