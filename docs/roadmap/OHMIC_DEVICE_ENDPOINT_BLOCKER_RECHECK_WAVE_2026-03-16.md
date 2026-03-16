Status: completed_wave
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Device Endpoint Blocker Recheck Wave

## Purpose

Keep the smoke gate honest by rechecking the actual device-side blocker from the
current host context rather than assuming the host fix also repaired the device
path.

## Why This Exists

The latest rerun separated the two layers clearly:

- host UI/backend are alive on `192.168.1.115`
- the LAN device endpoint `http://192.168.1.113/api/status` still does not
  answer
- the device AP endpoint `http://192.168.4.1/api/status` still remains
  unavailable from the current host context

That means the blocked phone-assisted rerun still needs a device-side recheck
gate, even though the host-side lane recovered.

## Included Outputs

- `B:\ohmic\agent-system\requests\done\2026-03-16-recheck-device-endpoint-blocker-wave.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-recheck-192-168-1-113-and-proxy-buckets-from-current-host.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-decide-whether-phone-assisted-smoke-can-reopen-after-host-retarget.md`
- `B:\ohmic\docs\roadmap\OHMIC_DEVICE_ENDPOINT_BLOCKER_RECHECK_RESULT_2026-03-16.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-rerun-phone-assisted-amplab-smoke-after-candidate-normalization.md`

## Unified Outcome

The board should carry one truthful device-side gate that can either reopen the
blocked phone-assisted rerun or keep it blocked for a specific current reason.

## Current Decision

- the current Windows host is `192.168.1.115`
- direct `192.168.1.113` still times out from that host
- proxy classification now narrows that seam to `504 device_probe_timeout`
- `192.168.4.1` is explicitly AP-only and is not treated as a universal blocker
- the bounded phone-assisted rerun is reopened with the corrected Windows-host-first packet
