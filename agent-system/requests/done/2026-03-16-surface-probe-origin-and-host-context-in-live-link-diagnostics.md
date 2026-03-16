Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T154741Z-91ca8147

# Surface Probe Origin And Host Context In Live Link Diagnostics

## Goal

Expose enough host-context truth to distinguish Windows host probes, WSL probes,
and device AP assumptions in future smoke diagnostics.

## Source

- `docs/roadmap/OHMIC_LIVE_LINK_FAILURE_CLASSIFICATION_AND_ROUTE_TRUTH_WAVE_2026-03-16.md`

## Focus

- host-context metadata
- live-link diagnostics

## Acceptance

- future smoke notes can identify the probe origin cleanly
- diagnostic state does not blur WSL-only failures into general LAN truth

## Result

- proxy diagnostics now expose request-host and backend-host context directly
- responses include backend platform, request host hint, request host IP,
  preferred local IP, and the current local IP list
- future smoke notes can attribute host-context truth without inferring it from
  one generic failure bucket
