Status: done
Priority: high
Date: 2026-03-16
Project: firmware
Owner: d
Claim ID: 20260316T111900Z-5a71c3de

# Parameterize Firmware Upload And Monitor Port Over Hardcoded COM4

## Goal

Remove or parameterize hardcoded `COM4` assumptions in the firmware repos so
local flashing stops depending on one workstation-specific port.

## Source

- `docs/roadmap/OHMIC_FIRMWARE_TARGET_AND_PORT_SAFETY_NORMALIZATION_WAVE_2026-03-16.md`

## Acceptance

- hardcoded local port assumptions are identified in the active firmware repos
- the preferred parameterization path is implemented or documented
- the change reduces accidental wrong-port flashing risk

## Result

- removed checked-in `upload_port = COM4` / `monitor_port = COM4` from:
  - `B:\ohmic\repos\amplab-firmware\platformio.ini`
  - `B:\ohmic\repos\cyd-remote\platformio.ini`
- normalized the operator path to explicit runtime port selection through:
  - `pio run -e <ENV> -t upload --upload-port <PORT>`
  - `pio device monitor -b 115200 --port <PORT>`
