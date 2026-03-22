# OHMIC Bridge Live Scan And Target Result

Date: 2026-03-22
Owner: Codex

## Summary

The live bridge on `COM26` now has:

- a persisted manual target host through the backend serial operator path
- truthful serial command readback without false negatives
- working Wi-Fi scan completion through bridge status

This closes the hidden bridge-control bugs and leaves one explicit remaining gap:
the bridge still needs LAN credentials before WS/audio transport can come up.

## What changed

- backend serial helper wait window was extended so slower bridge replies are not
  misreported as missing
- bridge status now polls `wifi_scan_done()` before exporting scan state, so
  scans settle to either:
  - `scan_running = false, scan_failed = false, scan_results = [...]`
  - or `scan_running = false, scan_failed = true`

## Live validation

Validated against the bridge on `COM26` through the backend serial routes.

Confirmed live target persistence:

```text
target.host = 192.168.1.113
target.port = 80
target.persisted = true
target.class = manual_target
target.route_note = Manual target without LAN
```

Confirmed live Wi-Fi scan completion:

```text
[wifi] scan complete: 3 network(s)
```

Returned scan results:

```text
onn 5_1_2 SOUNDBAR_283713C24D04   rssi=-37  encryption=0
NETGEAR54                         rssi=-39  encryption=3
DIRECT-OqMAINPCmsTC               rssi=-57  encryption=3
```

Resulting bridge status truth:

```text
network.mode = device_ap_recovery
network.has_saved_network = false
network.scan_running = false
network.scan_failed = false
network.target.host = 192.168.1.113
network.target.fits_current_network = false
```

## Why this matters

- the bridge operator lane is now credible enough for real bring-up work
- the target host is no longer lost or ambiguously applied
- Wi-Fi scan behavior is now observable and actionable instead of looking hung
- the remaining blocker is clearly network credentials, not hidden control-plane
  debt

## Next

1. choose the intended bridge LAN
2. provide credentials for that SSID
3. join the bridge over the backend serial path
4. confirm WS connects to `192.168.1.113:80`
5. validate real `audio.remote.*` traffic and audible playback
