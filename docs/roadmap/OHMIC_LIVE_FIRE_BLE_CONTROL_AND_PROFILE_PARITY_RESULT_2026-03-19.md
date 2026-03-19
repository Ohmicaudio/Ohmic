Date: 2026-03-19
Status: done
Project: ohmic-audio-labs

# Ohmic Live Fire BLE Control And Profile Parity Result

## Summary

The Fire BLE onboarding card is no longer limited to bare transport success. It
now shows connected BLE control state and saved profile truth from the real
AmpLab board.

## What Landed

- Fire/mobile BLE card now renders `amplab.control.state`
- firmware now publishes BLE control state after connect and after basic control
  commands
- Fire/mobile BLE card now renders saved Wi-Fi profile truth from
  `sys.network.profiles`
- BLE control command coverage on the real firmware now includes:
  - `stream.start`
  - `stream.stop`
  - `mute.on`
  - `mute.off`
  - `volume.set`

## Live Verification

- reflashed live AmpLab on `COM19`
- synced and reinstalled Fire build
- verified BLE card reaches `CONNECTED`
- verified BLE log shows:
  - `RX amplab.control.state`
  - `Control vol=100% mute=off stream=missing`
  - `RX sys.network.profiles`
  - `Profiles 1 selected=NETGEAR54`
- verified Fire screenshot:
  - `tmp/fire_ble_boardflow.png`

## Current Live Truth

- BLE control feedback is no longer ack-only
- Fire can see the real selected Wi-Fi profile over BLE
- BLE setup/control is now past “basic transport only” and into runtime parity

## Remaining Gap

- live BLE scan/join interaction still needs a dedicated validation pass on the
  Fire surface
- BLE control is still behind WS/HTTP for broader audio/runtime parity
