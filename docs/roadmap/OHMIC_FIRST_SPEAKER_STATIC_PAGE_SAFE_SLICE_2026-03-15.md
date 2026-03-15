Status: implementation_packet
Date: 2026-03-15
Project: ohmicaudio-static

# Ohmic First Speaker Static Page Safe Slice

## Purpose

Define one commit-sized first speaker reference page slice so the loudspeaker
lane can become real static content without jumping straight to bulk generation.

## Representative Sample

Use the committed sample packet row for:

- `Beyma 15LEX1200Nd`

Source packet:

- `B:\ohmic\generated\loudspeaker\sample-normalized-loudspeaker-packet-2026-03-15.json`

Why this row first:

- identity is clean
- grouped parsed technical fields are present
- source URL and source image URL are available
- it can demonstrate provenance-aware page structure without using speculative
  fields

## First Slice Output

One first static page packet should include:

- one reference page at a path shaped like
  `public/reference/speakers/beyma/15lex1200nd/index.html`
- one small page-local data fixture or embedded packet excerpt derived from the
  committed sample packet
- one explicit source / attribution block using the preserved `source_trace`
  values

## Required Display Fields

The page should use only fields already safe in the sample packet:

- `display_name`
- `brand`
- `model`
- `product_type`
- `diameter_inches`
- `nominal_impedance_ohms`
- `fs_hz`
- `sd_cm2`
- `qts`
- `usable_frequency_low_hz`
- `usable_frequency_high_hz`
- `grouped_parse.fields.xmax_mm`
- `grouped_parse.fields.sensitivity_db_1w`
- `grouped_parse.fields.power_max_w`
- `source_trace.source_url`
- `source_trace.source_image_url`

## Required Page Sections

The first page should contain only:

1. title / identity block
2. quick specs card
3. technical table using only proven fields
4. provenance and source section
5. image / attribution placeholder block

## Explicitly Out Of Scope

- bulk page generation
- search/index system work
- comparison widgets
- related-model automation
- speculative technical fields from `source_trace.raw_fields`
- `unlabeled_technical_value_1`
- schema-wide extraction refactors
- broad speaker image acquisition beyond one placeholder/attribution path

## Minimum Verification

At minimum:

- the page renders locally in the static-content surface without broken links
- page title, meta description, and canonical URL are filled
- the source link resolves to the preserved `source_trace.source_url`
- no raw scrape labels or unresolved field names appear in visible copy

## Finish Condition

- one representative speaker page exists
- the slice uses real sample data instead of invented content
- provenance is visible
- the commit stays page-sized and does not open a bulk generation lane
