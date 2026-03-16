Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Worker Start Stack

## Purpose

Give a worker one clean pickup order from the live queue without forcing them
to reinterpret the whole board.

## Current Rule

Use unclaimed work first.

Do not step on active claim surfaces unless the claim is released or the
operator explicitly redirects the lane.

## Active Lane Already In Motion

Do not touch these files right now:

- `OHMIC_MASTER_ADMINISTRATOR_WEB_SHELL_AGAINST_JSON_STATE_2026-03-16.md`
- `OHMIC_MASTER_ADMINISTRATOR_PROJECT_OVERLAY_CONFIGURATION_LAYER_2026-03-16.md`
- `OHMIC_PROVIDER_AGNOSTIC_INTAKE_ENVELOPE_2026-03-16.md`

Those are under active claim and should be treated as in-progress work.

## Worker Pickup Order

### 1. Define worker registry schema

Task:

- `define-worker-registry-schema`

Why first:

- the worker model is the immediate control surface for multi-worker scaling
- it gives stable names, roles, trust, capability limits, and budget fields
- the first draft should be discarded and rerun only after reading the current
  worker routing model and token budget policy carefully

Rerun rule:

- treat this as a clean second pass
- read the current worker routing model first
- read the current token budget policy first
- align the schema to committed system docs instead of inventing a parallel
  vocabulary

### 2. Define per-worker task stack model

Task:

- `define-per-worker-task-stack-model`

Why second:

- this turns the global queue into worker-specific runnable stacks
- it prevents anonymous swarm behavior

### 3. Define worker priority, fallback, and escalation rules

Task:

- `define-worker-priority-fallback-and-escalation-rules`

Why third:

- workers need explicit fallback order and escalation boundaries before scale

### 4. Define global vs worker queue boundary

Task:

- `define-global-vs-worker-queue-boundary`

Why fourth:

- the system must keep one queue truth while still supporting many worker-local
  stacks

### 5. Define worker context and token budget policy

Task:

- `define-worker-context-and-token-budget-policy`

Why fifth:

- large-context failure is predictable and should be budgeted before it becomes
  quality drift

### 6. Define multi-worker shared-objective fan-out rules

Task:

- `define-multi-worker-shared-objective-fanout-rules`

Why sixth:

- same larger objective across several workers needs explicit slice rules

### 7. Define user intervention and override rules

Task:

- `define-user-intervention-and-override-rules`

Why seventh:

- workers should remain steerable without turning the system into chaos

## Same-Family Fallbacks

If items 1-7 block, fall back to:

- `define-agent-trust-tier-model`
- `define-fresh-agent-restriction-and-escalation-rules`
- `define-live-task-route-training-lane`
- `define-task-completion-correctness-report-model`
- `define-agent-sanity-and-error-check-hook-layer`
- `define-agent-and-model-performance-report-surface`

These keep the multi-worker control model moving without colliding with the
current admin-shell claim.

## Secondary Architecture Fallbacks

If the worker needs a different lane entirely, use:

- `define-native-format-ingestion-normalization-pipeline`
- `define-non-api-interface-adapter-model`
- `define-remote-to-dsp-wireless-link-requirements`
- `compare-remote-to-dsp-wireless-transport-options`
- `split-remote-to-dsp-control-plane-vs-audio-plane`

## Avoidance Rule

Do not drift into random static-content or cosmetic cleanup while the worker
stack above is still open and unclaimed.

## Outcome Standard

If this stack is followed, the worker will help turn the current multi-worker
idea into a real operating model instead of a chat-only concept.
