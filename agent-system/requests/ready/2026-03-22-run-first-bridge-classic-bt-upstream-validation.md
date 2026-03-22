---
title: Run first bridge classic BT upstream validation
owner: Codex
status: ready
topic: bridge-classic-bt-upstream-validation
date: 2026-03-22
---

# run-first-bridge-classic-bt-upstream-validation

## Goal

Use the now-rediscovered headless bridge as the real classic Bluetooth ingest
node and validate the first live `phone.bt -> bridge -> DSP` transport run.

## Current floor

- DSP is live at `192.168.1.113`
- bridge is live at `192.168.1.149`
- backend `/api/network/ohmic/discover` can rediscover the bridge on LAN
- bridge reports:
  - `transport.ws_connected = true`
  - `media.stream_state = subscribed`
  - `media.subscribe_topic = audio.remote.phone.bt`
  - `classic_bt_audio.transport_ready = true`
  - `classic_bt_audio.connected = false`
- DSP reports:
  - `connection.ws.clients = 1`
  - `stream.state = subscribed`
  - `stream.subscribe_topic = audio.remote.phone.bt`
  - `stream.event_count = 0`

## Required device state

- Fire tablet active
- Fire paired to `OHMIC-BRIDGE-F7A608`
- audio playing from the Fire over classic Bluetooth

## Validation steps

1. pair/connect the Fire to `OHMIC-BRIDGE-F7A608`
2. start audio playback on the Fire
3. poll bridge status until:
   - `classic_bt_audio.connected = true`
   - `classic_bt_audio.streaming = true`
4. poll bridge media status until:
   - `stream_event_count` increases
   - `stream_active_topic = audio.remote.phone.bt`
5. poll DSP status until:
   - `stream.event_count` increases
   - `stream.active_topic = audio.remote.phone.bt`
6. confirm audible playback at the DSP output

## Success looks like

- bridge and DSP both observe rising `audio.remote.phone.bt` activity
- bridge transport remains connected to DSP
- DSP playback becomes audible
