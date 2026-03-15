Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next Hardware Service Bridge Safe Slice

## Goal

Identify the next bounded hardware/control slice after the shell-host wave.

## Focus

Promote one narrow bridge between the new hardware shell and directly related
service/hook files without absorbing the whole `services/hardware/*` lane.

## Expected Shape

- exact candidate files
- explicit out-of-scope files
- one coherent reason this slice belongs together
- suggested verification commands

## Acceptance

- produces one concrete next hardware implementation task
- avoids reopening the entire hardware/control subsystem as one giant bucket
