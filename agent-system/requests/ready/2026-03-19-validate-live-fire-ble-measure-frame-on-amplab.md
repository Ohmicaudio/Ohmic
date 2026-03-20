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
- 2026-03-19-validate-live-remote-fft-frame-bridge-on-amplab.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-measure-frame-fire-validation
queue_epoch:
review_after:
review_status: current
supersedes:

# validate-live-fire-ble-measure-frame-on-amplab

## Requested Outcome

- prove that the Fire BLE card can request and render bridged
  `measure.fft.frame` traffic from the live AmpLab remote-source bridge
- keep the validation on the real Fire + AmpLab path rather than a board-only
  status check

## Scope

- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `repos/ohmic-audio-labs/services/hardware/amplab/bleSupport.ts`
- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/src/dsp/dsp_state.*`

## Constraints

- preserve the already-working BLE setup, control, telemetry, and profile lanes
- keep `measurement_adc` disabled while the source remains remote-only
- prefer canonical `measure.fft.frame.body.bins_db`

## Notes

- board-side bridge is now live and verified:
  - runtime target can be changed without reboot
  - remote WebSocket client attaches to a live upstream producer
  - `api/status/core.runtime.remote_fft` reports cached frame metadata
- the remaining gap is Fire-side end-to-end visualization / validation

## Ready When

- Fire BLE card receives and renders `measure.fft.frame` from the live AmpLab
- or the exact Fire-side UI / transport blocker is isolated with logs
