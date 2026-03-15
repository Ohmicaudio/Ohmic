Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement First Hardware Shell Deck Slice

## Goal

Implement the first bounded hardware/control shell deck slice without opening
the deeper transport and service layers yet.

## Source

- `docs/roadmap/OHMIC_HARDWARE_CONTROL_FIRST_SAFE_SLICE_2026-03-15.md`

## Focus

- deck and host composition
- visible shell structure only
- minimal tracked shell companions if the hosts need them
- keep services, control-plane hooks, and protocol detail out

## Acceptance

- one bounded hardware shell deck slice lands cleanly
- touched files stay inside the host/deck packet defined in
  `docs/roadmap/OHMIC_HARDWARE_CONTROL_FIRST_SAFE_SLICE_2026-03-15.md`
- service-heavy files stay out of scope
- the slice is ready for later bridge work

## Completion Notes

- implemented in `ohmic-audio-labs` commit `39a359e`
- packaged only the new host and deck files:
  - `DashLabDeck.tsx`
  - `DeckContentHost.tsx`
  - `DesktopMeasureTopologyControls.tsx`
  - `DesktopMeasureTopologyHost.tsx`
  - `PhoneLabDeck.tsx`
  - `PhoneLabDeckHost.tsx`
  - `PhoneLabSurfaceHost.tsx`
  - `SettingsDeck.tsx`
- intentionally left modified companion panel files out because they are still noisy and would have widened the slice
- verification should happen as a separate honest follow-on rather than pretending this shell can be blessed from the current mixed repo state
