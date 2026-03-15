Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Inventory Ohmic Audio Labs Dirty Worktree By Domain

## Goal

Break the current giant `ohmic-audio-labs` dirty worktree into understandable
domains so completion work can be split safely.

## Why

The current repo is the biggest ecosystem risk because too much unfinished work
is mixed together.

## Deliverable

A triage note that groups the dirty worktree into domains such as:

- runtime/app
- Android wrapper
- hardware/control UI
- archive/legacy
- docs/specs
- generated/build artifacts

## Constraints

- inventory only
- do not normalize or rewrite the whole tree in this step
