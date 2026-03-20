scope: project
authority: working
project: amplab-firmware
status: ready
requested: 2026-03-20
requester: user
origin: live-fire-ble-lane
priority: high
blocking: no
depends_on:
- 2026-03-19-wire-real-amplab-measurement-source-for-ble-transport.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: amplab-dsp-measure-frame-source
queue_epoch:
review_after:
review_status: current
supersedes:

# wire-live-dsp-measure-frame-source-for-ble-transport

## Requested Outcome

- replace the remote-only/local-none `measure.fft.frame` path with a real local
  DSP-side or I2S-backed source on AmpLab
- keep the new basic ADC telemetry floor as the honest local measurement source
  while the higher-rate frame source is wired

## Scope

- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/src/dsp/*`
- `repos/amplab-firmware/src/core/*status*`
- `repos/amplab-firmware/platformio.ini`
- `repos/amplab-firmware/docs/PINOUT_CANONICAL_V1.md`

## Constraints

- preserve the now-working BLE setup/control/telemetry/remote-FFT lanes
- do not fake local FFT frames
- prefer the documented current prototype digital-audio route when possible

## Notes

- the basic local measurement source is now real:
  - `measurement_adc=true`
  - `runtime.measurement_source.kind=adc.basic`
  - BLE telemetry carries live `dc_v` and `sig_in_vrms`
- the remaining local analysis gap is above that floor:
  - current local `measure.fft.frame` still depends on the remote bridge
  - canonical pinout notes point to the current prototype digital-audio route
    from APM2 `J4` into ESP32 `GPIO11/13/1/2`

## Ready When

- a real local DSP-side `measure.fft.frame` source exists on AmpLab, or the
  exact hardware/firmware dependency needed to create it is isolated precisely
