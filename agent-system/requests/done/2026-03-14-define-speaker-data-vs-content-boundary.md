Status: done
Priority: low
Date: 2026-03-14
Project: cross-project
Owner: d
Claim ID: 20260315T032723Z-4b848481

# Define Speaker Data Vs Content Boundary

## Goal

Clarify what belongs in the speaker data lane versus what belongs in the static content lane.

## Why

Future speaker pages could blur:

- raw data
- fitment data
- brand copy
- editorial/reference content

That boundary should be explicit before generation starts.

## Inputs

- `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DB_DATA_PIPELINE_PATH_2026-03-14.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-14-plan-loudspeaker-database-extraction-and-static-page-lane.md`
- `B:\ohmic\repos\ohmic-audio-static-content`

## Deliverable

A short boundary note defining:

- data-owned fields
- content-owned fields
- shared derived fields
- what should never be duplicated manually

## Constraints

- low priority behind software completion
- no schema repo work in this step

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DATA_VS_CONTENT_BOUNDARY_2026-03-15.md`
- defined the three-layer model: data-owned fields, shared derived fields, and content-owned fields
- made product facts, specs, fitment rows, provenance, and source URLs explicitly data-owned
- made editorial copy, page framing, and final SEO wording explicitly content-owned
- locked the rule that static speaker pages must consume normalized data instead of manually duplicating database facts
