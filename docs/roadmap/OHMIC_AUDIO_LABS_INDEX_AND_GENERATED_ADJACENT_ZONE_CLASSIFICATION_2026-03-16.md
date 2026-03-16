# Ohmic Audio Labs Index And Generated-Adjacent Zone Classification

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Classify the dirty `index/*` and generated-adjacent zones in
`ohmic-audio-labs` so later cleanup can use the right rule: regenerate, retain
locally, or review before touching.

## Core Rule

These zones are not plain source and not plain junk.

They need distinct handling because they sit next to live source truth while
also behaving like generated, cached, or runtime state.

## Zone Classes

### 1. `index/*`

Current status pattern:

- tracked modifications across `index/*.json`, `index/*.yaml`, and
  `index/*.md`
- untracked `index/.cache.json`

Classification:

- generated cache and derived index truth

Handling rule:

- do not treat as hand-edited primary source
- do not delete blindly while index-driven workflows still rely on them
- prefer regenerate-or-refresh behavior over manual cleanup

Next-state rule:

- tracked index artifacts should be reviewed as generated operational outputs
- `index/.cache.json` is disposable cache

### 2. `services/backend/storage/*`

Current status pattern:

- untracked sqlite files
- untracked measurement capture JSON and directories

Classification:

- local runtime state and retained evidence

Handling rule:

- do not classify as source
- retain only by short-term evidence policy or fixture promotion
- otherwise relocate or purge as local runtime exhaust

Next-state rule:

- belongs to retention/execution waves, not source cleanup

### 3. `services/ui-runtime/generated/*`

Current status pattern:

- untracked generated-adjacent output under an active source service area

Classification:

- review-before-touch generated-adjacent zone

Handling rule:

- do not sweep into junk cleanup automatically
- do not promote to source truth automatically
- classify with the surrounding `services/ui-runtime/*` source lane before
  ignore or delete decisions

Next-state rule:

- hold until a dedicated ui-runtime keep/freeze review packet decides whether
  this directory is reproducible output, committed examples, or mixed source

## Summary Matrix

### Regenerate-Or-Refresh

- `index/*`

### Retain-Locally-Or-Purge

- `services/backend/storage/*`

### Review-Before-Touch

- `services/ui-runtime/generated/*`

## Explicit Non-Goals

This packet does not:

- rewrite ignore rules
- purge any of these zones
- promote runtime storage into fixtures
- decide final keep/freeze status for `services/ui-runtime/generated/*`

## Follow-On Order

1. backend measurement capture retention execution slice
2. index regeneration or refresh execution slice
3. ui-runtime generated-area keep/freeze review slice

## Outcome

The mixed zones are now split by handling rule instead of being misread as one
undifferentiated dirt class.
