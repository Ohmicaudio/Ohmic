# AmpLab Firmware Import Surface

Date: 2026-03-13
Source repo: `/mnt/a/masterfirmware`
Target repo: `Ohmicaudio/amplab-firmware`
Status: pre-migration import definition

## Purpose

Define the clean import surface for `amplab-firmware` before any GitHub migration.

This is not a full rewrite plan.
It is the answer to:

- what should be imported
- what should be left behind
- what is still live
- what is legacy noise

## Current source shape

The source repo is now split internally enough that the import target is visible:

- `src/main.cpp`
- `src/dsp/`
- `src/platform/amplab/`
- `src/platform/display/`
- `src/runtime/web/`
- `src/ui/local/`
- `src/ui/remote/`

This split is build-verified on `esp32s3`.

## Import: include

These should move into the initial `amplab-firmware` repo.

### Firmware runtime

- `platformio.ini`
- `partitions.csv`
- `partitions_16mb.csv`
- `partitions_4mb.csv`

### Source tree

- `src/main.cpp`
- `src/MODULE_MAP.md`
- `src/dsp/`
- `src/platform/amplab/`
- `src/platform/display/`
- `src/runtime/web/`
- `src/ui/local/`
- `src/ui/remote/`

### Include tree: live files

- `include/lv_conf.h`
- `include/ohmic_logo.h`

### Schemas and DSP assets

- `schemas/`
- `sigmastudio/`

### Docs: current device/contract references

- `README.md`
- `docs/ohmic-firmware-handoff/`
- `docs/PINOUT_CANONICAL_V1.md`

### Tools

- `tools/embed_display_doc.py`

## Import: keep only as reference or archive later

These are not required for the clean initial firmware repo root but may be harvested or parked under archive/reference.

- `docs/DSP_AGENT2_RESEARCH_ANSWERS.md`
- `docs/archive/`
- `docs/adi docs/`
- `lib/esp32round/`

Reason:

- useful for history, pin references, or experiments
- not part of the clean firmware runtime surface

## Import: exclude from the clean repo

These should not be migrated into `amplab-firmware`.

### Local junk / generated state

- `.pio/`
- `.claude/`
- `serial_log.txt`

### Legacy or likely-dead headers/assets

- `include/lgfx_display.hpp`
- `include/generated_display_doc.h`
- `include/ohmiclogov12.h`
- `include/ohmictest.c`

Reason:

- current source tree no longer includes them
- the live display bridge header now lives in `src/platform/display/`
- the live embedded logo asset now lives in `src/ui/local/ohmiclogov12.c`

## Initial target repo layout

```text
amplab-firmware/
  README.md
  platformio.ini
  partitions.csv
  partitions_16mb.csv
  partitions_4mb.csv
  include/
    lv_conf.h
    ohmic_logo.h
  docs/
    ohmic-firmware-handoff/
    PINOUT_CANONICAL_V1.md
  schemas/
  sigmastudio/
  src/
    main.cpp
    MODULE_MAP.md
    dsp/
    platform/
      amplab/
      display/
    runtime/
      web/
    ui/
      local/
      remote/
  tools/
    embed_display_doc.py
```

## Notes on naming and responsibility

This repo is still `AmpLab`-shaped.

That is acceptable for the pilot device family.

What should remain generic enough for future reuse:

- `src/dsp/`
- the contract/docs under `docs/ohmic-firmware-handoff/`
- the schema surfaces under `schemas/`

What is explicitly AmpLab-specific:

- `src/platform/amplab/`
- `src/runtime/web/`
- local display/UI surfaces under `src/platform/display/` and `src/ui/local/`

## Migration recommendation

Do not push the whole dirty source repo as-is.

Instead:

1. create `Ohmicaudio/amplab-firmware`
2. import only the surface defined here
3. keep the old local repo as the harvest/archive source
4. continue cleanup in the new repo from a coherent baseline
