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
- 2026-03-19-prototype-live-ble-measurement-frame-transport-on-amplab.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: amplab-measurement-source
queue_epoch:
review_after:
review_status: current
supersedes:

# wire-real-amplab-measurement-source-for-ble-transport

## Requested Outcome

- replace the fake `measurement_adc` capability claim with a real AmpLab
  measurement source
- create one honest runtime producer that can later be carried over BLE as a
  measurement or analysis frame

## Scope

- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/src/core/*status*`
- `repos/amplab-firmware/platformio.ini`
- `docs/roadmap/*BLE*`

## Constraints

- preserve the now-working BLE setup/control/DSP live/telemetry path
- do not re-enable `measurement_adc` until a real source exists
- prefer a source that can eventually map into canonical measurement envelopes

## Notes

- live measurement source is now implemented:
  - `setupAnalogADC()` configures the documented basic-node ADC pins
  - `api/status/core.runtime.measurement_source` reports `adc.basic`
  - `amplab.telemetry` now carries live `dc_v` and `sig_in_vrms`
- Fire-side parser/render support for the new summary is in the current bundle

## Ready When

- a real measurement source exists in runtime status/transport, or the hardware
  dependency needed to build it is isolated precisely
