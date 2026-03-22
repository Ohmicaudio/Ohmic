# OHMIC Backend Proxy DSP HTTP Result 2026-03-22

## Summary
- Confirmed the DSP at `192.168.1.113` is alive on LAN, serving both:
  - `/api/status`
  - `/api/status/core`
- Fixed the backend `/api/proxy` path so it no longer reports a live DSP as unreachable just because the JSON body is slower than the old 2-second unified timeout.

## What Was Wrong
- The old backend proxy used one `AbortSignal.timeout(2000)` across:
  - connect / headers
  - body read / JSON parse
- In practice the DSP could return `HTTP 200` headers while the full JSON body still arrived slowly enough to trip the shared timeout.
- That created a false `device_probe_unreachable` / `device_probe_timeout` posture.

## What Changed
- Split the proxy timing into:
  - short connect/header timeout
  - longer body-read timeout
- Added regression coverage in:
  - `test/backend/liveLinkProxyDiagnostics.test.ts`

## Validation
- Direct Windows curl:
  - `http://192.168.1.113/api/status` returned `200`
  - `http://192.168.1.113/api/status/core` returned `200`
- Backend serial DSP status on `COM27` returned `200`
- Real backend runtime check through `tsx`:
  - `GET /api/proxy?url=http://192.168.1.113/api/status`
  - returned `200`

## Current Truth
- DSP boot: stable
- DSP Wi-Fi: live on `NETGEAR54`
- DSP LAN IP: `192.168.1.113`
- DSP HTTP: live
- Backend proxy to DSP: live

## Remaining Next Step
- Reintroduce the next device in the transport path, likely the bridge, and validate real target/control/audio behavior against the now-working DSP HTTP surface.
