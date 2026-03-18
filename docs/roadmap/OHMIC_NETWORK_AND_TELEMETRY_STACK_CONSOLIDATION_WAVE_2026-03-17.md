Date: 2026-03-17
Status: done
Project: firmware

# Ohmic Network And Telemetry Stack Consolidation Wave

## Why

The shared status and control envelope are partially converged, but the network
floor is still split. AmpLab is still the producer-side anchor, the remote still
has local Wi-Fi/onboarding behavior, AP-vs-LAN target truth is only partially
guarded, and the live display slot is not yet a real stream-backed surface.

## Target

- finish the shared firmware network core direction explicitly
- converge target selection and AP/LAN truth under one contract
- finish shared telemetry/control/status language across active participant classes
- reserve the live display slot as a real stream surface, not decorative runtime

## Correction Notes

- the shared network core is device-wide, not a remote-only behavior family
- connection, discovery, probe, and target-selection work should be
  command-first under the firmware/runtime contract, not owned by button code
- discovery and candidate selection should be the primary operator path
- manual host entry stays available as a fallback or recovery tool, not the
  first-class path
- UI pages are invokers of network/control behavior, not the source of truth

## Child Requests

- `2026-03-17-run-network-and-telemetry-stack-consolidation-wave.md`
- `2026-03-17-extract-shared-firmware-network-core-from-current-live-behavior.md`
- `2026-03-17-converge-remote-off-local-wifi-flow-and-onto-shared-network-core.md`
- `2026-03-17-normalize-ap-vs-lan-target-selection-over-the-shared-network-contract.md`
- `2026-03-17-carry-live-amplab-network-and-status-floor-into-shared-core-runtime.md`
- `2026-03-17-carry-live-amplab-wifi-profile-and-connect-floor-into-shared-core-runtime.md`
- `2026-03-17-finish-shared-status-control-and-stream-contract-across-active-nodes.md`
- `2026-03-17-carve-live-display-stream-slot-and-missing-stream-state-outside-demo-mode.md`

## Result

- `OHMIC_SHARED_FIRMWARE_NETWORK_CORE_EXTRACTION_RESULT_2026-03-17.md`
- `OHMIC_REMOTE_SHARED_NETWORK_CORE_CONVERGENCE_RESULT_2026-03-17.md`
- `OHMIC_AP_VS_LAN_TARGET_SELECTION_NORMALIZATION_RESULT_2026-03-17.md`
- `OHMIC_SHARED_STATUS_CONTROL_AND_STREAM_CONTRACT_RESULT_2026-03-17.md`
- `OHMIC_CARRY_FORWARD_LIVE_AMP_LAB_NETWORK_AND_STATUS_RESULT_2026-03-17.md`
- `OHMIC_CARRY_FORWARD_LIVE_AMP_LAB_WIFI_PROFILE_AND_CONNECT_RESULT_2026-03-17.md`
- `OHMIC_LIVE_SLOT_AND_MISSING_SOURCE_QUARANTINE_RESULT_2026-03-17.md`
