# OHMIC Bridge Target Probe Timeout Result

Date: 2026-03-22
Owner: Codex

## Summary

After joining the bridge to `NETGEAR54`, the next meaningful probe was the
target host itself.

That probe timed out consistently from the host side, which means the current
WS/media stall is not only a bridge-control issue. The target at
`192.168.1.113` is not answering the expected HTTP surface within the current
timeout window.

## Live validation

Bridge state reached:

```text
station_active = true
station_ssid = NETGEAR54
station_ip = 192.168.1.149
target.host = 192.168.1.113
target.class = lan_live
target.fits_current_network = true
```

Host-side backend proxy probes all timed out:

```text
GET http://192.168.1.113/api/status            -> 504 device_probe_timeout
GET http://192.168.1.113/api/sys/status.core   -> 504 device_probe_timeout
GET http://192.168.1.113/                      -> 504 device_probe_timeout
```

Backend route truth returned:

```text
error = device_probe_timeout
routeTruth = probe_timeout
targetContext = private_lan
localSubnetMatch = true
```

## What this means

- bridge onboarding/control is no longer the main blocker
- bridge can join LAN and hold the intended target
- the current target is not answering the expected HTTP surface from the host
- bridge media state remaining idle is therefore consistent with the target not
  being reachable enough for downstream WS/media behavior

## Remaining blockers

1. target host `192.168.1.113` needs to be made reachable or corrected
2. classic BT audio source still needs to be attached to the bridge

## Next

1. verify what device or service should actually own `192.168.1.113`
2. confirm it exposes the intended API/WS surface
3. re-run bridge refresh and probe after target reachability is fixed
4. then validate real `audio.remote.*` traffic and audible playback
