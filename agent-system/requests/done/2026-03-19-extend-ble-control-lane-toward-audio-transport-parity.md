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
- 2026-03-19-close-ble-control-state-vs-runtime-status-parity.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-audio-transport-parity
queue_epoch:
review_after:
review_status: current
supersedes:

# extend-ble-control-lane-toward-audio-transport-parity

## Requested Outcome

- BLE control moves beyond setup/basic control toward the same audio/control transport family used by WS/HTTP paths.
- stream and control semantics stop being BLE-only special cases.

## Scope

- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/src/core/*transport*`
- `repos/ohmic-audio-labs/services/hardware/amplab/*`

## Constraints

- keep the working legacy BLE stack path stable on this hardware
- avoid inventing a separate BLE-only control schema if existing command families can be reused

## Notes

- completed with transport parity notes in
  `docs/roadmap/OHMIC_BLE_DSP_TRANSPORT_PARITY_RESULT_2026-03-19.md`

## Ready When

- complete

## Suggested Claim Scope

- complete
