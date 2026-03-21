## OHMIC Remote Route Preference Controller Parity Result

Date: 2026-03-20

Summary:
- expanded the CYD remote Actions screen to cover all shared audio route preferences
- added dedicated handheld actions for:
  - `remote.bt.wifi.dsp`
  - `direct.wifi.dsp`
  - `direct.bt.dsp`
  - `remote.assisted.mesh`
- kept the three main source selectors on the same screen:
  - `phone.bt`
  - `sd.local`
  - `usb.local`

Repos:
- `cyd-remote`
- `ohmic`

Why this mattered:
- the broader stack already understood four routing preferences, but the handheld remote only exposed two of them
- that left transport behavior partially controllable from the Fire/app but not from the handheld operator surface

Implementation notes:
- `ui_actions.cpp` now uses a denser three-column action layout
- route controls are surfaced as `BT->WiFi`, `Direct`, `Dir BT`, and `Concert`
- source controls remain `Phone`, `SD`, and `USB`

Validation:
- `pio run -e cyd24r`
- `pio run -e cyd24r -t upload --upload-port COM16`

Result:
- remote handheld transport control now reaches source selection plus full route preference parity on-device
- this closes another control-plane gap ahead of the first transport/audio validation wave
