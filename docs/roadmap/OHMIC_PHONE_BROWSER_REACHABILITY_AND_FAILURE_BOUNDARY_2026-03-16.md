Status: validation_note
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Phone Browser Reachability And Failure Boundary

## Scope

Reconfirm the truthful browser/device boundary before attempting another
phone-assisted AmpLab rerun.

## Current Reachability Truth

Still true from the prior verified phone pass:

- the LAN-served UI host is reachable from a handset browser
- the handset browser can reach the sync/backend surface

Still true in the current packet:

- the desktop-hosted browser shell at `http://127.0.0.1:4175/` is live
- the known device remains reachable directly at `http://192.168.1.113/api/status`

## New Boundary Findings

This machine currently exposes multiple local IP identities, including:

- `192.168.1.91`
- `192.168.137.1`
- `192.168.56.1`

The live shell is still allowing self-host contamination into device discovery.
That means the failure edge is no longer basic LAN reachability. The failure edge
is the point where browser-side candidate discovery mixes:

- host-side addresses
- stale `*.local` aliases
- firmware AP identity
- live station/LAN identity

without producing one stable link target.

## Phone-State Note

The currently connected Fire tablet was visible to `adb`, but the on-device dump
captured the lock screen, not the app. This packet therefore did not produce a
new honest phone-browser in-app screenshot.

That does not move the failure edge back to phone reachability. It only means
the current packet did not add fresh on-screen phone evidence beyond the already
validated LAN browser reachability work from 2026-03-15.

## Honest Failure Boundary

The current truthful failure boundary is:

- not phone Wi-Fi reachability
- not browser access to the app host
- not direct device HTTP reachability
- but browser-side live-link candidate normalization

That is the layer to fix before the next bounded phone rerun.
