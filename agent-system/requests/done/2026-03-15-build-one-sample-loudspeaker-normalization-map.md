Status: done
Priority: low
Date: 2026-03-15
Project: cross-project
Owner: d
Claim ID: 20260315T034318Z-5e5c970f

# Build One Sample Loudspeaker Normalization Map

## Goal

Create one concrete sample mapping from the raw loudspeaker CSV into the normalized field shape proposed in the planning docs.

## Why

The loudspeaker planning lane is shaped.

The next useful move is not mass extraction. It is proving the mapping on one real row so the field model stops being theoretical.

## Inputs

- `B:\junk\loudspeakerdatabase.csv`
- `B:\ohmic\docs\architecture\OHMIC_LOUDSPEAKER_DATABASE_EXTRACTION_AND_STATIC_PAGE_LANE_2026-03-14.md`
- `B:\ohmic\docs\architecture\OHMIC_LOUDSPEAKER_STATIC_PAGE_TEMPLATE_AND_SEO_FIELDS_2026-03-14.md`
- `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DATA_VS_CONTENT_BOUNDARY_2026-03-15.md`

## Deliverable

A single worked example that shows:

- raw source columns
- normalized target fields
- unresolved ambiguities
- what is still missing before broader extraction

## Constraints

- low priority behind current software work
- do not mass-convert the dataset
- use one or a few sample rows only

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\architecture\OHMIC_SAMPLE_LOUDSPEAKER_NORMALIZATION_MAP_2026-03-15.md`

Result:

- one real loudspeaker row was mapped into a normalized sample record
- high-confidence identity fields were separated from unresolved grouped fields
- the next extraction rule is now explicit: grouped-symbol parsing is required
  before broader conversion

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_SAMPLE_LOUDSPEAKER_NORMALIZATION_MAP_2026-03-15.md`
- mapped one real Beyma loudspeaker row from the raw CSV into the safe normalized field shape
- separated safe identity fields from tentative technical mappings and explicitly documented unresolved ambiguities
- captured what still blocks broader extraction, including weak scrape column labels, unit cleanup, and image normalization policy
