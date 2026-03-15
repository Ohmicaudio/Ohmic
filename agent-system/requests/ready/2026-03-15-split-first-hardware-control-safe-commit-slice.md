Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Split First Hardware Control Safe Commit Slice

## Goal

Turn the subsystem inventory into the first real hardware/control commit slice.

## Scope

- `components/Hardware/*`
- only directly related `services/hardware/*`

## Deliverables

- first bounded hardware/control slice recommendation
- exact file list for that slice
- explicit note about what stays out of scope

## Acceptance

- does not mix Android wrapper work
- does not mix generic modals or unrelated landing/mobile surfaces
- yields one slice small enough to claim and verify
