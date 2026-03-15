Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Inventory Services Backend Subsystem

## Goal

Inventory `services/backend` as its own completion lane.

## Why

The dirty-worktree inventory showed `services/backend` is large enough to be a
real subsystem and should not be mixed into generic repo cleanup.

## Deliverable

A short subsystem inventory that says:

- what backend domains are active
- what is safe to commit next
- what should be isolated or frozen

## Constraints

- inventory only
- no broad backend implementation in this step
