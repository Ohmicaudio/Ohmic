# Run live audio route preference validation

## Goal

Use the new shared `media.route.preference.set` runtime contract to validate at least one real audio path end-to-end on live hardware.

## Inputs

- DSP BLE parity is live and confirmed through Fire logs
- route preference runtime/status is now shared across firmware, web, and Fire BLE UI
- Fire app exposes compact route-preference controls

## Deliverable

- one documented live route validation result covering:
  - selected route preference
  - selected source
  - observed DSP subscriber topic / active topic
  - whether actual audio transport matched the intended route

## Preferred order

1. `remote.bt.wifi.dsp`
2. `direct.wifi.dsp`
3. `direct.bt.dsp`
