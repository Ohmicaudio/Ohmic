scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-19
requester: user
origin: live-fire-ble-lane
priority: high
blocking: no
depends_on:
- 2026-03-19-validate-live-ble-control-and-dsp-actions-on-fire.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-live-stream-gap
queue_epoch:
review_after:
review_status: current
supersedes:

# close-live-ble-stream-source-gap-on-amplab

## Requested Outcome

- BLE stream actions move beyond explicit `unsupported` responses on the live
  AmpLab board.
- Fire surface can validate real stream runtime truth, not only mute/volume.

## Scope

- `repos/amplab-firmware/src/main.cpp`
- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `docs/roadmap/*BLE*`

## Constraints

- preserve the now-stable BLE scan/connect/profile/join/control lanes
- use the actual Fire and AmpLab board for the final validation packet

## Notes

- current live truth already proves BLE volume and mute parity
- current remaining blocker is `stream source not implemented`

## Ready When

- Fire live validation shows real BLE stream start/stop behavior or the exact
  remaining runtime blocker is documented
