Status: prototype note
Date: 2026-03-15

# Ohmic Grouped Loudspeaker Field Parser Prototype

## Purpose

Prove one narrow extraction rule for the grouped loudspeaker scrape fields
without mass-converting the dataset.

The specific question is whether the repeated `symbol` + `sub` + `unit` blocks
are strong enough to recover technical fields even when the row layout shifts.

## Prototype Surface

Script:

- `B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1`

Input:

- `B:\junk\loudspeakerdatabase.csv`

Representative models:

- `Beyma 15LEX1200Nd`
- `SICA 10 H 2 CS`
- `EUPHORIA ESW10D4`

## Parser Rule

Do not infer grouped technical fields from fixed numeric columns alone.

Instead:

1. inspect each semantic slot block
2. read the `symbol`, `sub`, and unit token together
3. map only when the block meaning is explicit

Current prototype mappings:

- `x` + `max` + `mm` -> `xmax_mm`
- `SPL` + `1W` + `dB` -> `sensitivity_db_1w`
- `P` + `max` + `W` -> `power_max_w`

## Why This Works

The sampled rows show two real variants:

- full block rows where `xmax`, sensitivity, and max power all appear
- shifted rows where `xmax` is missing and the later technical blocks move left

The grouped parser still recovers the same sensitivity and max-power meaning in
both shapes because it keys off the semantic tokens instead of the raw value
column position.

## Expected Sample Output

Run:

```powershell
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1
```

Expected result shape:

- each sample row emits stable identity fields
- each sample row keeps a `source_trace` block with CSV row index, source URL,
  source image URL, and the exact raw columns used in normalization
- grouped fields are nested under `grouped_parse.fields`
- row shape is labeled as either `full_block` or `shifted_missing_xmax`

Observed sample excerpt:

```json
[
  {
    "brand": "Beyma",
    "model": "15LEX1200Nd",
    "source_trace": {
      "csv_row_index": 4,
      "source_url": "https://loudspeakerdatabase.com/Beyma/15LEX1200Nd"
    },
    "grouped_parse": {
      "variant": "full_block",
      "fields": {
        "xmax_mm": 11,
        "sensitivity_db_1w": 94.8,
        "power_max_w": 2400
      }
    }
  },
  {
    "brand": "SICA",
    "model": "10 H 2 CS",
    "grouped_parse": {
      "variant": "full_block",
      "fields": {
        "xmax_mm": 6,
        "sensitivity_db_1w": 89.1,
        "power_max_w": 400
      }
    }
  },
  {
    "brand": "EUPHORIA",
    "model": "ESW10D4",
    "grouped_parse": {
      "variant": "shifted_missing_xmax",
      "fields": {
        "sensitivity_db_1w": 84.1,
        "power_max_w": 1000
      }
    }
  }
]
```

## Takeaway

This is enough proof to support the next extraction rule:

- normalize stable identity fields directly
- preserve raw-source lineage inside the packet instead of relying on external
  notes
- normalize grouped technical fields only through semantic block detection
- quarantine unlabeled leftovers such as `value 10` until their meaning is
  proven

That gives a safer first-pass extractor than blind column renaming.
