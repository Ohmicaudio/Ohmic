Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Inventory Android Wrapper Dirty Subsystem

## Goal

Inventory the dirty Android/Capacitor wrapper lane so it can be treated as a
separate subsystem instead of background churn.

## Scope

- `android/*`
- `capacitor.config.ts`

## Deliverables

- high-level dirty-shape summary
- split between generated wrapper churn and meaningful app-specific edits
- first safe Android-specific slice recommendation

## Acceptance

- distinguishes wrapper noise from real product work
- names the first Android-safe slice if one exists
- does not mix this lane into generic web/runtime commits
