scope: project
horizon: mid
authority: working
project: cyd-remote
topic: overlay
updated: 2026-03-13

# cyd-remote

## Identity

ESP32 Cheap Yellow Display handheld remote project for the broader Ohmic system.

## Working Location

- active repo previously reviewed at: `A:\cyd_remote`

## Current Truth

- the bring-up and working-baseline docs are the practical hardware truth
- the device path is centered on `TFT_eSPI` plus LVGL
- this repo sits inside a larger firmware-contract transition rather than standing alone

## First Read

- `A:\cyd_remote\docs\CYD24R_BRINGUP_AND_WORKING_GUIDE_2026-03-12.md`
- `A:\cyd_remote\snapshots\CYD24R_WORKING_BASELINE_2026-03-12.md`
- `A:\cyd_remote\docs\ohmic-firmware-handoff\README.md`

## Current Next Move

- keep repo-specific device truth local, but promote stable transport and contract rules into shared docs when settled
