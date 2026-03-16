Status: completed_wave
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Windows Host Truth Smoke Operator Packet Wave

## Purpose

Give the next live smoke operator packet one clear source of record when WSL and
Windows host probe truth diverge.

## Why This Exists

Recent checks proved:

- WSL can fail on host-local and LAN checks that still work from the Windows
  host
- the current live host identity moved to `192.168.1.115`
- future handset/browser smoke work should not inherit stale host links or the
  wrong probe context

## Included Outputs

- `B:\ohmic\agent-system\requests\done\2026-03-16-publish-windows-host-first-smoke-operator-packet-wave.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-codify-windows-host-as-source-of-record-for-current-lan-smoke.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-update-operator-smoke-notes-for-wsl-vs-windows-probe-divergence.md`
- `B:\ohmic\docs\roadmap\OHMIC_BOUNDED_PHONE_ASSISTED_AMPLAB_SMOKE_RERUN_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_DEVICE_ENDPOINT_BLOCKER_RECHECK_RESULT_2026-03-16.md`

## Unified Outcome

The next operator-facing smoke packet should use current Windows host truth as
the source of record for local LAN identity and host-served URLs.

## Operator Packet Floor

- use Windows host truth first when WSL-local probes diverge
- use `http://192.168.1.115:4175` for the UI host
- use `http://192.168.1.115:8787` for the backend host
- treat `192.168.4.1` as AP-only context, not universal fallback truth
- keep `192.168.1.113` as the current narrow LAN-device diagnostic
