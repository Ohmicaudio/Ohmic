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
- `product_type`
- `diameter_inches`
- `fs_hz`
- `sd_cm2`
- `qts`
- `usable_frequency_low_hz` when present
- `usable_frequency_high_hz` when present
- `grouped_parse.fields.xmax_mm` when explicit
- `grouped_parse.fields.sensitivity_db_1w` when explicit
- `grouped_parse.fields.power_max_w` when explicit

## Quarantined Fields

The packet still includes one quarantined leftover:

- `unlabeled_technical_value_1`

That value is preserved so the sample packet stays honest to the source data,
but it is not promoted to a user-facing technical field yet.

## Operational Value

This sample packet gives the next loudspeaker steps one concrete payload to use
for:

- schema drafting
- static page template wiring
- extraction-lane planning
- fixture-style checks for later parser revisions
