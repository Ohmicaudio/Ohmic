Date: 2026-03-17
Status: done
Project: firmware

# Ohmic Live AmpLab WiFi Profile And Connect Floor Carry-Forward Result

## Summary

The live AmpLab shared-runtime branch now exposes a real Wi-Fi profile and
enrollment floor instead of placeholder-only routes.

## What Landed

- `/api/wifi/status` now reports profile count, selected profile, join target,
  join status, and scan state
- `/api/wifi/profiles` now returns real saved profiles from preferences
- `/api/wifi/scan` now runs a real async scan and returns real network results
- `/api/wifi/add` and `/api/wifi/delete` now persist and remove saved profiles
- `/api/wifi/connect` and `/api/wifi/select` now queue real join actions instead
  of returning `501`
- `/api/wifi/ap` now performs a real AP enable/disable action

## Live Verification

- flashed live AmpLab on `COM27`
- verified `http://192.168.1.113/api/wifi/status`
- verified `http://192.168.1.113/api/wifi/profiles`
- verified async scan completion on `http://192.168.1.113/api/wifi/scan`
- verified dummy profile add/delete without knocking the device off LAN
- verified route-contract errors:
  - `/api/wifi/select?id=0` returns `404` when no saved profile exists
  - `/api/wifi/connect` returns `400` when `ssid` is missing
- verified `./tools/pio run -e esp32s3`
- verified `./tools/pio run -e cyd_2432s028_display`

## Current Live Truth

- AmpLab stayed live at `192.168.1.113` throughout validation
- scan returned real nearby SSIDs including `AmpLab-SIM` and `NETGEAR54`
- saved profile persistence is now real and visible through the live HTTP
  surface

## Remaining Gap

I did not run a destructive credentialed rejoin cycle against the live LAN
network in this pass. The command path is now real, but the final proof for
selected-profile reconnect should be done as a dedicated live validation slice.
