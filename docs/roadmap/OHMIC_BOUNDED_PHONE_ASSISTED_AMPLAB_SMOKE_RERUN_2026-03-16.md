Status: operator_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Bounded Phone-Assisted AmpLab Smoke Rerun

## Goal

Provide the next smallest honest phone-assisted AmpLab smoke packet using the
current Windows host truth and the corrected AP-only rule for firmware devices.

## Source Of Record

Windows host truth is the source of record for this packet when WSL and Windows
probe outcomes diverge.

## Current Truth

- the browser shell floor is recovered
- the Fire tablet is back on `adb`
- this rerun does not require the Fold to be present
- the current live host-side inputs are now:
  - `http://192.168.1.115:4175`
  - `http://192.168.1.115:8787`
- stale host-side `192.168.1.91` links should not be reused for the next rerun
- `http://192.168.1.113/api/status` still times out from the current Windows
  host context
- `http://192.168.1.115:8787/api/proxy?url=http://192.168.1.113/api/status`
  currently returns `504 device_probe_timeout`

## AP Rule

`http://192.168.4.1` is only meaningful when the current client is attached to
the device-generated Ohmic AP.

From the current Windows host context there is no `192.168.4.0/24` route, so
`192.168.4.1` should be treated as an AP-only conditional diagnostic, not as
the general reopen gate for this packet.

## Next Smoke Inputs

- UI host: `http://192.168.1.115:4175`
- backend host: `http://192.168.1.115:8787`
- session: `OHMIC-LIVE`
- on-phone steps:
  - open `AmpLab`
  - tap `Refresh Units`
  - tap `Link Unit`

## Honest Outcome

- the packet is ready to rerun from the correct Windows host inputs
- the remaining LAN device timeout is now a narrow live diagnostic, not the
  reason to keep the whole handset/browser packet blocked before rerun
- any `192.168.4.1` check must only happen when the current client is actually
  on the device AP

## Packet Status

`ready_for_rerun`
