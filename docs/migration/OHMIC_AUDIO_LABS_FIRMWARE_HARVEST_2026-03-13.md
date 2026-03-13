# Ohmic Audio Labs Firmware Harvest

Date: 2026-03-13
Source: `/mnt/a/ohmic-audio-labs/firmware/esp32-amplab-sim`
Status: reviewed for forward-looking value

## Summary

The `ohmic-audio-labs/firmware` tree is not a second live firmware line that should keep evolving.
It is an older embedded AmpLab simulator/workbench tree.

Most of it is superseded by:

- `/mnt/b/ohmic/repos/amplab-firmware`
- `/mnt/a/masterfirmware` as the original harvest source

## Keep / harvest

These items are worth preserving before `ohmic-audio-labs` firmware cleanup:

### 1. `partitions_n16r8.csv`

Path:

- `/mnt/a/ohmic-audio-labs/firmware/esp32-amplab-sim/partitions_n16r8.csv`

Why keep it:

- this N16R8-specific partition layout does not currently exist in `masterfirmware`
- it is a real board/runtime artifact, not just stale prose

### 2. `PINOUT.md`

Path:

- `/mnt/a/ohmic-audio-labs/firmware/esp32-amplab-sim/PINOUT.md`

Why keep it:

- contains a useful devkit-vs-production pin reference
- some of it is older than the current canonical pin docs, but it is still a useful board-specific reference

### 3. `src/dsp_ctrl.hpp` and `src/dsp_ctrl.cpp`

Paths:

- `/mnt/a/ohmic-audio-labs/firmware/esp32-amplab-sim/src/dsp_ctrl.hpp`
- `/mnt/a/ohmic-audio-labs/firmware/esp32-amplab-sim/src/dsp_ctrl.cpp`

Why keep them:

- they are not part of the current canonical DSP contract
- they are still useful as reference for:
  - preset-slot persistence
  - lightweight HTTP preset endpoints
  - early ADAU1701 preset-control ideas

These should be treated as archive/reference, not copied blindly into the live firmware runtime.

## Do not treat as canonical going forward

The rest of the `esp32-amplab-sim` tree is mostly older/superseded variants of:

- display glue
- local UI
- old simulator README framing
- older AmpLab web/runtime surface

Those files differ from the staged `amplab-firmware` repo, but the differences are mostly historical drift, not missing must-have runtime pieces.

## Recommendation

Before removing or archiving `ohmic-audio-labs/firmware`:

1. preserve `partitions_n16r8.csv`
2. preserve `PINOUT.md`
3. preserve `dsp_ctrl.hpp` and `dsp_ctrl.cpp` as reference material
4. treat the rest as superseded by the staged `amplab-firmware` repo
