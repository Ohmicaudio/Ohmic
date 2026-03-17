Date: 2026-03-17
Status: ready
Project: firmware

# Ohmic Live Network And Telemetry Validation Wave

## Why

The shared network/status/stream floor is converging in code, but the next
useful truth needs live hardware on the same network. We need one bounded wave
that validates AmpLab, DSP, and remote behavior against the current shared
contract instead of assuming the runtime matches the code.

## Target

- validate live shared status and missing-stream truth
- capture the current DSP status surface against the converged contract
- verify AP-guard and LAN-target truth on the real network

## Child Requests

- `2026-03-17-run-live-network-and-telemetry-validation-wave.md`
- `2026-03-17-verify-live-amplab-and-remote-shared-status-and-missing-stream-truth.md`
- `2026-03-17-capture-live-dsp-status-surface-against-the-shared-contract.md`
- `2026-03-17-verify-live-ap-guard-and-lan-target-truth-on-current-network.md`
