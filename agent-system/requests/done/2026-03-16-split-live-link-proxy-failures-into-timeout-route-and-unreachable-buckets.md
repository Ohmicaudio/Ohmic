Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T154741Z-91ca8147

# Split Live Link Proxy Failures Into Timeout Route And Unreachable Buckets

## Goal

Teach the local proxy surface to surface more specific live-link failure codes
than the current blanket `device_not_reachable`.

## Source

- `docs/roadmap/OHMIC_LIVE_LINK_FAILURE_CLASSIFICATION_AND_ROUTE_TRUTH_WAVE_2026-03-16.md`

## Focus

- `services/backend/src/index.ts`
- proxy error mapping

## Acceptance

- timeout vs unreachable vs route-context cases are distinguishable
- browser-visible diagnostics become more truthful

## Result

- `/api/proxy` now distinguishes timeout, route-unreachable, connection-refused,
  device-AP-context, and generic unreachable cases
- added regression coverage in
  `B:\ohmic\repos\ohmic-audio-labs\test\backend\liveLinkProxyDiagnostics.test.ts`
