Status: ready
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

- host shell layout
- visible surface structure
- shell-local hooks only
- keep services and protocol detail out

## Acceptance

- one bounded hardware shell deck slice lands cleanly
- service-heavy files stay out of scope
- the slice is ready for later bridge work
