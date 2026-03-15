Status: done
Priority: low
Date: 2026-03-14
Project: cross-project

# Plan Loudspeaker Database Extraction And Static Page Lane

## Goal

Turn the preserved loudspeaker database files into a defined later-use work packet for:

- data extraction
- image gathering
- per-speaker static pages where they make search sense

## Why

The files now exist outside the repos in:

- `B:\junk\loudspeakerdatabase.csv`
- `B:\junk\loudspeakerdatabase.xlsx`

They should not disappear into vague memory.

## Inputs

- `B:\junk\loudspeakerdatabase.csv`
- `B:\junk\loudspeakerdatabase.xlsx`
- `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DB_DATA_PIPELINE_PATH_2026-03-14.md`
- `B:\ohmic\repos\ohmic-audio-static-content`

## Deliverable

A scoped later-use plan that defines:

- what fields should be extracted first
- what image strategy is realistic
- when static per-speaker pages are worth generating
- what belongs in a data lane vs a content lane

## Constraints

- low priority behind current software completion
- treat `B:\junk` as source storage only
- do not move these files into an active repo until the extraction shape is defined

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_LOUDSPEAKER_DATABASE_EXTRACTION_AND_STATIC_PAGE_LANE_2026-03-14.md`
- captured the current scrape-shaped CSV reality and the need for normalization before page generation
- defined first extraction fields, recommended work order, and the rule that static pages must consume normalized data rather than raw scrape columns
