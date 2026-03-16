Status: validation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Real Device Smoke Test Recovery Wave

## Purpose

Return the queue to one honest live-device packet after the queue-policy burst.

## Included Outputs

- `B:\ohmic\docs\roadmap\OHMIC_LIVE_DEVICE_CANDIDATE_DISCOVERY_TRUTH_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_PHONE_BROWSER_REACHABILITY_AND_FAILURE_BOUNDARY_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_AMPLAB_LIVE_LINK_FAILURE_SIGNATURE_2026-03-16.md`
- `B:\ohmic\docs\roadmap\OHMIC_BOUNDED_PHONE_ASSISTED_AMPLAB_SMOKE_RERUN_2026-03-16.md`

## Unified Outcome

The recovery wave did not prove a clean phone-assisted live link. It did produce
the truthful packet needed before the next fix:

- the live device is reachable directly
- the app/browser shell is reachable
- `Ohmic Live Link` is still normalizing the wrong device identities
- the current blocker is candidate normalization, not basic reachability

## Most Important Truth

The current device exposes both:

- firmware AP identity `192.168.4.1`
- station/LAN identity `192.168.1.113`

The current shell still carries alias-only live identity plus host/self
contamination, which prevents one stable, truthful, portable live-link
candidate path.

## Next Lane

The next implementation packet should fix:

- AP vs LAN candidate normalization
- promotion of the live `sta.ip`
- suppression of host/hub self-candidates
- stale alias dominance in stored candidate state
