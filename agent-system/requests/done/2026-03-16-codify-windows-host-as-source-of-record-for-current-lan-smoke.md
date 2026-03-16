Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T161520Z-843e5b96

# Codify Windows Host As Source Of Record For Current LAN Smoke

## Goal

State clearly that current LAN smoke checks should prefer Windows host probe
truth over WSL-local failure signatures when they diverge.

## Source

- `docs/roadmap/OHMIC_WINDOWS_HOST_TRUTH_SMOKE_OPERATOR_PACKET_WAVE_2026-03-16.md`

## Focus

- source-of-record rule
- Windows host vs WSL divergence

## Acceptance

- the source-of-record rule is explicit
- current smoke notes no longer blur WSL and Windows host truth together

## Result

Completed on 2026-03-16.

Outputs:

- `B:\ohmic\docs\roadmap\OHMIC_WINDOWS_HOST_TRUTH_SMOKE_OPERATOR_PACKET_WAVE_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_BOUNDED_PHONE_ASSISTED_AMPLAB_SMOKE_RERUN_2026-03-16.md`

Outcome:

- the next LAN smoke packet now explicitly treats Windows host truth as the source of record
