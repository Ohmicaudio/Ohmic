Date: 2026-03-19
Status: done
Project: amplab-firmware

# Ohmic Live Fire BLE Measurement Frame Blocker Result

## Summary

The next BLE lane was supposed to move from compact telemetry into a real
measurement or analysis frame. The exact blocker is now isolated: the live
AmpLab firmware still advertises `measurement_adc`, but there is no implemented
measurement source behind that claim.

## What Was Verified

- `setupAnalogADC()` in [main.cpp](/mnt/b/ohmic/repos/amplab-firmware/src/main.cpp)
  is still an empty stub
- the headless and BLE headless AmpLab envs were compiling with
  `-DOHMIC_HAS_MEASUREMENT_ADC=1`
- no real measurement frame producer was found in the live headless runtime
- the visible RTA path in firmware is still demo/UI-side, not a real exported
  measurement source for BLE transport

## What Changed

- corrected AmpLab PlatformIO envs so they no longer advertise measurement ADC
  until a real source exists:
  - `esp32s3`
  - `esp32s3_headless`
  - `esp32s3_ble_headless`
  - `esp32s3_ble_probe`

## Current Truth

- BLE setup, control, DSP live state, and compact telemetry transport are real
- a true BLE measurement-frame lane is blocked by missing firmware source data,
  not by BLE transport anymore

## Next Honest Packet

- implement a real AmpLab measurement source first, likely by wiring actual ADC
  capture or another concrete analysis producer into the runtime
- only then carry that frame family over BLE
