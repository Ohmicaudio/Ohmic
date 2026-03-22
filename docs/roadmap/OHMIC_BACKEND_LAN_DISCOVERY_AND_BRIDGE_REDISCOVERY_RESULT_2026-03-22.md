# OHMIC Backend LAN Discovery And Bridge Rediscovery Result

Date: 2026-03-22
Owner: Codex

## Summary

Added a backend LAN discovery operator path that reads the local ARP table,
probes candidate `/api/status` endpoints, and returns live Ohmic devices.

This was immediately used to rediscover the missing headless bridge on LAN
without Android and without USB serial.

## Code landed

- `ohmic-audio-labs`
  - `services/backend/src/ohmicLanDiscovery.ts`
  - `services/backend/src/index.ts`
  - `test/backend/ohmicLanDiscovery.test.ts`

## Operator contract

- New backend route:
  - `GET /api/network/ohmic/discover`

The route:

1. reads `arp -a` from the host
2. probes candidate `http://<ip>/api/status` endpoints
3. returns only successful Ohmic-shaped devices

## Validation

Focused checks:

- `vitest run test/backend/ohmicLanDiscovery.test.ts test/backend/liveLinkProxyDiagnostics.test.ts`
- `npm run type-check`

Live backend discovery result:

```text
status = 200
count = 1
responseTime = 11629.79 ms
```

Rediscovered device:

```text
ip = 192.168.1.149
mac = 08-a6-f7-70-54-d0
schema = ohmic.bridge.status
device_id = OHMIC-BRIDGE-F7A608
unit_id = bridge-wroom32-F7A608
node_kind = bridge
runtime_role = audio_bridge
station_ssid = NETGEAR54
target.host = 192.168.1.113
transport.ws_connected = true
media.stream_state = subscribed
media.stream_reason = awaiting remote upstream events
media.subscribe_topic = audio.remote.phone.bt
media.stream_event_count = 0
classic_bt_audio.connected = false
classic_bt_audio.transport_ready = true
```

Matching DSP live truth at `192.168.1.113`:

```text
connection.ws.clients = 1
stream.state = subscribed
stream.subscribe_topic = audio.remote.phone.bt
stream.event_count = 0
stream.active_topic = ""
runtime.media_source.kind = remote.hub
runtime.media_source.upstream = phone.bt
```

## What this means

- the bridge is not missing anymore; it is alive on LAN
- bridge -> DSP control/data-plane subscription is up
- DSP now sees the bridge as a live WS client
- the remaining missing input is a real classic Bluetooth upstream source

So the main blocker has moved again:

- no longer Android UI
- no longer DSP HTTP reachability
- no longer bridge discovery
- now specifically: no live BT audio source feeding the bridge

## Next

1. activate a classic Bluetooth source for the bridge, likely the Fire tablet
2. pair/connect that source to `OHMIC-BRIDGE-F7A608`
3. start audio playback
4. confirm bridge `classic_bt_audio.connected = true`
5. confirm `audio.remote.phone.bt` event counts rise
6. confirm DSP `stream.active_topic` and audible playback
