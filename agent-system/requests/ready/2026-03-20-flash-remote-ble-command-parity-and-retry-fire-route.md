scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-20
requester: user
origin: agent
priority: high
blocking: no
depends_on:
- 2026-03-18-run-ble-setup-auth-and-ota-runway-wave.md
- 2026-03-20-wire-live-dsp-measure-frame-source-for-ble-transport.md
handoff_from:
claim_id:
topic: remote-fire-ble-command-parity
queue_epoch:
review_after:
review_status: current
supersedes:

# Flash remote BLE command parity and retry Fire route

## Goal

Flash the already-built remote BLE command parity patch once `COM16` is free, then retry Fire route/source controls against the remote.

## Expected validation

- remote no longer replies `unknown cmd` for:
  - `sys.status.core`
  - `media.source.select`
  - `media.route.preference.set`
- Fire BLE card shows remote route/source state instead of generic ack errors

## Scope

- B:\ohmic\repos\ohmic-audio-labs\services\hardware\ble\*
- B:\ohmic\repos\ohmic-audio-labs\components\Hardware\*
- B:\ohmic\repos\amplab-firmware\src\main.cpp

## Constraints

- keep the slice bounded to command parity and retry verification
- avoid widening into Wi-Fi media transport work in this packet

## Notes

- this packet is part of the live remote/audio transport lane and should stay visible to the project-filtered board

## Ready When

- the packet is classified as `ohmic-audio-labs` ready work with explicit scope and dependency context

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-audio-labs\services\hardware\ble\*
- B:\ohmic\repos\ohmic-audio-labs\components\Hardware\*
- B:\ohmic\repos\amplab-firmware\src\main.cpp
