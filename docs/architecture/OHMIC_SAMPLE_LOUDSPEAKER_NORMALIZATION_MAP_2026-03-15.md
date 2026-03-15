Status: sample mapping
Date: 2026-03-15

# Ohmic Sample Loudspeaker Normalization Map

## Purpose

Turn one real row from `B:\junk\loudspeakerdatabase.csv` into a normalized
speaker record so the extraction lane has a concrete reference point.

This is not a mass-conversion step.

It is a worked example.

## Sample Source Row

Selected source row:

- `source_url`: `https://loudspeakerdatabase.com/SICA/10H2CS`
- `source_image_url`: `https://loudspeakerdatabase.com/images/mini/SICA/10H2CS/SICA_10H2CS_(Photo_1).jpg.webp`
- `brand_ref_imp`: `SICA`
- `brand_ref_imp 2`: `10 H 2 CS`
- `brand_ref_imp 3`: `Ω`
- `brand_ref_imp 4`: `8`
- `highlighted 2`: `10`
- `size_type`: `Mid Bass`
- `value 2`: `30.3`
- `value 4`: `340`
- `fr 2`: `30`
- `fr 3`: `2500`
- `value 5`: `0.37`
- `symbol 4`: `x`
- `sub 4`: `max`
- `value 6`: `mm`
- `value 7`: `6`
- `symbol 5`: `SPL`
- `sub 5`: `1W`
- `value 8`: `dB`
- `value 9`: `89.1`
- `value 10`: `5.01`
- `symbol 7`: `P`
- `sub 7`: `max`
- `value 11`: `W`
- `value 12`: `400`

## Raw To Normalized Mapping

### High-confidence identity fields

- `photos_and_graphs href` -> `source_url`
- `photo src` -> `source_image_url`
- `brand_ref_imp` -> `brand`
- `brand_ref_imp 2` -> `model`
- `brand_ref_imp 4` -> `nominal_impedance_ohms`
- `highlighted 2` -> `diameter_inches`
- `size_type` -> `product_type`

### High-confidence technical fields

- `fr 2` -> `usable_frequency_low_hz`
- `fr 3` -> `usable_frequency_high_hz`
- `value 7` + `value 6` + `symbol 4` + `sub 4` -> `xmax_mm`
- `value 9` + `symbol 5` + `sub 5` + `value 8` -> `sensitivity_db_1w`
- `value 12` + `symbol 7` + `sub 7` + `value 11` -> `power_max_w`

### Likely technical fields, but still need rule confirmation

- `value 2` -> likely `re_ohms`
- `value 4` -> likely `vas_l` or another volume-related field
- `value 10` -> unresolved technical value; do not publish yet

## Normalized Sample Record

```json
{
  "source_url": "https://loudspeakerdatabase.com/SICA/10H2CS",
  "source_image_url": "https://loudspeakerdatabase.com/images/mini/SICA/10H2CS/SICA_10H2CS_(Photo_1).jpg.webp",
  "brand": "SICA",
  "model": "10 H 2 CS",
  "display_name": "SICA 10 H 2 CS",
  "product_type": "Mid Bass",
  "diameter_inches": 10,
  "nominal_impedance_ohms": 8,
  "usable_frequency_low_hz": 30,
  "usable_frequency_high_hz": 2500,
  "xmax_mm": 6,
  "sensitivity_db_1w": 89.1,
  "power_max_w": 400,
  "unresolved_fields": {
    "value_2": "30.3",
    "value_4": "340",
    "value_10": "5.01"
  },
  "normalization_notes": [
    "Brand, model, impedance, size, and type are high-confidence fields.",
    "Frequency range appears to be represented by fr 2 and fr 3.",
    "Xmax, sensitivity, and power are encoded as grouped symbol fragments and need one parser rule.",
    "At least three generic value columns remain ambiguous and should not be published yet."
  ],
  "source_confidence": "medium"
}
```

## Ambiguities To Resolve Before Broader Extraction

### 1. Grouped symbol parsing is required

Several important fields are not encoded as one column. They are split across
multiple visual fragments.

Examples:

- `Xmax`
- sensitivity / `SPL 1W`
- `Pmax`

So the extractor needs grouped-field decoding, not simple column renaming.

### 2. Generic value columns are not safe to publish by guess

These columns are still ambiguous in the sample:

- `value 2`
- `value 4`
- `value 10`

They may be very useful later, but they need a rule or source-page check before
they become public fields.

### 3. The frequency display needs one normalization rule

The source uses:

- `fr`
- `fr 2`
- `fr 3`

The sample strongly suggests:

- `fr 2` = low usable frequency
- `fr 3` = high usable frequency

But the extractor should formalize that once rather than assuming it forever.

## Operational Rule Learned From The Sample

The extractor should not normalize by column name alone.

It also needs grouped parsing families such as:

- identity cluster
- frequency cluster
- xmax cluster
- sensitivity cluster
- power cluster

## What This Unblocks

This sample is enough to support the next low-risk step:

- define grouped-field parsing rules
- test them on a handful of rows
- then decide whether the dataset is consistent enough for broader extraction

## Summary

The dataset is usable.

The main issue is not lack of value. It is that several technical fields are
encoded as grouped visual fragments instead of clean named columns.

So the correct next move is:

- grouped-field decoding
- not blind CSV-to-schema mapping
