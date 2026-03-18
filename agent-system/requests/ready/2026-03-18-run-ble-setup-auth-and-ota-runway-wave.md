Status: ready
Priority: high
Date: 2026-03-18
Project: ohmic-audio-labs

# Run BLE Setup Auth And OTA Runway Wave

## Goal

Turn BLE onboarding/auth into an explicit shared runway and stage OTA directly
behind it instead of as a separate hack path.

## Source

- `docs/roadmap/OHMIC_BLE_SETUP_AUTH_AND_OTA_RUNWAY_WAVE_2026-03-18.md`

## Focus

- BLE pairing and trust
- setup/bootstrap authority
- OTA slotting on top of the same trust floor

## Acceptance

- one BLE/setup/auth + OTA family exists on the board
- the child slices are independently claimable
- OTA is explicitly sequenced after trust/bootstrap, not before
