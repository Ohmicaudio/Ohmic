Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T154741Z-91ca8147

# Improve Live Link Failure Classification And Route Truth Wave

## Goal

Make live-link diagnostics distinguish route, timeout, and backend-origin
context instead of collapsing everything into one unreachable bucket.

## Source

- `docs/roadmap/OHMIC_LIVE_LINK_FAILURE_CLASSIFICATION_AND_ROUTE_TRUTH_WAVE_2026-03-16.md`

## Focus

- proxy error classification
- probe-origin truth
- host-context diagnostics

## Acceptance

- the next smoke rerun can attribute failures more precisely
- diagnostics reflect real host/probe context instead of generic reachability

## Result

- the live-link proxy now returns specific failure buckets instead of one blanket
  `device_not_reachable`
- route truth and probe-origin context are attached to the proxy diagnostics
- the next smoke rerun can distinguish timeout, route, and AP-context failures
