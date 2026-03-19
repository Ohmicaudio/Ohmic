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
- 2026-03-19-validate-ble-profile-select-and-join-on-live-amplab.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-live-control-validation
queue_epoch:
review_after:
review_status: current
supersedes:

# validate-live-ble-control-and-dsp-actions-on-fire

## Requested Outcome

- BLE volume, mute, stream, and DSP action paths are validated on the actual
  Fire + AmpLab board instead of only by code-level parity checks.
- Resulting control/runtime truth is recorded in docs/roadmap.

## Scope

- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `repos/amplab-firmware/src/main.cpp`
- `docs/roadmap/*BLE*`

## Constraints

- keep the now-stable BLE connect/profile/join/scan path intact
- validate against the actual Fire and actual AmpLab board

## Notes

- BLE control and DSP command parity already landed in code.
- This request is the live validation packet for that command family.

## Ready When

- Fire live validation shows BLE control and/or DSP actions working, or the
  precise remaining blocker is documented
