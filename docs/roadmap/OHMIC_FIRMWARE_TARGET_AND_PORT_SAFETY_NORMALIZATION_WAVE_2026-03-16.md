Status: implementation_packet
Date: 2026-03-16
Project: firmware

# Ohmic Firmware Target And Port Safety Normalization Wave

## Purpose

Normalize firmware defaults so the documented primary targets and local flash
flows stop drifting away from the checked-in PlatformIO defaults.

## Included Outputs

- `B:\ohmic\agent-system\requests\ready\2026-03-16-normalize-firmware-default-target-and-port-safety-wave.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-align-amplab-platformio-default-env-with-documented-primary-target.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-parameterize-firmware-upload-and-monitor-port-over-hardcoded-com4.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-record-safe-local-firmware-build-and-flash-instructions-after-normalization.md`

## Unified Outcome

The firmware repos are structurally promising, but default env and port choices
still drift from the documented intended flow. This wave makes the local build
and flash path safer by:

- aligning the default target with documented intent
- removing or parameterizing hardcoded local port assumptions
- writing down the safe operator flow after normalization

## Most Important Truth

This is about operational safety and repeatability, not redesigning firmware
architecture.

## Audit Finding

Repo truth before this slice:

- `amplab-firmware/README.md` documented `esp32s3` as the primary target
- `amplab-firmware/platformio.ini` still defaulted to
  `cyd_2432s028_display`
- both `amplab-firmware` and `cyd-remote` still hardcoded `COM4` for
  `upload_port` and `monitor_port`

That meant the checked-in defaults no longer matched the documented intended
target and still carried one workstation-specific serial-port assumption.

## What Changed

In `B:\ohmic\repos\amplab-firmware`:

- aligned `default_envs` back to `esp32s3`
- removed tracked hardcoded `COM4` values from the CYD display env
- documented explicit build, flash, and monitor commands with a runtime
  `<PORT>` choice

In `B:\ohmic\repos\cyd-remote`:

- removed tracked hardcoded `COM4` values
- documented explicit `--upload-port <PORT>` and `--port <PORT>` usage

## Operator Rule

Firmware repos should not carry a checked-in workstation-specific serial port.

Use:

- `pio run -e <ENV>` for build
- `pio run -e <ENV> -t upload --upload-port <PORT>` for flash
- `pio device monitor -b 115200 --port <PORT>` for serial monitor

## Verification

Run after normalization:

- `pio run -e esp32s3` in `amplab-firmware`
- `pio run -e cyd24r` in `cyd-remote`

Result:

- `amplab-firmware` `esp32s3` build passed in `00:00:43.380`
- `cyd-remote` `cyd24r` build passed in `00:00:28.420`

The safer defaults now build cleanly without requiring a checked-in serial-port
assumption.
