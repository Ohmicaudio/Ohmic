# Masterfirmware Internal Split Progress

Date: 2026-03-13
Status: active

## What changed

The internal split has started inside `/mnt/a/masterfirmware`.

### New explicit module boundaries

#### DSP layer

- `/mnt/a/masterfirmware/src/dsp/dsp_state.hpp`
- `/mnt/a/masterfirmware/src/dsp/dsp_state.cpp`
- `/mnt/a/masterfirmware/src/dsp/ws_client.hpp`
- `/mnt/a/masterfirmware/src/dsp/ws_client.cpp`

#### Remote DSP UI

- `/mnt/a/masterfirmware/src/ui/remote/ui_remote.hpp`
- `/mnt/a/masterfirmware/src/ui/remote/ui_remote.cpp`

#### Platform display

- `/mnt/a/masterfirmware/src/platform/display/lgfx_display.hpp`
- `/mnt/a/masterfirmware/src/platform/display/lgfx_display.cpp`

#### Local AmpLab UI

- `/mnt/a/masterfirmware/src/ui/local/ui_home.hpp`
- `/mnt/a/masterfirmware/src/ui/local/ui_home.cpp`
- `/mnt/a/masterfirmware/src/ui/local/ui_dashboard.hpp`
- `/mnt/a/masterfirmware/src/ui/local/ui_dashboard.cpp`
- `/mnt/a/masterfirmware/src/ui/local/ohmic_logo.cpp`

### Integration repairs already completed

- `main.cpp` now uses the real DSP callback/update path
- `measure.fft.frame` parsing now prefers canonical `bins_db` with legacy `bins` fallback
- local display/runtime includes now point at explicit platform/UI module paths

## Verification

Build verified with PlatformIO target:

- `esp32s3`

Result:

- success
- RAM ~31.2%
- Flash ~39.6%

## What this means

The split is no longer just architectural intent.

The repo now has a real internal separation between:

- AmpLab/platform/runtime glue
- DSP contract/transport/state
- platform display plumbing
- local AmpLab LVGL UI
- remote DSP UI consumer

## Next likely cleanup targets

- reduce misleading simulator/dashboard language in the root docs
- decide which root `src/` files stay AmpLab-specific
- promote the DSP layer as the seed for `amplab-firmware`
