Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Android Wrapper Tracked Text First Commit Slice

## Goal

Define the first clean Android wrapper slice that deals only with tracked text
files and keeps generated Capacitor or Gradle noise out.

## Source

- `docs/roadmap/OHMIC_ANDROID_WRAPPER_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`

## Focus

- tracked text files only
- exclude build output and generated plugin dirs
- commit-sized cleanup boundary

## Acceptance

- one first Android tracked-text slice packet exists
- the slice avoids generated output entirely
- the implementation step becomes safe to claim afterward
