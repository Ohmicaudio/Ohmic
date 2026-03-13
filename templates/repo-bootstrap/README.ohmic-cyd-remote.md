# Ohmic CYD Remote

Handheld firmware for the `ESP32-2432S024R` CYD control surface.

This repo is the working handheld/UI side of the Ohmic system. It is not the full backend, not the Android/web app, and not the old AmpLab simulator firmware.

## Current Role

This device is the physical companion screen:

- fast handheld control surface
- live system/status monitor
- RTA/visual page
- DSP/control entry point
- settings, Wi-Fi, SD, LED utility pages

Canonical screen ring:

- `Control`
- `Info`
- `RTA`
- `DSP`
- `Settings`
- `Map`

Bottom dock behavior is canonical:

- left = previous page
- center = mute
- right = next page

## Firmware Stack

- ESP32 Arduino
- LVGL v9
- `TFT_eSPI` for the working CYD24R display/touch path
- ArduinoJson
- WebSockets client transport

Main environment:

- `cyd24r`

Primary board profile:

- `ESP32-2432S024R`
- ILI9341 TFT
- XPT2046 resistive touch
- SD card
- RGB LED

## Source Layout

### Core runtime

- `src/main.cpp`
- `src/cyd_display.*`

### System services

- `src/sys_ws.*`
- `src/sys_wifi.*`
- `src/sys_sdcard.*`
- `src/sys_led.*`
- `src/sys_control.*`
- `src/sys_ui_prefs.*`

### UI

- `src/ui_nav.*`
- `src/ui_theme.*`
- `src/ui_dsp.*`
- `src/ui_monitor.*`
- `src/ui_visual.*`
- `src/ui_dsp_advanced.*`
- `src/ui_settings.*`
- `src/ui_home.*`
- `src/ui_wifi.*`
- `src/ui_led.*`
- `src/ui_files.*`

## Build

```bash
pio run -e cyd24r
```

Flash:

```bash
pio run -e cyd24r -t upload
```

Serial monitor:

```bash
pio device monitor -b 115200
```

## Important Docs

- `docs/CYD24R_BRINGUP_AND_WORKING_GUIDE_2026-03-12.md`
- `docs/CYD_HANDHELD_PRODUCT_BRIEF.md`
- `docs/OHMIC_CANONICAL_DEVICE_CONTRACT_DRAFT_2026-03-12.md`
- `docs/ohmic-firmware-handoff/`

## Migration Rule

Do not reintroduce dead display-stack baggage during migration.

The live handheld stack is `LVGL v9 + TFT_eSPI`. Local-only noise such as `.pio/`, `.claude/`, `.vscode/`, `skills/`, and saved flash binaries should stay out of the clean repo.
