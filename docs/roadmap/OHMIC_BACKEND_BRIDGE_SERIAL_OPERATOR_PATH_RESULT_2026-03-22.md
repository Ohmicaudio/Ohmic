# OHMIC Backend Bridge Serial Operator Path Result

Date: 2026-03-22
Owner: Codex

## Summary

The backend now exposes the bridge serial JSON contract as a host/operator API,
so bridge setup and status can be driven without Android taps and without
manually opening a serial terminal.

## What landed

- backend serial control module:
  - `services/backend/src/bridgeSerialControl.ts`
- checked-in PowerShell serial helper:
  - `services/backend/tools/bridge-serial-command.ps1`
- backend routes:
  - `GET /api/bridge/serial/status?port=COM26`
  - `POST /api/bridge/serial/command`
- frontend/backend bridge service helpers:
  - `requestBridgeSerialStatus`
  - `requestBridgeSerialCommand`
- focused tests:
  - `test/backend/bridgeSerialControl.test.ts`
  - updated `test/services/bridgeApi.test.ts`

## Live validation

Validated against the live bridge on `COM26` through backend route injection.

Observed:

```text
STATUS 200
response.schema = ohmic.bridge.status
response.network.mode = device_ap_recovery
response.network.has_saved_network = false
response.network.target.host = ""
response.media.source_id = phone.bt
response.media.route_preference_id = remote.bt.wifi.dsp

REFRESH 200
response.schema = ohmic.bridge.serial.result
response.reason = refresh requested
diagnostics = [conn] Target probe requested
```

## Why this matters

- bridge control is no longer trapped behind Android reliability issues
- host/operator tooling can now use the same bridge JSON schema as the device
- serial and HTTP are both now reachable from the backend as first-class control
  paths
- the system can advance toward Wi-Fi join, target setup, and transport bring-up
  without needing UI-only interactions

## Remaining live gap

The bridge is still honestly reporting:

- `network.mode = device_ap_recovery`
- `has_saved_network = false`
- `target.host = ""`

So the next real bring-up step is not more control-plane work. It is:

1. set Wi-Fi credentials through the bridge serial/backend path
2. set the target host through the same path
3. confirm WS comes up
4. validate real `audio.remote.*` transport activity and audible playback
