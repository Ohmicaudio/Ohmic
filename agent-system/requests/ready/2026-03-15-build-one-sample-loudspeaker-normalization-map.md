Status: active
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
