Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Split First Backend Safe Slice

## Goal

Take the first clearly safe backend slice once the subsystem inventory names it.

## Scope

- `services/backend/*`

## Deliverables

- first backend slice recommendation
- exact files and endpoint family
- minimum verification commands or tests for that slice

## Acceptance

- backend slice stays separate from frontend runtime UI churn
- verification path is named explicitly
- no unrelated service families are bundled into the proposal
