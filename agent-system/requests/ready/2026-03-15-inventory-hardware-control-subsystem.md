Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

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
