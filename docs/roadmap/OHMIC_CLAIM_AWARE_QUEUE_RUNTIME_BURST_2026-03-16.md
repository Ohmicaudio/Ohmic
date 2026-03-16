Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Claim Aware Queue Runtime Burst

## Purpose

Refill the queue with runtime-facing tasks that make queue health claim-aware
instead of relying on raw ready-folder counts.

## Why This Burst Exists

The board can look healthy by file count while the actual hot-ready lane is
already thin because active packets still live in `ready/`.

That means the shared system needs:

- claim-aware headroom rules
- runtime-ready count filtering
- active-vs-ready reconciliation
- runtime projections and shell surfaces that show the truthful count

## Burst Areas

### 1. Queue Truth

- claim-aware headroom boundary
- runtime-ready count filter
- active-vs-ready reconciliation rule

### 2. Runtime Projection

- queue-health projection generator
- same-family pressure rollup generator
- refill urgency score evaluator

### 3. Dashboard Surface

- queue headroom card mapper
- queue pressure alert shell module

## Outcome Standard

If this burst lands, queue health should become claim-aware and much harder to
misread during parallel work.
