Status: done
Priority: medium
Date: 2026-03-16
Project: firmware
Owner: d
Claim ID: 20260316T111900Z-5a71c3de

# Record Safe Local Firmware Build And Flash Instructions After Normalization

## Goal

Write down the post-normalization local firmware build and flash flow so the
operator path is explicit and repeatable.

## Source

- `docs/roadmap/OHMIC_FIRMWARE_TARGET_AND_PORT_SAFETY_NORMALIZATION_WAVE_2026-03-16.md`

## Acceptance

- one short operator flow is recorded for AmpLab firmware
- one short operator flow is recorded for CYD remote if still applicable
- the instructions match the normalized target and port strategy

## Result

- recorded the normalized operator flow in:
  - `B:\ohmic\repos\amplab-firmware\README.md`
  - `B:\ohmic\repos\cyd-remote\README.md`
  - `docs/roadmap/OHMIC_FIRMWARE_TARGET_AND_PORT_SAFETY_NORMALIZATION_WAVE_2026-03-16.md`
- both flows now use explicit runtime port selection instead of a checked-in
  workstation port
