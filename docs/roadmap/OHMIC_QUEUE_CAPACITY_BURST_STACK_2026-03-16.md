Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Queue Capacity Burst Stack

## Purpose

Refill the queue from the new capacity policy with a burst of concrete follow-on
tasks so the board starts behaving like a higher-headroom system instead of a
one-packet survival lane.

## Capacity Themes

### 1. Queue Tiering

- hot vs warm state model
- promotion and demotion rules
- queue-family reserve handling

### 2. Refill And Throughput

- refill trigger model
- queue pressure metrics
- refill cadence and staleness rules
- refill source priority order
- same-family ready floor rules

### 3. Worker Stack Expansion

- depth by trust tier
- depth by worker class
- verification slot handling
- same-family reserve packing
- overflow spillback rules

### 4. Burst Generation

- parent-child burst packets
- promotion batches
- duplication guards
- family-aware refill behavior

## Outcome Standard

If this burst stack lands, the queue system will have enough concrete next work
to actually support the higher-capacity model instead of only describing it.
