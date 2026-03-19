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

- BLE transport is live and stable now; remaining work is parity and polish.

## Ready When

- BLE control updates map cleanly into normalized status/control truth
- Fire card can show the resulting state without relying on raw log text

## Suggested Claim Scope

- mobile BLE onboarding/control card
- BLE notification parser
- firmware BLE reply writers
