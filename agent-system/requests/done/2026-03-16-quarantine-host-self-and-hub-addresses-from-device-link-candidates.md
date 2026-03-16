Status: done
Priority: high
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T124119Z-fabe40cd

# Quarantine Host Self And Hub Addresses From Device Link Candidates

## Goal

Stop host/self and hub addresses from appearing as if they were real hardware
device candidates in `Ohmic Live Link`.

## Focus

- host-origin contamination
- local multi-IP contamination
- hub `/api/status` rejection
- visible candidate list cleanup

## Acceptance

- self-host addresses no longer dominate the selectable device list
- hub status payloads stay rejected as hardware endpoints

## Result

Completed on 2026-03-16.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_LIVE_LINK_CANDIDATE_NORMALIZATION_FIRST_SLICE_2026-03-16.md`

Outcome:

- loopback self-origins are no longer injected into discovery targets by
  default
- hub status payloads remain non-device endpoints
