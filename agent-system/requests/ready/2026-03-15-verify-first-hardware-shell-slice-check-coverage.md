Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify First Hardware Shell Slice Check Coverage

## Goal

Record the truthful verification floor for the first completed hardware-control
shell slice.

## Why This Is Needed

- the shell slice landed cleanly
- its check coverage is still implied more than explicitly proven
- we need to know what was actually checked and what still is not trustworthy

## Scope

- the first hardware-control shell slice only
- shell hosts and shell presentation hooks, not deeper `services/hardware/*`

## Required Output

- exact check commands that were used or can be trusted for this slice
- pass/fail outcome if run now
- clear note about what those checks do not cover

## Acceptance

- the slice has a truthful verification note
- future pickups do not have to guess whether the first hardware shell wave was
  ever actually checked
