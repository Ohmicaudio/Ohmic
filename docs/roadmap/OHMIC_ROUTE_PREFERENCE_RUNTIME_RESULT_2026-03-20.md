# OHMIC Route Preference Runtime Result

Date: 2026-03-20

## What landed

- shared firmware core now accepts `media.route.preference.set`
- shared core status now reports `runtime.media_source.preference_id` and `preference_detail`
- DSP headless build was rebuilt and flashed live on `COM27`
- web DSP workspace and PhoneLab route card now share one routing-preference model
- Fire BLE card now exposes compact route-preference controls on the live BLE path

## Why it matters

- route preferences are no longer only implied by scattered leadership toggles
- DSP BLE parity is good enough to move from connect triage into actual route steering
- we now have one contract for:
  - `remote.bt.wifi.dsp`
  - `direct.wifi.dsp`
  - `direct.bt.dsp`
  - `remote.assisted.mesh`

## Checks

- app `type-check`
- focused Vitest pack covering audio transport + BLE support
- `pio run -e esp32s3_dsp_headless`
- live flash to `COM27`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- use the new route-preference contract to run the first real remote-ingest audio path test
- confirm which path is actually active:
  - Fire BT -> remote -> Wi-Fi -> DSP
  - direct Wi-Fi -> DSP
  - direct BT -> DSP fallback
