# OHMIC Bridge LAN Join Result

Date: 2026-03-22
Owner: Codex

## Summary

The bridge on `COM26` successfully joined the intended LAN over the backend
serial operator path.

This means the bridge-first operator floor is now fully capable of:

- discovering Wi-Fi
- accepting credentials
- saving the network profile
- joining LAN
- preserving the intended target host

## Live validation

Joined network:

```text
SSID: NETGEAR54
Station IP: 192.168.1.149
Saved profile: true
```

Resulting bridge status:

```text
network.mode = peer_lan_live
network.station_active = true
network.station_ssid = NETGEAR54
network.station_ip = 192.168.1.149
network.has_saved_network = true
network.saved_ssid = NETGEAR54
target.host = 192.168.1.113
target.port = 80
target.class = lan_live
target.fits_current_network = true
target.route_note = LAN live target
```

Bridge media/runtime truth after join:

```text
source_id = phone.bt
route_preference_id = remote.bt.wifi.dsp
stream_state = idle
stream_reason = classic bt sink unavailable
stream_event_count = 0
```

Refresh command also succeeded after join:

```text
[conn] Target probe requested
reason = refresh requested
```

## What this means

The bridge is no longer blocked on setup/onboarding/control.

The remaining gap has moved forward to the actual media/data plane:

- no classic BT audio source is connected yet
- no `audio.remote.*` traffic is being observed
- no audible playback path is proven yet

## Remaining follow-on

1. verify target host behavior beyond target classification
2. connect a real classic BT audio source to the bridge
3. confirm `stream_state` leaves `idle`
4. confirm `audio.remote.*` traffic and rising event counts
5. validate audible downstream playback
