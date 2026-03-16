Status: done
Priority: medium
Date: 2026-03-16
Project: amplab-firmware
Owner: d
Claim ID: 20260316T111900Z-5a71c3de

# Align AmpLab PlatformIO Default Env With Documented Primary Target

## Goal

Compare the AmpLab firmware README target guidance with `platformio.ini` and
repair the default environment if it drifted away from the documented primary
target.

## Source

- `docs/roadmap/OHMIC_FIRMWARE_TARGET_AND_PORT_SAFETY_NORMALIZATION_WAVE_2026-03-16.md`

## Acceptance

- the documented primary target is confirmed
- the checked-in default env is confirmed
- any repair keeps the default aligned with the documented intended target

## Result

- confirmed `B:\ohmic\repos\amplab-firmware\README.md` documents `esp32s3` as
  the primary target
- repaired `B:\ohmic\repos\amplab-firmware\platformio.ini` so
  `default_envs = esp32s3`
- verified the normalized primary target with a passing `pio run -e esp32s3`
