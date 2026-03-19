scope: project
authority: working
project: amplab-firmware
status: done
requested: 2026-03-19
requester: user
origin: live-fire-ble-lane
priority: high
blocking: no
depends_on:
- 2026-03-19-close-live-ble-stream-source-gap-on-amplab.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-audio-telemetry-transport
queue_epoch:
review_after:
review_status: current
supersedes:

# prototype-live-ble-audio-telemetry-transport-on-amplab

## Requested Outcome

- move the live BLE lane beyond control-state streaming toward actual audio or
  telemetry transport parity
- define one honest next transport packet that the Fire can validate without
  pretending BLE audio is already solved

## Scope

- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/src/core/*transport*`
- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `repos/ohmic-audio-labs/services/hardware/amplab/*`
- `docs/roadmap/*BLE*`

## Constraints

- preserve the now-stable legacy BLE stack and Fire onboarding/control path
- keep using shared command families instead of inventing BLE-only side schemas
- do not label control-state streaming as real audio transport unless a true
  telemetry or sample/analysis payload is flowing

## Notes

- live stream start/stop over BLE is now working and validated
- next step is a real follow-on transport packet, likely telemetry-first, that
  proves more than control-state updates

## Ready When

- complete

## Result

- live Fire validation now shows:
  - `Telemetry Stream` starts `amplab.telemetry` over BLE
  - repeated `RX amplab.telemetry` on-card
  - firmware status moves to `streaming` with
    `subscribe_topic=amplab.telemetry`
  - `STREAM STOP` returns both card and firmware state to `idle`
