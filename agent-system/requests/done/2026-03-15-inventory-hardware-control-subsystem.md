Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T055940Z-7cfe58c2

# Inventory Hardware Control Subsystem

## Goal

Inventory the combined hardware/control UI lane in `ohmic-audio-labs`.

## Why

The safe-commit split map showed this is likely the next major main-app lane:

- `components/Hardware`
- related `services/hardware`

## Deliverable

A subsystem inventory that identifies:

- active surface families
- likely safe commit slices
- what should be kept together
- what should be isolated before commit

## Constraints

- inventory only
- no broad implementation in this step

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_HARDWARE_CONTROL_SUBSYSTEM_INVENTORY_2026-03-15.md`

Result:

- the hardware/control lane is now split into shell/deck, AmpLab control,
  DSP-contract, and measurement/instrument families
- likely safe next commit slices are explicit
- shell-adjacent and mobile-helper hitchhikers are called out for isolation

## Completion

- inventoried the dirty `components/Hardware` and related `services/hardware`
  surfaces
- grouped the active files into subsystem families
- documented what should be kept together and what should be isolated before
  commit
