Date: 2026-03-19
Status: done
Project: amplab-firmware

# Ohmic Live Remote FFT Bridge Validation Result

## Summary

The BLE headless AmpLab build can now retarget its remote DSP/WebSocket client
at runtime, attach to a live upstream FFT producer, and cache canonical
`measure.fft.frame` metadata for the BLE transport lane without claiming a fake
local ADC source.

## What Landed

- delayed remote `WebSocketsClient` construction so BLE startup no longer trips
  an early boot crash
- runtime rebind of the remote client when `sys.network.target.set` is received
  over BLE or the runtime transport
- compact `runtime.remote_fft` summary in `api/status/core` so live frame-source
  readiness can be verified directly on the board

## Live Verification

- reflashed the live AmpLab on `COM19`
- started a mock upstream WebSocket FFT producer on `192.168.1.91:8765`
- sent live `sys.network.target.set` to the running board without reboot
- verified the mock producer logged a real client attach and the startup query:
  - `sys.status.core`
  - `sys.info`
  - `sys.capabilities`
  - `dsp.state.live`
  - `dsp.state.staged`
  - `dsp.stream.subscribe` with `topic=measure.fft.frame`
- verified live board status:
  - `plugins.remote.active=true`
  - `network.target.host=192.168.1.91`
  - `network.target.port=8765`
  - `runtime.remote_fft.available=true`
  - `runtime.remote_fft.unit_id=mock-dsp-1`
  - `runtime.remote_fft.local_sample_counter=3`
  - `runtime.remote_fft.fft_size=64`
  - `runtime.remote_fft.bin_count=32`

## Current Live Truth

- the remote FFT bridge is no longer theoretical; the live board is attached to
  a real upstream producer and caching canonical frame metadata
- `measurement_adc` remains correctly disabled because the source is remote-only
- the remaining packet is Fire-side end-to-end validation of the bridged
  `measure.fft.frame` stream on the BLE card
