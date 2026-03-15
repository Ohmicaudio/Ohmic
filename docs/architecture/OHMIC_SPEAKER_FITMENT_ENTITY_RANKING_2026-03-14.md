# Ohmic Speaker Fitment Entity Ranking

Status: working ranking
Date: 2026-03-14

## Purpose

Define the first speaker-related entities worth caring about so the fitment
correlation lane stays narrow and useful.

This ranking is based on:

- `OHMIC_SPEAKER_DB_DATA_PIPELINE_PATH_2026-03-14.md`
- `DESIGNLAB_INCUBATOR_REVIEW_2026-03-14.md`
- `OHMIC_SPEAKER_DB_OUTPUT_INVENTORY_2026-03-14.md`

## First-Pass Ranked Entities

### 1. Manufacturer

Why first:

- it is already present in the normalized export as `make`
- it is the broadest useful grouping for fitment browse and QA
- it supports later joins to product and catalog lanes

### 2. Vehicle Model

Why next:

- it is already present in the normalized export as `model`
- fitment value is weak without make plus model together
- it is the main browse/search anchor after manufacturer

### 3. Vehicle Year Range

Why next:

- it is already present as `year_start` and `year_end`
- fitment accuracy depends heavily on year slicing
- it is more stable and useful than trim-level speculation in the current lane

### 4. Speaker Location

Why next:

- it is already present as `location`
- it turns a vehicle row into an install-useful fitment row
- it is necessary for door, dash, shelf, and other placement-specific guidance

### 5. Speaker Size

Why next:

- it is already present as `size`
- it is the core install/planning output most people want first
- it is the most useful initial field for planning adapters, replacements, and
  quick compatibility hints

## Supporting But Secondary Entities

These matter, but they are not the first correlation anchors:

- source/provenance
- confidence
- normalized row identity

Why:

- they support trust and downstream governance
- they are not the first browse/use entities a fitment seed should optimize for

## Ignore For Now

These should stay out of the first-pass ranking:

- trim/package detail
- OEM audio package details
- exact mounting depth
- speaker shape
- notes and install caveats
- adapter parts
- aftermarket recommendation layers

Why:

- the current visible export does not support them reliably
- several of those fields are null in the present dataset
- pulling them in now would turn a fitment seed into a premature full schema

## First-Pass Ranking Call

The initial fitment seed should be built around this core:

1. manufacturer
2. vehicle model
3. vehicle year range
4. speaker location
5. speaker size

With provenance and confidence attached as supporting metadata, not as the
primary entities the model is organized around.
