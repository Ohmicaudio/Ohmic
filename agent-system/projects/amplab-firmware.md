scope: project
horizon: mid
authority: working
project: amplab-firmware
topic: overlay
updated: 2026-03-13

# amplab-firmware

## Identity

Firmware lane for the broader Ohmic hardware/device platform.

## Naming Note

This overlay uses `amplab-firmware` as the preferred umbrella label for the firmware lane. Final repo naming may still be normalized during migration.

## Current Truth

- firmware is part of the larger system split and active migration planning already tracked in `B:\ohmic\docs`
- transport, device contracts, and local-first control remain central themes
- `B:\ohmic\repos\amplab-firmware` is the migration target repo
- `A:\masterfirmware` is the legacy/source working copy, not the long-term destination

## First Read

- `B:\ohmic\docs\migration\MASTERFIRMWARE_DSP_PRE_MIGRATION_AUDIT_2026-03-12.md`
- `B:\ohmic\docs\migration\MASTERFIRMWARE_INTERNAL_SPLIT_PROGRESS_2026-03-13.md`
- `B:\ohmic\docs\systems\OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md`

## Current Next Move

- finish the migration and contract cleanup without letting old `masterfirmware` framing stay implicit
