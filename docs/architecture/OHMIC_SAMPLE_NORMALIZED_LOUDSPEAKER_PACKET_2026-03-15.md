Status: sample packet note
Date: 2026-03-15

# Ohmic Sample Normalized Loudspeaker Packet

## Purpose

Create one tiny machine-readable payload from the loudspeaker normalization
work.

This is not a broad extraction run. It is a sample packet that later extractor,
page, and schema work can point at without guessing what the first safe payload
should look like.

## Source

Generator:

- `B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1`

Input:

- `B:\junk\loudspeakerdatabase.csv`

Generated packet:

- `B:\ohmic\generated\loudspeaker\sample-normalized-loudspeaker-packet-2026-03-15.json`

## Included Sample Rows

- `Beyma 15LEX1200Nd`
- `SICA 10 H 2 CS`
- `EUPHORIA ESW10D4`

These rows intentionally cover:

- a full semantic-block layout with `xmax`, sensitivity, and max power
- a shifted layout where `xmax` is missing and later fields move left

## Safe Fields In The Packet

The sample packet currently treats these as safe enough for narrow downstream
use:

- `brand`
- `model`
- `display_name`
- `product_type`
- `diameter_inches`
- `nominal_impedance_ohms`
- `fs_hz`
- `sd_cm2`
- `qts`
- `usable_frequency_low_hz` when present
- `usable_frequency_high_hz` when present
- `grouped_parse.fields.xmax_mm` when explicit
- `grouped_parse.fields.sensitivity_db_1w` when explicit
- `grouped_parse.fields.power_max_w` when explicit
- `source_trace.source_url`
- `source_trace.source_image_url`
- `source_trace.csv_row_index`

## Quarantined Fields

The packet still includes raw or unresolved leftovers that should not be turned
into public speaker copy by default:

- `unlabeled_technical_value_1`
- `nominal_impedance_raw`
- `source_trace.raw_fields.*`

These stay in the packet so downstream work can audit provenance and ambiguous
values without pretending they are polished display fields.

## Operational Value

This sample packet gives the next loudspeaker steps one concrete payload to use
for:

- schema drafting
- static page template wiring
- extraction-lane planning
- fixture-style checks for later parser revisions
- one first speaker reference page packet

## Current Representative Page Candidate

The strongest first page candidate from this packet is:

- `Beyma 15LEX1200Nd`

Why:

- full grouped-parse block is present
- brand/model identity is clean
- source URL and image URL are both preserved
- the page can demonstrate provenance, quick specs, and grouped technical
  fields without guessing beyond the sample

## Boundary Rule

Downstream page work should consume:

- normalized display-safe fields
- grouped parsed fields when explicit
- `source_trace.source_url` and `source_trace.source_image_url`

It should not surface:

- `source_trace.raw_fields.*`
- `unlabeled_technical_value_1`
- speculative renamed fields that have not been proven yet
