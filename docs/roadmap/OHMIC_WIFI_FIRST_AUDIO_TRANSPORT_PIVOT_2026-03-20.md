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
- the DSP unit is the primary consumer of the digital audio stream
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

## Current Bench Assumption

- the DSP prototype already exposes its digital audio lane to the ESP for test
  and bring-up work
- treat that lane as bench validation for the DSP-first audio path, not as a
  reason to move media ownership away from the remote hub

## AmpLab Audio Output Position

- AmpLab should not be treated as a primary ecosystem media-source product lane.
- Its main value is still setup, control, measurement, and bench/reference work.
- A simple `2 Vrms` analog output is acceptable only if AmpLab remains a
  utility or single-amp local-output path.
- If AmpLab-generated test tones or local audio are expected to match the real
  DSP playback/reference level model, AmpLab should move toward the same DAC and
  analog output-stage class used on the DSP family.
- The point is level and calibration parity, not “AmpLab as the main audio
  streamer.”
- Current hardware assumption remains that the existing I2S-style digital audio
  lane can already carry stereo, so this does not automatically imply a second
  digital audio data wire.

## Why This Shift Is Correct

- the live Fire + AmpLab BLE path is now real for scan, connect, setup,
  control, telemetry, and measurement validation
- the DSP unit already occupies the real digital-consumer role in the hardware
  plan, so AmpLab should not accumulate transport ownership that belongs to the
  remote-plus-DSP path
- the user clarified that the remote DSP/ESP hardware is not meant to become
  the main media transport backbone
- one digital audio path into the DSP module does not justify centering the
  product around BLE audio or ad hoc local-only routing

## Next Execution Focus

- define remote-side source arbitration between phone Bluetooth, SD, USB, and
  Wi-Fi publishing
- define the shared Wi-Fi HiFi audio transport contract
- define the node playback/subscription path
- keep the remote-hub media-source contract explicit in app code so web and
  Fire surfaces stay aligned while firmware grows into the same model
- extend runtime status so remote-hub producer, DSP consumer, and Wi-Fi / HiFi
  route-class truth are first-class fields instead of inference from one
  `remote.stream` placeholder
- keep generic source/transport presentation in shared hardware surfaces rather
  than letting it drift back into AmpLab-owned UI
- keep source-option libraries, transport labels, and media-source presentation
  on one shared app model so the web hardware workspace and Fire BLE surface
  cannot drift apart
- keep OTA staged after the same trust/authority and media-control floor
