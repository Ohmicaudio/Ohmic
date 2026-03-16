Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T112206Z-b79199f9

# Recover Real Device Smoke Test Wave

## Goal

Refill the queue with one observable live-device family so execution returns to
real smoke testing instead of more queue-policy abstraction.

## Focus

- discovery truth
- phone/browser reachability
- live-link failure signature
- bounded phone-assisted rerun

## Acceptance

- one smoke-test parent wave is explicit
- the next ready family is device-observable and rerunnable

## Result

Completed on 2026-03-16.

Outputs:

- `B:\ohmic\docs\roadmap\OHMIC_REAL_DEVICE_SMOKE_TEST_RECOVERY_WAVE_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_LIVE_DEVICE_CANDIDATE_DISCOVERY_TRUTH_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_PHONE_BROWSER_REACHABILITY_AND_FAILURE_BOUNDARY_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_AMPLAB_LIVE_LINK_FAILURE_SIGNATURE_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_BOUNDED_PHONE_ASSISTED_AMPLAB_SMOKE_RERUN_2026-03-16.md`

Outcome:

- the live device remained directly reachable
- the browser shell remained reachable
- the remaining blocker was isolated to device candidate normalization inside
  `Ohmic Live Link`
