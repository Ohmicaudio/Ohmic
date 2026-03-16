Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Master Administrator Next Execution Stack

## Purpose

Push the Master Administrator lane beyond first-wave architecture so the next
implementation packets already exist before the board thins again.

## Current Base

The following first-wave packets are already in place:

- provider-agnostic intake envelope
- native-format ingestion normalization pipeline
- project overlay configuration layer
- non-API interface adapter model
- Master Administrator web shell against current JSON state

That means the next work should stop restating fundamentals and start defining
the concrete objects, policies, and first executable seams around them.

## Execution Order

### Layer 1. Intake Storage And Object Family

1. `define-administrator-attachment-bundle-and-asset-family`
2. `define-administrator-raw-payload-storage-and-reprocessing-boundary`
3. `define-administrator-intake-status-lifecycle`
4. `define-administrator-aggregation-bundle-model`

Why:

- the web shell and routing desk both depend on stable intake objects
- raw/native capture and later reprocessing need explicit storage rules before
  adapters grow

### Layer 2. Command And Policy Surface

1. `define-administrator-overlay-driven-action-policy`
2. `define-administrator-command-validation-and-writeback-surface`
3. `define-administrator-note-tag-and-filing-surface`

Why:

- the administrator shell should submit bounded command intent, not loose text
- overlay policy needs to determine which actions are allowed per project

### Layer 3. Adapter And Ingestion Starters

1. `define-administrator-manual-drop-intake-slice`
2. `define-administrator-filesystem-watch-intake-adapter`
3. `define-administrator-email-rfc822-intake-adapter`
4. `define-administrator-webhook-json-intake-adapter`

Why:

- these four sources give the system a realistic but safe first ingestion set
- they cover non-API, quasi-native, and provider-like sources without requiring
  every connector at once

### Layer 4. Review And Failure Surfaces

1. `define-administrator-normalization-warning-review-lane`
2. `define-administrator-reprocess-and-retry-lane`
3. `define-administrator-json-projection-generation-surface`

Why:

- normalization will fail or degrade sometimes
- the admin desk needs a visible review and reprocess path instead of pretending
  all parsing is clean

## Non-Goals

This stack does not approve:

- direct browser-to-provider credential use
- full provider auth rollout
- final database migrations
- collapsing orchestrator controls into the administrator shell

## Outcome Standard

If this stack lands, the Master Administrator lane will be ready to move from
abstract architecture into first executable scaffolding with real input sources
and bounded desk behavior.
