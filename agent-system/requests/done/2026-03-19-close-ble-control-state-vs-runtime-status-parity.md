scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-19
requester: user
origin: live-fire-ble-lane
priority: high
blocking: no
depends_on:
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-control-runtime-parity
queue_epoch:
review_after:
review_status: current
supersedes:

# close-ble-control-state-vs-runtime-status-parity

## Requested Outcome

- BLE control actions surface the resulting runtime truth, not just transport acks.
- Fire/mobile BLE surfaces reflect mute, stream, and control posture using the same shared-core semantics used elsewhere.

## Scope

- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `repos/ohmic-audio-labs/services/hardware/amplab/*`
- `repos/amplab-firmware/src/main.cpp`

## Constraints

- keep BLE payloads compact enough to stay stable on the current Fire/AmpLab lane
- do not regress the now-working BLE connect/setup path

## Notes

- completed with live Fire evidence in
  `docs/roadmap/OHMIC_LIVE_FIRE_BLE_CONTROL_AND_PROFILE_PARITY_RESULT_2026-03-19.md`

## Ready When

- complete

## Suggested Claim Scope

- complete
