Status: done
Priority: medium
Date: 2026-03-16
Project: firmware
Owner: d
Claim ID: 20260316T111900Z-5a71c3de

# Normalize Firmware Default Target And Port Safety Wave

## Goal

Make the firmware defaults safer and more truthful so local build and flash
flows stop depending on drifted target and port assumptions.

## Source

- `docs/roadmap/OHMIC_FIRMWARE_TARGET_AND_PORT_SAFETY_NORMALIZATION_WAVE_2026-03-16.md`

## Focus

- documented-target vs default-env alignment
- hardcoded local port removal or parameterization
- operator-safe local build and flash instructions

## Acceptance

- one explicit firmware target/port safety family exists in `ready`
- the children are runnable and narrow enough to claim independently
- the wave stays operationally focused instead of expanding into a firmware
  redesign

## Result

- published the family closeout in
  `docs/roadmap/OHMIC_FIRMWARE_TARGET_AND_PORT_SAFETY_NORMALIZATION_WAVE_2026-03-16.md`
- aligned the AmpLab default PlatformIO target with the documented primary env
- removed checked-in hardcoded `COM4` assumptions from both firmware repos
- verified successful builds for:
  - `pio run -e esp32s3`
  - `pio run -e cyd24r`
