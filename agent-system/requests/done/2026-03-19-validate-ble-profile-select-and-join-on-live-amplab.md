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
- 2026-03-19-close-ble-control-state-vs-runtime-status-parity.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-live-join-validation
queue_epoch:
review_after:
review_status: current
supersedes:

# validate-ble-profile-select-and-join-on-live-amplab

## Requested Outcome

- Saved profile select, WiFi scan, and queued BLE join are verified against the
  live AmpLab board from the Fire.
- Resulting status truth is recorded in docs/roadmap and no longer inferred
  from isolated command acks.

## Scope

- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `repos/amplab-firmware/src/main.cpp`
- `docs/roadmap/*BLE*`

## Constraints

- validate on the actual Fire and actual AmpLab board
- preserve the current stable BLE connect path while testing join/profile
  actions

## Result

- Fire live validation now confirms:
  - selected profile truth is rendered from BLE
  - joined-state truth is rendered from BLE compact status
  - Wi-Fi scan settles to final results on-card instead of sticking on `running`
- recorded in:
  - `docs/roadmap/OHMIC_LIVE_FIRE_BLE_JOIN_AND_SCAN_VALIDATION_RESULT_2026-03-19.md`

## Ready When

- complete
