Status: done
Priority: low
Date: 2026-03-15
Project: cross-project
Owner: d
Claim ID: 20260315T034815Z-d6944b11

# Map Loudspeaker Scrape Columns To Normalized Technical Fields

## Goal

Turn the current scrape-shaped loudspeaker CSV headers into a first-pass technical field map.

## Why

The sample loudspeaker normalization map proved the identity fields are workable, but broader extraction is still blocked by weak raw column names like alue 2, r 2, and symbol 5.

## Inputs

- B:\junk\loudspeakerdatabase.csv
- B:\ohmic\docs\architecture\OHMIC_SAMPLE_LOUDSPEAKER_NORMALIZATION_MAP_2026-03-15.md
- B:\ohmic\docs\architecture\OHMIC_LOUDSPEAKER_DATABASE_EXTRACTION_AND_STATIC_PAGE_LANE_2026-03-14.md
- B:\ohmic\docs\architecture\OHMIC_SPEAKER_DATA_VS_CONTENT_BOUNDARY_2026-03-15.md

## Deliverable

A short mapping note that defines:

- likely meaning of the current raw technical columns
- confidence level for each mapping
- which columns are still too ambiguous for broad extraction
- what one small extraction pass could safely normalize next

## Constraints

- low priority behind software work
- do not mass-convert the dataset
- use representative row inspection only

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_LOUDSPEAKER_SCRAPE_COLUMN_TECHNICAL_FIELD_MAP_2026-03-15.md`
- mapped the stable identity and technical columns with confidence levels
- documented the semantic block parsing rule for `x max`, `SPL 1W`, and `P max`
- identified the shifted-row variant where sensitivity and max-power blocks move left when `xmax` is missing
- explicitly left `value 10` unresolved instead of guessing a user-facing field name
