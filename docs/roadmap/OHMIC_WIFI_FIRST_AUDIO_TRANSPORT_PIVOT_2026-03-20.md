Date: 2026-03-20
Status: ready
Project: ohmic-audio-labs

# Ohmic Wi-Fi-First Audio Transport Pivot

## Summary

The BLE rescue/foundation lane is now stable enough that the next main product
priority should move to Wi-Fi-first audio transport instead of deeper BLE media
work.

## Product Direction

- Wi-Fi is the primary audio transport
- the remote unit is the source hub for:
  - phone Bluetooth ingest
  - SD card playback
  - USB playback
- BLE remains responsible for:
  - setup
  - trust
  - control
  - rescue
  - last-resort fallback audio only when needed

## Why This Shift Is Correct

- the live Fire + AmpLab BLE path is now real for scan, connect, setup,
  control, telemetry, and measurement validation
- the user clarified that the remote DSP/ESP hardware is not meant to become
  the main media transport backbone
- one digital audio path into the DSP module does not justify centering the
  product around BLE audio or ad hoc local-only routing

## Next Execution Focus

- define remote-side source arbitration between phone Bluetooth, SD, USB, and
  Wi-Fi publishing
- define the shared Wi-Fi HiFi audio transport contract
- define the node playback/subscription path
- keep OTA staged after the same trust/authority and media-control floor
