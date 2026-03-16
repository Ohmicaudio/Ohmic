Status: validation_note
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Live Device Candidate Discovery Truth

## Scope

Re-establish the truthful candidate set for the current live AmpLab device after
the first `Ohmic Live Link` extraction slice.

## Verified Inputs

- direct device status at `http://192.168.1.113/api/status`
- desktop browser shell at `http://127.0.0.1:4175/`
- browser local storage for live-link candidate state

## Direct Device Truth

The live device reports:

- `ap_ip = 192.168.4.1`
- `connection.sta.ip = 192.168.1.113`
- `ssid = AmpLab-SIM`
- `transport_mode = ap+sta-http-serial-can`

This means the device currently exposes two different identities:

- firmware AP identity at `192.168.4.1`
- station/LAN identity at `192.168.1.113`

## Browser Candidate Truth

The browser-side stored candidate state was:

- `ohmic_live_link_known_endpoints_v1 = ["http://amplab.local"]`
- `ohmic_amplab_known_endpoints_v1 = ["http://amplab.local"]`
- `ohmic_live_device_candidates_v1 = ["http://amplab.local"]`
- `amplab_ip = null`

After a live `Refresh Devices` action in the shell:

- the UI reported `Discovery: 1 device(s) detected`
- the visible linked label became `amp-24DA5ED4DB1C (AmpLab-SIM)`
- the visible select list still did not contain:
  - `192.168.1.113`
  - `192.168.4.1`

The visible select list was dominated by self-host or stale names such as:

- `127.0.0.1`
- `127.0.0.1:4175`
- `ampmaster.local`
- `ohmiclab.local`

The most honest read is:

- the current desktop browser can resolve `amplab.local`
- that alias is carrying the live device on desktop
- the candidate model still never promotes the explicit LAN or AP identities

## Honest Conclusion

The browser is not holding a truthful live candidate set yet.

It knows enough to surface one live device label through the alias path, but it
is still failing to normalize the actual device identities that matter:

- the AP address `192.168.4.1`
- the current LAN address `192.168.1.113`

That makes discovery truth incomplete and non-portable even before the next
phone-assisted rerun.

## Immediate Follow-On

The next fix lane should normalize candidate identity around:

- AP-only firmware identity
- current LAN identity
- alias-only live paths
- host/hub self-candidates
