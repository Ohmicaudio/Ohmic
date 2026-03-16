Status: validation_note
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Device Endpoint Blocker Recheck Result

## Scope

Recheck the current live device blocker from the truthful Windows host context,
capture the current direct and proxy-side observations, and make one honest
reopen-or-stay-blocked decision for the next phone-assisted smoke pass.

## Current Windows Host Truth

Observed from the Windows host on `2026-03-16`:

- `Wi-Fi = 192.168.1.115/24`
- `Wi-Fi 2 = 169.254.194.39/16`
- default route is `0.0.0.0/0 -> 192.168.1.1` on `Wi-Fi`
- local LAN route is `192.168.1.0/24` on `Wi-Fi`
- there is no `192.168.4.0/24` route from the current host

That makes Windows host truth, not stale WSL-local failure context, the source
of record for the current LAN smoke packet.

## Backend Host Truth

The live backend status surface is healthy again from the current host:

- `http://127.0.0.1:8787/api/status` returned `200`
- `http://192.168.1.115:8787/api/status` returned `200`

Current status payload:

- `preferredIp = 192.168.1.115`
- `localIps = ["192.168.1.115"]`
- `localInterfaces = [{ address: "192.168.1.115", interfaceName: "Wi-Fi", preferred: true }]`

## Current Device-Side Diagnostics

### LAN device endpoint

- `http://192.168.1.113/api/status` still times out from the current Windows
  host context

### Proxy classification

- `http://192.168.1.115:8787/api/proxy?url=http://192.168.1.113/api/status`
  now returns:
  - `504`
  - `error = device_probe_timeout`
  - `routeTruth = probe_timeout`
  - `targetContext = private_lan`
  - `localSubnetMatch = true`
  - `likelyDeviceApContextRequired = false`

That means the current LAN device check is a narrow timeout, not a generic
route or AP-context failure.

### Firmware AP rule

`192.168.4.1` is not a universal fallback target.

It should only be treated as valid when the current client is actually attached
to the device-hosted Ohmic AP network. From the current Windows host context:

- there is no `192.168.4.0/24` route
- the host is not on a device-generated AP subnet

So a timeout on `http://192.168.4.1/api/status` from this host is a context
fact, not the blocker that should hold the next phone-assisted smoke lane shut.

## Honest Decision

The phone-assisted smoke lane should be reopened.

Reason:

- the Windows-host-first operator inputs are now truthful
- the backend status surface is healthy on the current host
- the AP endpoint is correctly demoted to an AP-only conditional diagnostic
- the remaining `192.168.1.113` timeout is a narrower live device diagnostic,
  not a reason to keep the entire phone/browser smoke lane blocked before the
  next rerun even starts

## Next Operator Inputs

- UI host: `http://192.168.1.115:4175`
- backend host: `http://192.168.1.115:8787`
- live LAN device diagnostic: `http://192.168.1.113/api/status`
- AP diagnostic only when actually on device AP: `http://192.168.4.1/api/status`

## Honest Outcome

- the current live device LAN target still has a real timeout seam
- the AP target is now explicitly treated as context-bound, not universal
- the next bounded phone-assisted smoke rerun should proceed from the current
  Windows host packet instead of staying blocked on the old raw-endpoint rule
