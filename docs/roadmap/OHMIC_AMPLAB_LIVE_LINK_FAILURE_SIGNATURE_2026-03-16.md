Status: validation_note
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic AmpLab Live Link Failure Signature

## Stable Signature

The current failure signature is:

1. the live device is directly reachable at `192.168.1.113`
2. the device itself reports:
   - `ap_ip = 192.168.4.1`
   - `sta.ip = 192.168.1.113`
3. browser-side candidate storage is still seeded only by `http://amplab.local`
4. the shell refresh path reports a detected device
5. the visible selectable candidate list still omits both:
   - `192.168.1.113`
   - `192.168.4.1`
6. the candidate list is polluted by host/self or stale alias entries instead

## Why This Matters

This distinguishes the current issue from older, broader failures:

- the device is not offline
- the app host is not offline
- the browser is not unable to scan at all

The problem is narrower:

- `Ohmic Live Link` is collapsing or projecting device identity through the wrong
  candidate surfaces
- alias-only live data and self-host addresses survive long enough to distort
  the real portable link target

## User-Visible Shape

The browser shell can show a live-looking device label such as
`amp-24DA5ED4DB1C (AmpLab-SIM)` while still offering a misleading select list
that does not contain the real LAN or AP identity.

That is the exact mismatch to compare future reruns against.

## Fix Target

Future regression checks should fail if any of these are true:

- the only stored live candidate is an alias with no explicit AP/LAN companion
- the live device's `sta.ip` is not promoted into the candidate set
- the AP identity is silently lost when AP-mode fallback is still relevant
- self-host addresses are surfaced as if they were real hardware candidates
