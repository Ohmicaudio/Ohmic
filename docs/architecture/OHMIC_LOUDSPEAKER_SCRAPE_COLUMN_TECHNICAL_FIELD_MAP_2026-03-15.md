Status: working field map
Date: 2026-03-15

# Ohmic Loudspeaker Scrape Column Technical Field Map

## Purpose

Turn the scrape-shaped loudspeaker CSV headers into a first-pass technical field
map that is good enough for narrow extraction planning.

This is not a mass-conversion run. It is the naming and confidence layer that
broader extraction would need first.

## Input Shape

Current raw header set:

- `photos_and_graphs href`
- `photo src`
- `brand_ref_imp`
- `brand_ref_imp 2`
- `brand_ref_imp 3`
- `brand_ref_imp 4`
- `highlighted 2`
- `size_type`
- `value 2`
- `value 4`
- `fr`
- `fr 2`
- `fr 3`
- `value 5`
- `symbol 4`
- `sub 4`
- `value 6`
- `value 7`
- `symbol 5`
- `sub 5`
- `value 8`
- `value 9`
- `value 10`
- `symbol 7`
- `sub 7`
- `value 11`
- `value 12`

## Core Rule

Do not normalize the technical fields by raw column position alone.

Instead, normalize by a mix of:

- stable identity columns
- repeated symbol/unit block patterns
- row variant detection

This matters because some rows carry a full block set and others shift later
fields left when a block is missing.

## High-Confidence Stable Mappings

These are stable enough to normalize directly.

| Raw source | Normalized field | Confidence | Notes |
| --- | --- | --- | --- |
| `photos_and_graphs href` | `source_url` | high | direct source page |
| `photo src` | `source_image_url` | medium | still needs image-policy review |
| `brand_ref_imp` | `brand` | high | stable across sampled rows |
| `brand_ref_imp 2` | `model` | high | stable across sampled rows |
| `brand_ref_imp 3` + `brand_ref_imp 4` | `nominal_impedance_ohms` | high | parse multi-coil patterns like `2 x Ω` separately |
| `highlighted 2` | `diameter_inches` | high | stable size field |
| `size_type` | `product_type` | high | stable category field |
| `value 2` | `fs_hz` | high | values fit expected resonance ranges |
| `value 4` | `sd_cm2` | medium-high | values fit effective cone area much better than Vas |
| `value 5` | `qts` | medium-high | values fit expected Qts ranges |

## Frequency Range Block

The `fr` cluster appears to describe a published usable frequency range.

| Raw source | Likely normalized field | Confidence | Notes |
| --- | --- | --- | --- |
| `fr` | range/unit wrapper | medium | often contains `- Hz` or blank |
| `fr 2` | `usable_frequency_low_hz` | medium | present on some rows, blank on others |
| `fr 3` | `usable_frequency_high_hz` | medium | present on some rows, blank on others |

Operational rule:

- treat `fr 2` and `fr 3` as optional frequency-range bounds
- do not require them for first-pass identity normalization

## Semantic Block Mapping

The strongest technical fields come from repeated symbol/unit blocks.

### Block A: Xmax

When the row contains:

- `symbol 4 = x`
- `sub 4 = max`
- `value 6 = mm`

then:

- `value 7` -> `xmax_mm`

Confidence:

- medium-high

### Block B: Sensitivity

When the row contains either:

- `symbol 5 = SPL`
- `sub 5 = 1W`
- `value 8 = dB`
- `value 9 = <number>`

or the shifted variant:

- `symbol 4 = SPL`
- `sub 4 = 1W`
- `value 6 = dB`
- `value 7 = <number>`

then the numeric value maps to:

- `sensitivity_db_1w`

Confidence:

- high

### Block C: Max Power

When the row contains either:

- `symbol 7 = P`
- `sub 7 = max`
- `value 11 = W`
- `value 12 = <number>`

or the shifted variant:

- `symbol 5 = P`
- `sub 5 = max`
- `value 8 = W`
- `value 9 = <number>`

then the numeric value maps to:

- `power_max_w`

Confidence:

- high

## Row Variants

At least two row shapes exist in the current CSV.

### Variant 1: Full Technical Block

Example brands:

- SICA
- Beyma
- Purifi
- Oberton

Pattern:

- carries Xmax block
- carries sensitivity block
- carries max-power block
- leaves `value 10` as an extra unlabeled technical value

### Variant 2: Shifted Block Layout

Example brands:

- EUPHORIA

Pattern:

- Xmax block is missing entirely
- sensitivity block shifts into the `symbol 4 / sub 4 / value 6 / value 7` slot
- max-power block shifts into the `symbol 5 / sub 5 / value 8 / value 9` slot
- trailing `symbol 7 / sub 7 / value 11 / value 12` fields go empty

Operational rule:

- detect the block meaning from the `symbol` + `sub` tokens
- do not assume `value 7`, `value 9`, or `value 12` always mean the same field

## Still Ambiguous

These fields are not solid enough for broad extraction yet.

### `value 10`

Most likely meaning:

- `voice_coil_inductance_mh` or another single technical scalar

Why it is still ambiguous:

- no adjacent symbol/unit labels
- values are plausible for more than one field family at first glance
- the CSV does not name the parameter explicitly

Current call:

- keep as `unlabeled_technical_value_1`
- do not publish or normalize it into a user-facing field yet

Confidence:

- low-medium

### Unit-mojibake risk in impedance field

`brand_ref_imp 3` sometimes contains clean `Ω`, but unit corruption appears in
other views of the file.

Current call:

- trust the numeric impedance value
- normalize the unit label independently

Confidence:

- medium-high

## Safe Next Extraction Pass

The next small extraction pass could safely normalize:

- `source_url`
- `source_image_url`
- `brand`
- `model`
- `nominal_impedance_ohms`
- `diameter_inches`
- `product_type`
- `fs_hz`
- `sd_cm2`
- `qts`
- `usable_frequency_low_hz` when present
- `usable_frequency_high_hz` when present
- `xmax_mm` when the `x/max/mm` block exists
- `sensitivity_db_1w` by semantic block detection
- `power_max_w` by semantic block detection

It should not yet normalize:

- `value 10`
- any guessed technical field not backed by a labeled block

## Practical Extraction Rule

The right extraction strategy is:

1. normalize stable identity fields directly
2. parse block meaning from `symbol` and `sub` tokens
3. map only the numeric values whose semantic block is clear
4. quarantine unlabeled leftovers instead of guessing

That gives a usable first technical normalization pass without turning the CSV
into fiction.
