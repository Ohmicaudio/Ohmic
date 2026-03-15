# Ohmic Speaker Fitment Correlation Packet

Status: working packet
Date: 2026-03-14
Source workspace: `A:\designlab\ohmic-speaker-db`

## Current Correlation Call

The speaker-db lane is far enough along to support a first fitment-seed pass.

Why:

- a normalized exported dataset already exists in `output\final\speakers.json`
- the export already carries fitment-style row fields
- the lane now has enough structure to rank entities and map fields without
  pretending it is already a production database

It is not far enough along to support:

- trim/package precision
- rich install detail
- adapter-part resolution
- production-grade multi-source confidence

## Best Current Input

Primary input:

- `A:\designlab\ohmic-speaker-db\output\final\speakers.json`

Supporting inputs:

- `A:\designlab\ohmic-speaker-db\output\final\coverage_report.json`
- `A:\designlab\ohmic-speaker-db\output\raw\allspeakersize_f150_2021.json`

## First-Pass Target Entities

The initial fitment seed should care about:

1. manufacturer
2. vehicle model
3. vehicle year range
4. speaker location
5. speaker size

Supporting metadata:

- source/provenance
- source confidence

Ignored for now:

- trim/package detail
- exact mounting depth
- speaker shape as a required field
- notes/install caveats as a required field
- adapters and recommendation layers

## First-Pass Seed Shape

The first normalized seed row should be organized around:

- `manufacturer_name`
- `vehicle_model_name`
- `vehicle_year_start`
- `vehicle_year_end`
- `speaker_location_label`
- `speaker_size_label`
- `source_name`
- `source_confidence`

Nullable carry-through fields:

- `speaker_shape`
- `mounting_depth_mm`
- `fitment_notes`

Safe derived fields:

- `vehicle_identity_key`
- `fitment_slot_key`
- `fitment_seed_status`

## Confidence View

Treat the current dataset as:

- structurally useful
- provenance-aware
- still effectively single-source in visible output

That means the current numeric confidence field should be preserved, but not
mistaken for strong multi-source agreement yet.

## Immediate Usefulness

This first fitment seed could support early:

- speaker-fitment browse/search scaffolding
- install-planning hints
- future BassBuilder or OSM fitment hooks
- content tooling for speaker size by vehicle/location

## Not Yet Safe To Claim

Do not market or architect this as:

- a complete fitment source of truth
- a full install-spec database
- a production ingestion pipeline

## Packet Result

The lane has moved from:

- "crawler exists"

to:

- "usable normalized export exists and can be shaped into a first fitment seed"

without pretending that the incubator workspace is already productized.
