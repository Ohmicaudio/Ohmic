Status: worked example
Date: 2026-03-15

# Ohmic Sample Loudspeaker Normalization Map

## Purpose

Prove the loudspeaker normalization model on one real CSV row before any broader
extraction work starts.

This is a single worked example, not a batch conversion rule.

## Source Row

Chosen sample:

- brand: `Beyma`
- model: `15LEX1200Nd`
- raw source URL: `https://loudspeakerdatabase.com/Beyma/15LEX1200Nd`

Reason for choosing it:

- clear brand and model
- clear size and product type
- enough extra technical columns to show where the mapping is still ambiguous

## Raw CSV Slice

From `B:\junk\loudspeakerdatabase.csv`:

| Raw column | Raw value |
| --- | --- |
| `photos_and_graphs href` | `https://loudspeakerdatabase.com/Beyma/15LEX1200Nd` |
| `photo src` | `https://loudspeakerdatabase.com/images/mini/Beyma/15LEX1200Nd/Beyma_15LEX1200Nd_(Photo_1).webp.webp` |
| `brand_ref_imp` | `Beyma` |
| `brand_ref_imp 2` | `15LEX1200Nd` |
| `brand_ref_imp 3` | `Ω` rendered in the file as mojibake in some rows |
| `brand_ref_imp 4` | `8` |
| `highlighted 2` | `15` |
| `size_type` | `Subwoofer` |
| `value 2` | `36` |
| `value 4` | `880` |
| `fr` | `- Hz` |
| `fr 2` | `40` |
| `fr 3` | `1500` |
| `value 5` | `0.30` |
| `symbol 4` | `x` |
| `sub 4` | `max` |
| `value 6` | `mm` |
| `value 7` | `11` |
| `symbol 5` | `SPL` |
| `sub 5` | `1W` |
| `value 8` | `dB` |
| `value 9` | `94.8` |
| `value 10` | `11.7` |
| `symbol 7` | `P` |
| `sub 7` | `max` |
| `value 11` | `W` |
| `value 12` | `2400` |

## Safe Normalized Mapping

These fields are safe to normalize now without pretending the unlabeled scrape
columns are already governed.

| Normalized field | Value | Source basis | Confidence |
| --- | --- | --- | --- |
| `source_url` | `https://loudspeakerdatabase.com/Beyma/15LEX1200Nd` | `photos_and_graphs href` | high |
| `source_image_url` | `https://loudspeakerdatabase.com/images/mini/Beyma/15LEX1200Nd/Beyma_15LEX1200Nd_(Photo_1).webp.webp` | `photo src` | medium |
| `brand` | `Beyma` | `brand_ref_imp` | high |
| `model` | `15LEX1200Nd` | `brand_ref_imp 2` | high |
| `nominal_impedance_ohms` | `8` | `brand_ref_imp 3` + `brand_ref_imp 4` | high |
| `diameter_inches` | `15` | `highlighted 2` | high |
| `product_type` | `Subwoofer` | `size_type` | high |

## Safe Derived Fields

These are generated from the normalized fields above, not copied manually into a
future page.

| Derived field | Value | Rule |
| --- | --- | --- |
| `speaker_slug` | `beyma-15lex1200nd` | lowercase brand + model slug |
| `display_name` | `Beyma 15LEX1200Nd` | brand + model |
| `normalized_impedance_display` | `8 ohm` | impedance display seed |
| `normalized_size_display` | `15 inch` | size display seed |
| `seo_title_seed` | `Beyma 15LEX1200Nd Speaker Reference | Ohmic Audio` | template rule |
| `candidate_page_path` | `/reference/speakers/beyma/15lex1200nd/` | page-template rule |

## Tentative Technical Mapping

These values look usable, but the current scrape column names are still too weak
to call them production-safe without another labeling pass.

| Tentative field | Raw evidence | Current call | Confidence |
| --- | --- | --- | --- |
| `usable_frequency_low_hz` | `fr 2 = 40` | likely lower bound of published frequency range | medium |
| `usable_frequency_high_hz` | `fr 3 = 1500` | likely upper bound of published frequency range | medium |
| `sensitivity_db` | `symbol 5 = SPL`, `sub 5 = 1W`, `value 8 = dB`, `value 9 = 94.8` | likely safe | medium-high |
| `power_max_w` | `symbol 7 = P`, `sub 7 = max`, `value 11 = W`, `value 12 = 2400` | likely safe | medium-high |
| `qts` or another TS field | `value 5 = 0.30` | plausible but unlabeled | low |
| `xmax_mm` | `symbol 4 = x`, `sub 4 = max`, `value 6 = mm`, `value 7 = 11` | plausible but still scrape-shaped | medium |

## Unresolved Ambiguities

These are the reasons broader extraction should not start yet:

- `value 2`, `value 4`, and `value 10` are not self-describing enough to map
  safely without a column-label pass
- `photo src` is structurally useful, but the `.webp.webp` suffix suggests the
  image lane needs normalization and attribution review before public use
- the CSV still carries mojibake in unit columns on some rows, which means unit
  parsing should not be treated as clean by default
- the current row shape mixes:
  - identity fields
  - technical fields
  - unit hints
  - symbol fragments
  without a governed schema

## Missing Before Broader Extraction

Before broader mapping starts, the lane still needs:

1. a governed column-label map for the scrape-shaped technical fields
2. unit normalization rules
3. image-source and attribution policy
4. confidence rules for tentative technical fields versus safe identity fields
5. one small extraction script or field-map packet that turns raw CSV headers
   into normalized names

## Practical Call

This worked example proves the current lane is good enough to normalize:

- source identity
- brand/model identity
- impedance
- size
- product type

It does not yet prove that the technical parameter block can be mass-extracted
without another labeling pass first.
