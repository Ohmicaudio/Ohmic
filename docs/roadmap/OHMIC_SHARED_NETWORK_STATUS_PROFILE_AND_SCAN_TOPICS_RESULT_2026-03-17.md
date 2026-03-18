Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Shared Network Status Profile And Scan Topics Result

The producer firmware now exposes shared network read paths over the transport
envelope instead of only through page-specific HTTP routes.

## What Landed

- `sys.network.status`
- `sys.network.profiles`
- `sys.network.scan`

These topics are served from the shared producer-side firmware runtime in
`amplab-firmware/src/main.cpp`.

## Verification

- `./tools/pio run -e esp32s3_dsp`
- `./tools/pio run -e cyd_2432s028_display`
- live DSP flashed on `COM27`
- live WebSocket probe against `ws://192.168.1.113/ws` returned:
  - `sys.network.status` with AP, STA, join, and `network.target.*` truth
  - `sys.network.profiles` with the current saved-profile list
  - `sys.network.scan` with honest running state on first request

## Result

- network read truth is now available through the shared firmware envelope
- UI surfaces can query network state without owning route-specific logic
- scan/profile state no longer has to be inferred from button-local behavior
