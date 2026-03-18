Date: 2026-03-17
Status: ready
Project: firmware

# Ohmic Shared Network Command Surface Wave

## Why

The network and telemetry floor is converging, but network actions still live
too much in HTTP routes and local button flows. The next backbone step is to
make status, scan, profile, connect, and target actions available through the
shared firmware command envelope first so every surface can invoke the same
runtime behavior.

## Target

- expose shared network status/profile/scan over the firmware envelope
- expose connect and target-set actions over the same command-first contract
- keep UI surfaces as invokers instead of owners of network behavior

## Child Requests

- `2026-03-17-run-shared-network-command-surface-wave.md`
- `2026-03-17-expose-shared-network-status-profile-and-scan-topics-over-firmware-envelope.md`
- `2026-03-17-expose-shared-network-connect-and-target-set-actions-over-firmware-envelope.md`
- `2026-03-17-teach-remote-and-web-surfaces-to-invoke-network-actions-through-command-first-contract.md`

## Partial Results

- `OHMIC_SHARED_NETWORK_STATUS_PROFILE_AND_SCAN_TOPICS_RESULT_2026-03-17.md`
- `OHMIC_SHARED_NETWORK_CONNECT_AND_TARGET_ACTIONS_RESULT_2026-03-17.md`
