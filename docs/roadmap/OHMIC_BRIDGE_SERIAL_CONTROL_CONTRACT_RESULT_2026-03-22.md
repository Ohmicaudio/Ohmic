# OHMIC Bridge Serial Control Contract Result

Date: 2026-03-22
Owner: Codex

## Summary

The headless audio bridge now exposes a direct serial JSON-line control contract
on `COM26` that reuses the same underlying actions as the bridge HTTP API.

This gives bridge bring-up, onboarding, route selection, source selection,
transport control, refresh, and status readback a device-local path that does
not depend on the Android app or preexisting network reachability.

## What landed

- shared bridge-control module:
  - `src/sys_bridge_control.cpp`
  - `src/sys_bridge_control.hpp`
- line-oriented serial command surface:
  - `src/sys_serial_bridge.cpp`
  - `src/sys_serial_bridge.hpp`
- bridge runtime now starts and updates the serial contract from
  `src/audio_bridge_main.cpp`
- bridge HTTP handlers now call the shared control functions instead of
  duplicating action logic in `src/sys_http_bridge.cpp`
- bridge `platformio.ini` now includes the shared control sources in the
  `wroom32_audio_bridge` build filter

## Live validation

Validated on live bridge hardware at `COM26`.

Observed boot/runtime truth:

```text
[diag] heap=53472 wifi=0 ssid=-- join=0 ws=0 host= ble_source=phone.bt route=remote.bt.wifi.dsp bt=0 avrc=0 frames=0
```

Observed serial commands and responses:

```json
{"cmd":"help"}
{"ok":true,"schema":"ohmic.bridge.serial.result","cmd":"help", ...}

{"cmd":"health"}
{"ok":true,"service":"ohmic-audio-bridge","schema":"ohmic.bridge.serial.result","cmd":"health"}

{"cmd":"status"}
{"ok":true,"schema":"ohmic.bridge.status","cmd":"status", ...}

{"cmd":"refresh"}
{"ok":true,"schema":"ohmic.bridge.serial.result","cmd":"refresh","reason":"refresh requested"}
```

Also validated honest blocked-control behavior before a target host is set:

```json
{"cmd":"media.source","source_id":"phone.bt"}
{"ok":false,"schema":"ohmic.bridge.serial.result","cmd":"media.source","code":"command_rejected","message":"media source select blocked"}

{"cmd":"media.route","preference_id":"direct.wifi.dsp"}
{"ok":false,"schema":"ohmic.bridge.serial.result","cmd":"media.route","code":"command_rejected","message":"route preference blocked"}
```

Matching serial diagnostics:

```text
[conn] Source blocked: target host offline  |  phone.bt
[conn] Route blocked: target host offline  |  direct.wifi.dsp
```

## Why this matters

- critical setup and recovery no longer depend on Android tap reliability
- the bridge now has a real local operator/control lane
- control rejection is surfacing true transport posture instead of implying the
  data plane is live
- HTTP and serial are now two skins over the same bridge-control actions, which
  reduces drift and future tech debt

## Next

- add bridge serial commands for target host setup and Wi-Fi join to the active
  validation flow
- use the serial lane to bring the bridge onto the real network and point it at
  the target host
- validate real `audio.remote.*` transport activity and first audible bridge
  playback
