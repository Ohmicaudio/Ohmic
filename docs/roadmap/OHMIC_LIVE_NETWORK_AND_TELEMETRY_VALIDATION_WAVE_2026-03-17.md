Date: 2026-03-17
Status: ready
Project: firmware

# Ohmic Live Network And Telemetry Validation Wave

## Why

The shared network/status/stream floor is converging in code, but the next
useful truth needs live hardware on the same network. We need one bounded wave
that validates the active DSP-plus-remote lane against the current shared
contract instead of assuming the runtime matches the code. AmpLab can re-enter
later as a follow-on validation lane when it is back on the bench.

## Target

- validate live shared status and missing-source truth
- capture the current DSP status surface against the converged contract
- verify AP-guard and LAN-target truth on the real network

## Child Requests

- `2026-03-17-run-live-network-and-telemetry-validation-wave.md`
- `2026-03-17-verify-live-dsp-and-remote-shared-status-and-missing-source-truth.md`
- `2026-03-17-capture-live-dsp-status-surface-against-the-shared-contract.md`
- `2026-03-17-verify-live-ap-guard-and-lan-target-truth-on-current-network.md`
