---
title: Verify or correct bridge target host 192.168.1.113
date: 2026-03-22
topic: verify-or-correct-bridge-target-host-192-168-1-113
status: blocked
owner: codex
---

# verify-or-correct-bridge-target-host-192-168-1-113

## Goal

Confirm that `192.168.1.113` is the correct target for the bridge and that it
is exposing the expected HTTP/WS surface for downstream media behavior.

## Current truth

- bridge joined `NETGEAR54`
- bridge station IP is `192.168.1.149`
- bridge target is persisted as `192.168.1.113:80`
- bridge target is classified as `lan_live`
- bridge media state is still idle

## Blocker

Host-side backend probes to `192.168.1.113` all timed out:

- `/api/status`
- `/api/sys/status.core`
- `/`

So the bridge is currently aimed at a target that is not answering the expected
surface within the live-link timeout window.

## Next when unblocked

1. verify whether `192.168.1.113` is still the intended target
2. correct the bridge target if needed
3. confirm the target answers HTTP/WS probes
4. re-run bridge refresh and transport validation
5. then continue with BT audio source validation
