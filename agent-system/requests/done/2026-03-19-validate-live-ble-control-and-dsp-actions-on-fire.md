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

## Result

- live Fire validation confirms:
  - volume changes round-trip over BLE
  - mute changes round-trip over BLE
  - stream actions remain explicitly unsupported on the live runtime
- recorded in:
  - `docs/roadmap/OHMIC_LIVE_FIRE_BLE_CONTROL_AND_DSP_VALIDATION_RESULT_2026-03-19.md`

## Ready When

- complete
