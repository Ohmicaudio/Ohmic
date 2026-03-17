Date: 2026-03-17
Status: done
Project: firmware

# Ohmic DSP Board Misflash Correction Note

## Summary

The live validation notes recorded earlier on 2026-03-17 as "AmpLab live"
were taken from the DSP-wired board on `COM27`, not from an attached AmpLab.

The root mistake was operational, not transport-side:

- the DSP-wired board was attached on `COM27`
- AmpLab was physically unplugged
- the active `esp32s3` target had already been stamped with AmpLab identity
  flags
- that image was flashed to the DSP hardware and then verified on
  `192.168.1.113`

So the observed HTTP/Wi-Fi/status behavior was real, but the physical board
identity was mislabeled in the written result.

## What Was Corrected

- a real DSP target was added: `esp32s3_dsp`
- the DSP target now reports:
  - `node_kind = dsp_1701`
  - `board_profile = dsp_apm2_esp32s3`
  - `hardware_family = ESP32_S3_SIGMADSP`
  - recovery AP `OHMIC-DSP-SETUP`
- the DSP target no longer leaks legacy AmpLab identifiers in the hybrid status
  wrapper
- the DSP prototype display path was corrected back to the documented
  protoboard display data/command pin so the local panel came back up

## Current Truth

- `COM27` is the DSP-wired board
- `192.168.1.113` is currently the DSP board on LAN
- `/api/status/core` now reports the proper DSP identity
- `/api/status` now reports `topic = dsp.status`
- the DSP local display is back after correcting the display D/C pin override

## Affected Notes

These notes should be read with this correction in mind:

- `docs/roadmap/OHMIC_LIVE_AMPLAB_NETWORK_AND_STATUS_FLOOR_CARRY_FORWARD_RESULT_2026-03-17.md`
- `docs/roadmap/OHMIC_LIVE_AMPLAB_WIFI_PROFILE_AND_CONNECT_FLOOR_CARRY_FORWARD_RESULT_2026-03-17.md`

They remain useful as carry-forward implementation notes, but the physical
hardware identity for that live validation pass was DSP hardware, not AmpLab.
