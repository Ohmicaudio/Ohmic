# OHMIC Bridge Operator Workflow

Date: 2026-03-22
Owner: Codex
Status: active workflow

## Purpose

Run the bridge bring-up and audio transport path without relying on Android taps.

## Current control floor

Available operator paths:

- bridge local serial JSON contract on `COM26`
- backend serial operator routes
- bridge HTTP API once the bridge is reachable over network

Current live truth:

- bridge port: `COM26`
- target host: `192.168.1.113:80`
- target persisted: `true`
- bridge mode: `device_ap_recovery`
- saved Wi-Fi: `false`

## Workflow

### 1. Discover bridge port

Use the backend bridge serial port path or Windows COM enumeration.

Done today:

- confirmed bridge on `COM26`

### 2. Read bridge status

Use:

- `GET /api/bridge/serial/status?port=COM26`

Verify:

- `schema = ohmic.bridge.status`
- `network.mode`
- `network.has_saved_network`
- `network.target.host`
- `media.source_id`
- `media.route_preference_id`

Done today:

- status readback verified live

### 3. Scan Wi-Fi

Use:

- `POST /api/bridge/serial/command`
  - `{ "port": "COM26", "command": { "cmd": "network.scan" } }`

Then re-read:

- `GET /api/bridge/serial/status?port=COM26`

Verify:

- `scan_running = false`
- `scan_failed = false`
- `scan_results = [...]`

Done today:

- scan completion verified live
- observed SSIDs:
  - `onn 5_1_2 SOUNDBAR_283713C24D04`
  - `NETGEAR54`
  - `DIRECT-OqMAINPCmsTC`

### 4. Set target host

Use:

- `POST /api/bridge/serial/command`
  - `{ "port": "COM26", "command": { "cmd": "network.target", "host": "192.168.1.113", "port": 80, "persisted": true } }`

Then re-read status and verify:

- `target.host = 192.168.1.113`
- `target.persisted = true`

Done today:

- target persistence verified live

### 5. Join intended LAN

Use:

- `POST /api/bridge/serial/command`
  - `{ "port": "COM26", "command": { "cmd": "network.connect", "ssid": "<SSID>", "pass": "<PASSWORD>", "save": true } }`

Then poll status until:

- `station_active = true`
- `station_ssid = <SSID>`
- `fits_current_network = true`

Blocked today:

- credentials not yet provided

### 6. Confirm WS target reachability

Use:

- `POST /api/bridge/serial/command`
  - `{ "port": "COM26", "command": { "cmd": "refresh" } }`

Then poll status and confirm:

- bridge no longer reports AP-only posture
- target summary no longer says manual target without LAN
- WS target becomes reachable

### 7. Validate audio transport

Confirm:

- `audio.remote.*` traffic appears
- `stream_event_count` rises
- actual audible playback occurs

### 8. Only then involve Android/UI polish

After the operator path works cleanly, the Android app can be treated as a thin
surface instead of a required bring-up dependency.

## Next unblock

The only hard external dependency remaining in this workflow is:

- the intended SSID and credentials for the bridge LAN join
