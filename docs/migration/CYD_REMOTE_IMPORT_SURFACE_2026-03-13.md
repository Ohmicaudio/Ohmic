# CYD Remote Import Surface

Date: 2026-03-13
Source repo: `/mnt/a/cyd_remote`
Target repo: `Ohmicaudio/cyd-remote`
Status: pre-migration import definition

## Purpose

Define the clean import surface for `cyd-remote` before any GitHub migration.

This repo is cleaner than `masterfirmware`, but it still contains:

- local build state
- a stale root README
- vendor reference bundles
- local skills/notes
- saved flash snapshots

The goal is to migrate the handheld firmware cleanly, not drag all bench clutter into the new repo.

## Import: include

### Firmware runtime

- `platformio.ini`
- `partitions.csv`
- `partitions_16mb.csv`

### Source tree

- `src/`

### Include tree

- `include/lv_conf.h`
- `include/tft_setup_cyd24.h`

### Schemas and handoff docs

- `schemas/`
- `docs/ohmic-firmware-handoff/`
- `docs/PINOUT_CANONICAL_V1.md`
- `docs/CYD24R_BRINGUP_AND_WORKING_GUIDE_2026-03-12.md`
- `docs/CYD_HANDHELD_PRODUCT_BRIEF.md`
- `docs/OHMIC_CANONICAL_DEVICE_CONTRACT_DRAFT_2026-03-12.md`
- `docs/OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md`
- `docs/OHMIC_WEB_ANDROID_AND_FIRMWARE_CONSOLIDATION_2026-03-12.md`

### Tools and library helpers

- `tools/embed_display_doc.py`
- `lib/esp32round/`

### Working baseline references

- `snapshots/CYD24R_WORKING_BASELINE_2026-03-12.md`

Reason:

- the binary snapshot itself does not belong in the clean code repo
- the bring-up note does

## Import: exclude from the clean repo

### Local junk / generated state

- `.pio/`
- `.claude/`
- `.vscode/`

### Bench snapshots / binaries

- `snapshots/firmware-cyd24r-working-2026-03-12.bin`

### Local agent scaffolding

- `skills/`

### Vendor dump noise

- `docs/2.4inch_ESP32-2432S024.zip`

## Import: archive or reference later

These are useful reference material but do not need to live in the main handheld repo forever.

- `docs/2.4inch_ESP32-2432S024/`
- `docs/adi docs/`
- `docs/archive/`
- `docs/DSP_AGENT2_RESEARCH_ANSWERS.md`
- `docs/OHMIC_GITHUB_MIGRATION_PLAN_2026-03-12.md`

## Required cleanup before migration

### Replace the stale root README

Current root README is still the old AmpLab simulator text and should not be migrated as the handheld repo README.

That should be replaced with a real handheld README before or during import.

### Keep the source tree as the source of truth

The current `src/` tree is the live handheld firmware surface:

- display stack
- page nav
- settings
- LED
- SD
- Wi-Fi
- WebSocket

That tree is already the right starting point.

## Initial target repo layout

```text
cyd-remote/
  README.md
  platformio.ini
  partitions.csv
  partitions_16mb.csv
  include/
    lv_conf.h
    tft_setup_cyd24.h
  docs/
    CYD24R_BRINGUP_AND_WORKING_GUIDE_2026-03-12.md
    CYD_HANDHELD_PRODUCT_BRIEF.md
    PINOUT_CANONICAL_V1.md
    OHMIC_CANONICAL_DEVICE_CONTRACT_DRAFT_2026-03-12.md
    OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md
    OHMIC_WEB_ANDROID_AND_FIRMWARE_CONSOLIDATION_2026-03-12.md
    ohmic-firmware-handoff/
  lib/
    esp32round/
  schemas/
  snapshots/
    CYD24R_WORKING_BASELINE_2026-03-12.md
  src/
  tools/
    embed_display_doc.py
```

## Migration recommendation

Do not migrate this repo by copying everything under `/mnt/a/cyd_remote`.

Instead:

1. create `Ohmicaudio/cyd-remote`
2. import only the clean handheld firmware surface defined here
3. rewrite the root README so it matches the handheld product
4. keep vendor reference bundles and local skills outside the clean repo unless later needed
