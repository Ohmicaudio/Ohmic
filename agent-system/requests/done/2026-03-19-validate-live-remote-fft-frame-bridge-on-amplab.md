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
- 2026-03-19-wire-real-amplab-measurement-source-for-ble-transport.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: ble-remote-fft-bridge-validation
queue_epoch:
review_after:
review_status: current
supersedes:

# validate-live-remote-fft-frame-bridge-on-amplab

## Requested Outcome

- prove that the BLE headless AmpLab build can bridge a real upstream
  `measure.fft.frame` producer into the Fire BLE card
- validate the end-to-end path with a real remote DSP/WebSocket source rather
  than a fake local ADC claim

## Scope

- `repos/amplab-firmware/src/dsp/*`
- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/platformio.ini`
- `repos/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx`
- `repos/ohmic-audio-labs/services/hardware/amplab/bleSupport.ts`

## Constraints

- keep `measurement_adc` disabled until a real local source exists
- preserve the already-working Fire BLE setup/control/telemetry lanes
- emit canonical `measure.fft.frame.body.bins_db`

## Notes

- the bridge slice is implemented locally:
  - BLE headless now enables the remote DSP/WebSocket client
  - latest remote FFT frame is cached in firmware
  - BLE stream routing supports `measure.fft.frame`
  - Fire card can request and parse canonical FFT frames
- live validation against a real upstream producer is complete

## Ready When

- the remote FFT bridge is validated live against a real upstream producer and
  the Fire BLE lane can subscribe to it
