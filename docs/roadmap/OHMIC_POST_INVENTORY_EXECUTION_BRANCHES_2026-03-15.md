scope: system
status: handoff_branches
updated: 2026-03-15

# Ohmic Post-Inventory Execution Branches

## Purpose

Define the immediate next-step branches that should follow the current ready
tasks once they close.

This keeps the current queue from ending in another “what now?” pause.

## Branch Rule

For each current task:

- if the result is “safe next slice exists,” queue that slice immediately
- if the result is “too mixed,” queue a narrower subsystem split
- if the result is “freeze,” do not reopen implementation work there

## Current Ready Tasks And Their Next Branches

## 1. Resolve Generated Loudspeaker Packet Lane

If outcome is:

- `generated packet should be committed`
  Then:
  - queue `commit generated loudspeaker sample packet`
  - queue `document generated-output lane ownership`

- `generated packet should not be committed`
  Then:
  - queue `ignore or purge generated loudspeaker packet output`
  - queue `document loudspeaker generated-output boundary`

## 2. Inventory Products Ohmic OSM Dirty Subsystem

If outcome is:

- `one safe commit slice exists`
  Then:
  - queue `commit first ohmic-osm safe slice`

- `multiple separable lanes exist`
  Then:
  - queue:
    - `inventory ohmic-osm web app shell`
    - `inventory ohmic-osm packages`
    - `inventory ohmic-osm workers/api`

- `subsystem is too unstable`
  Then:
  - queue `freeze ohmic-osm implementation and define stabilization plan`

## 3. Inventory Hardware Control Subsystem

If outcome is:

- `components/Hardware` and `services/hardware` stay together
  Then:
  - queue `identify first hardware-control safe commit slice`

- `components/Hardware` and `services/hardware` should split
  Then:
  - queue:
    - `inventory components-hardware UI family`
    - `inventory services-hardware service family`

- `lane is too volatile`
  Then:
  - queue `freeze hardware-control lane and define stabilization checks`

## 4. Inventory Services Backend Subsystem

If outcome is:

- `backend has one safe commitable lane`
  Then:
  - queue `commit first backend safe slice`

- `backend splits into domains`
  Then:
  - queue:
    - `inventory backend auth and access-control lane`
    - `inventory backend measurement-storage lane`
    - `inventory backend network-status and relay lane`

- `backend needs stabilization first`
  Then:
  - queue `define backend stabilization checks before next commit`

## 5. Verify Static Content Remote Durability

If outcome is:

- `remote already aligned`
  Then:
  - no follow-on queue needed
  - keep repo warm

- `local commit still needs push`
  Then:
  - queue `push static-content outstanding clean slice`

- `repo has fresh untracked drift`
  Then:
  - queue `inventory static-content local drift before push`

## Fast-Collapse Rule

If one of the current ready tasks collapses quickly in the same session:

- immediately create the next narrower follow-on task
- do not wait for a future planning pass

## Summary

The current tasks should branch into:

- one safe slice to execute
- or one narrower inventory
- or one explicit freeze

Nothing should fall back into vague discussion.
