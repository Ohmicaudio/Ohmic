Status: blocked
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Commit First Android Wrapper Safe Slice After Inventory

## Blocker

Wait for:

- `inventory-android-wrapper-dirty-subsystem`

## Goal

Turn the Android wrapper inventory into one bounded Android-specific slice if a
real safe lane exists.

## Acceptance

- distinguishes generated wrapper noise from intentional app changes
- does not mix web/runtime code into the slice
