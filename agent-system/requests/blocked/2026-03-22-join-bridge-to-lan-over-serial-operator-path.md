---
title: Join bridge to LAN over serial operator path
date: 2026-03-22
topic: bridge-lan-join-over-serial-operator-path
status: blocked
owner: codex
---

# join-bridge-to-lan-over-serial-operator-path

## Goal

Use the new backend serial operator path to join the bridge on `COM26` to the
intended LAN, then confirm the target host and WS path become reachable for the
audio data plane.

## Current truth

- bridge serial operator path is live
- target host is persisted as `192.168.1.113:80`
- bridge Wi-Fi scan completes and exposes nearby SSIDs
- bridge is still in `device_ap_recovery`
- `has_saved_network = false`

## Blocker

The bridge needs credentials for the intended LAN before the operator path can
continue into WS/audio validation.

Observed SSIDs:

- `onn 5_1_2 SOUNDBAR_283713C24D04` (open)
- `NETGEAR54` (secured)
- `DIRECT-OqMAINPCmsTC` (secured)

## Next when unblocked

1. choose the intended bridge LAN
2. provide credentials
3. call `network.connect` over the backend serial operator path
4. confirm station join and WS connect to `192.168.1.113:80`
5. validate real `audio.remote.*` traffic and audible playback
