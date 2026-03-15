Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T173411Z-fd79b230

# Define Hardware Shell Deck First Commit Slice

## Goal

Convert the hardware/control subsystem inventory into one concrete first commit
slice for the shell/deck extraction lane.

## Source

- `docs/roadmap/OHMIC_HARDWARE_CONTROL_SUBSYSTEM_INVENTORY_2026-03-15.md`
- `docs/roadmap/OHMIC_AUDIO_LABS_SAFE_NEXT_COMMIT_SLICES_2026-03-15.md`

## Focus

- shell and deck extraction boundary
- include/exclude list
- minimum verification path

## Acceptance

- one explicit first hardware shell/deck commit slice is defined
- the slice lists files to include and files to keep out
- verification expectations are spelled out

## Outcome

Completed on 2026-03-15.

Result:

- rewrote the hardware first-slice packet to match the current dirty tree
- narrowed the first commit to deck and host composition files plus the
  smallest tracked shell companions
- made the out-of-scope control-plane, measurement, DSP, and app-shell files
  explicit
- aligned the downstream implementation request to the same boundary

## Artifact

- `B:\ohmic\docs\roadmap\OHMIC_HARDWARE_CONTROL_FIRST_SAFE_SLICE_2026-03-15.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-15-implement-first-hardware-shell-deck-slice.md`
