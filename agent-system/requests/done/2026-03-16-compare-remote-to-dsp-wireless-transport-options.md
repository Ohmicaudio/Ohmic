Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T033830Z-45857dfb

# Compare Remote To DSP Wireless Transport Options

## Goal

Compare the likely transport families for remote-to-DSP linking without
pretending one consumer-facing buzzword solves every Ohmic requirement.

## Focus

- transport families suitable for control
- transport families suitable for telemetry streaming
- transport families that could support audio/media if actually required
- tradeoffs in complexity, bandwidth, latency, and durability

## Acceptance

- one comparison packet exists
- control-plane and media-plane suitability are not conflated
- the likely first implementation direction is obvious

## Result

- compared the transport families in
  `docs/architecture/OHMIC_REMOTE_TO_DSP_WIRELESS_TRANSPORT_COMPARISON_2026-03-16.md`
- evaluated control, telemetry, and optional future audio/media suitability
  separately instead of treating "wireless" as one requirement
- made the current first-direction recommendation explicit: Wi-Fi control plus
  telemetry first, optional BLE only for discovery/pairing later if needed
