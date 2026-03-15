Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify Phone AmpLab Discovery Link After Fix

## Goal

Re-run the real phone-assisted AmpLab discovery/link flow after the shared
discovery-origin fix to confirm the handset can now discover and link the live
unit.

## Source

- `docs/roadmap/OHMIC_PHONE_AMPLAB_DISCOVERY_LINK_FIX_RESULT_2026-03-15.md`
- `docs/roadmap/OHMIC_PHONE_ASSISTED_AMPLAB_LIVE_SMOKE_RESULT_2026-03-15.md`
- `docs/roadmap/OHMIC_LIVE_LINK_DISCOVERY_SEPARATION_2026-03-15.md`

## Focus

- handset browser discovery result after explicit refresh
- handset browser link result after unit selection
- confirmation that the linked/current unit is not rendered back into the find
  list
- parity with the already-proven desktop/browser refresh-plus-link path

## Acceptance

- one honest phone validation pass is recorded
- result clearly states pass, partial pass, or remaining blocker
- generic Wi-Fi/backend availability is not re-investigated
