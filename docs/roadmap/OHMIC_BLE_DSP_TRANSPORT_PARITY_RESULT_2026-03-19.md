Date: 2026-03-19
Status: done
Project: amplab-firmware

# Ohmic BLE DSP Transport Parity Result

## Summary

The Fire BLE lane now speaks the same DSP control topic family as the broader
AmpLab WS and HTTP control paths instead of relying only on BLE-specific mute
and volume commands.

## What Landed

- BLE capabilities now advertise:
  - `dsp.state.live`
  - `dsp.param.stage`
  - `dsp.apply`
  - `dsp.stream.subscribe`
- firmware now accepts BLE `dsp.param.stage` operations for:
  - `audio.master.volume_norm`
  - `audio.master.mute.state`
- firmware now publishes `dsp.state.live` after BLE connect and after control
  mutations alongside the compact BLE control snapshot
- Fire BLE surface now requests `dsp.state.live` and uses it as another source
  of control truth
- Fire BLE control actions now stage volume and mute through `dsp.param.stage`
  and can issue `dsp.apply`
- BLE network connect and profile-select acks now immediately fan out refreshed
  `sys.network.status` and `sys.network.profiles`

## Verification

- `npm run type-check`
- `npx vitest run test/services/amplabBleSupport.test.ts test/services/amplabBleCommands.test.ts test/services/amplabBleDspTransport.test.ts`
- `platformio run -e esp32s3_ble_headless`
- live firmware reflash on `COM19`
- live Fire sync and `installDebug`

## Current Live Truth

- BLE setup/control is no longer limited to bespoke transport commands
- BLE can now ask for shared DSP live state and stage shared DSP control targets
- live profile/join validation remains the next board packet
