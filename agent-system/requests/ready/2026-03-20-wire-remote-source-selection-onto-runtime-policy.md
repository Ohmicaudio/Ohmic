Date: 2026-03-20
Status: ready
Project: ohmic-audio-labs

# Wire Remote Source Selection Onto Runtime Policy

## Goal

Move from firmware-owned source-policy state to real remote-side source
selection behavior for the Wi-Fi-first audio path.

## Why

- the policy controls are now backed by live firmware state
- `sys.status.core` now exposes `leadership` and `provisioning`
- the next real gap is behavioral:
  - choosing the active remote source
  - reflecting that choice in route ownership and media-source status

## Scope

- define the source-selection handshake between remote producer and DSP consumer
- map runtime policy state onto concrete source selection
- keep BLE in the setup/control lane rather than promoting it to primary media
  transport

## Depends On

- `OHMIC_SOURCE_POLICY_RUNTIME_PARITY_RESULT_2026-03-20.md`
