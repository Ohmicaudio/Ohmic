scope: project
authority: working
project: amplab-firmware
status: ready
requested: 2026-03-19
requester: user
origin: live-fire-ble-lane
priority: high
blocking: no
depends_on:
- 2026-03-19-prototype-live-ble-audio-telemetry-transport-on-amplab.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-measurement-frame-transport
queue_epoch:
review_after:
review_status: current
supersedes:

# prototype-live-ble-measurement-frame-transport-on-amplab

## Requested Outcome

- move the live BLE lane beyond compact telemetry into one real measurement or
  analysis frame family
- prove a transport slice that is closer to actual audio/runtime parity than
  control-state or compact telemetry alone

## Scope

- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/src/core/*transport*`
- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `repos/ohmic-audio-labs/services/hardware/amplab/*`
- `docs/roadmap/*BLE*`

## Constraints

- preserve the stable Fire BLE scan/connect/setup/control lane
- preserve the now-working `amplab.telemetry` topic flow
- do not label a slice as audio transport unless a real measurement or analysis
  frame is flowing

## Notes

- live BLE telemetry transport is now validated on the Fire card
- the next honest step is a measurement-frame or analysis-frame packet rather
  than more control-state repackaging

## Ready When

- one concrete live BLE measurement or analysis frame transport slice is
  implemented and validated on the Fire + AmpLab path, or the exact blocker is
  isolated
