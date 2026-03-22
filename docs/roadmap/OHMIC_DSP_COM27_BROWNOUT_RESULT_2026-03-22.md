# OHMIC DSP COM27 Brownout Result 2026-03-22

## Summary
- Ran the new backend DSP serial status route live against `COM27`.
- The route itself worked and returned real serial diagnostics.
- The DSP did not answer `sys.network.status` because it is stuck in a repeated brownout boot loop.

## Live Result
- Backend route returned `502`
- Error: `dsp_serial_response_missing`
- Serial diagnostics repeatedly showed:
  - `rst:0xf (BROWNOUT_RST)`
  - `boot:0x2b (SPI_FAST_FLASH_BOOT)`
- No valid `ohmic.dsp.firmware.transport.v1` reply was observed on `COM27`

## Meaning
- The old `192.168.1.113` target assumption is not the current blocker.
- The DSP is not getting far enough through boot to expose a usable serial transport reply or a LAN address.
- Bridge-target work and Android setup work are downstream from this problem.

## Next Step
- Stabilize DSP power/boot on `COM27`
- Then rerun:
  - `GET /api/dsp/serial/status?port=COM27`
  - `POST /api/dsp/serial/command` with `sys.network.connect`
  - `POST /api/dsp/serial/command` with `sys.network.target.set`
