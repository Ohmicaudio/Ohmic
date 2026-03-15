Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next Backend Control Plane Safe Slice

## Goal

Choose the next backend slice after the measurement-capture family that can be
committed and tested without dragging in the whole backend lane.

## Focus

Look at the remaining backend control-plane/auth/feature-gate files and select
one bounded family worth isolating next.

## Required Output

- exact candidate file list
- exact out-of-scope list
- suggested verification commands
- one sentence on why this slice should come next

## Acceptance

- the backend lane has a real next executable slice, not just a vague future
  bucket
