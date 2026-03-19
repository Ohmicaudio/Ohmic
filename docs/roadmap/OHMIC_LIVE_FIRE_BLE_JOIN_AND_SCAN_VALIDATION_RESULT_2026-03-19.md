Date: 2026-03-19
Status: done
Project: ohmic-audio-labs

# Ohmic Live Fire BLE Join And Scan Validation Result

## Summary

The Fire BLE onboarding card now completes the saved-profile and Wi-Fi scan
validation path on the live AmpLab board instead of stalling in a transport-only
state.

## What Landed

- compact BLE network status now carries join text through `body.j`
- Fire/mobile BLE card now keeps polling `sys.network.scan` long enough to
  survive the real AmpLab Wi-Fi scan duration
- manual `Scan WiFi` resets the BLE scan poll budget so repeated scans do not
  inherit stale retry state

## Live Verification

- synced and reinstalled the `BLEFIX-20260319-1834` Fire build
- reflashed live AmpLab on `COM19`
- verified BLE card reaches `CONNECTED`
- verified profile state on-card:
  - `JOINED NETGEAR54`
  - `Join Connected to NETGEAR54`
  - `STA NETGEAR54`
  - `join=Connected to NETGEAR54 sta=NETGEAR54`
- verified live Wi-Fi scan now settles on-card instead of sticking on `running`
  - `WiFi scan results=4`
  - `WIFI SCAN 4 found`

## Evidence

- live page marker:
  - `BLEFIX-20260319-1834`
- Fire screenshots:
  - `tmp/fire_1834_connect.png`
  - `tmp/fire_1834_scan_wifi_start.png`

## Current Live Truth

- BLE scan, connect, saved profile truth, joined-state truth, and Wi-Fi scan
  settle all work on the actual Fire + AmpLab path
- BLE setup is now past “basic transport only” and into live provisioning-state
  validation

## Remaining Gap

- BLE control and DSP actions now exist over the same transport, but they still
  need a dedicated live validation packet on the Fire surface
