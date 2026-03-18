Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Shared Network Connect And Target Actions Result

The producer firmware now exposes command-first network actions over the shared
transport envelope instead of leaving them only in route handlers.

## What Landed

- `sys.network.connect`
- `sys.network.profile.select`
- `sys.network.target.set`
- `sys.network.ap.set`

These topics are served from `amplab-firmware/src/main.cpp`.

## Verification

- `./tools/pio run -e esp32s3_dsp`
- `./tools/pio run -e cyd_2432s028_display`
- live DSP flashed on `COM27`
- live WebSocket probe against `ws://192.168.1.113/ws` returned:
  - `sys.network.connect` with `status = invalid` and `reason = ssid is required`
  - `sys.network.target.set` with `status = ok` and current recovery-target route truth

## Result

- network actions now exist as real firmware-envelope commands
- connect and target changes can be invoked by any future surface through the
  same runtime contract
- button handlers no longer need to be the conceptual owner of these actions
