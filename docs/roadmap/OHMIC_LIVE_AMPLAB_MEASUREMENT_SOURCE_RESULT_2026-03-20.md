Date: 2026-03-20
Status: done
Project: amplab-firmware

# Ohmic Live AmpLab Measurement Source Result

## Summary

The live AmpLab BLE headless runtime now exposes a real local measurement source
instead of a fake `measurement_adc` capability flag.

## What Was Changed

- enabled `OHMIC_HAS_MEASUREMENT_ADC=1` on the live AmpLab envs
- replaced the stubbed `setupAnalogADC()` path with a real basic-node ADC setup
- added live sampling for:
  - supply sense on GPIO4 with the documented divider scale
  - signal sense on GPIO7 as a basic RMS floor
- surfaced the source in `api/status/core.runtime.measurement_source`
- replaced zeroed BLE telemetry fields with live `dc_v` and `sig_in_vrms`
- extended the Fire BLE support layer to parse and render the new
  `measurement_source` summary from `sys.status.core`

## What Was Verified

- app typecheck passed
- `test/services/amplabBleSupport.test.ts` passed
- `esp32s3_ble_headless` firmware build completed successfully
- live firmware upload to `COM19` completed successfully
- Fire Android bundle sync and `installDebug` completed successfully
- live board status now reports:
  - `capabilities.measurement_adc=true`
  - `runtime.measurement_source.available=true`
  - `runtime.measurement_source.kind=adc.basic`
  - non-zero `runtime.measurement_source.sample_counter`
  - live `dc_v` / `signal_vrms` values

## Current Live Truth

- AmpLab now has one honest local measurement producer on the real BLE runtime
- the remaining local measurement gap is no longer the basic ADC floor
- the next honest gap is a real local DSP-side `measure.fft.frame` source
