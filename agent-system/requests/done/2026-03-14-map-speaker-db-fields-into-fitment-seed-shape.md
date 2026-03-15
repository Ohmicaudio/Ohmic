Status: done
Priority: low
Date: 2026-03-14
Project: cross-project
Owner: d
Claim ID: 20260315T030804Z-514c4ab3

# Map Speaker DB Fields Into Fitment Seed Shape

## Goal

Turn the current crawl output and entity ranking into a first normalized fitment seed shape.

## Why

Correlation becomes useful only when current fields are mapped into a stable target shape.

## Inputs

- `A:\designlab\ohmic-speaker-db`
- output from `inventory-speaker-db-output-artifacts`
- output from `rank-initial-speaker-entities-for-correlation`
- `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DB_DATA_PIPELINE_PATH_2026-03-14.md`

## Deliverable

A first-pass field map that names:

- source field
- normalized target field
- confidence expectation
- missing-data rule

## Constraints

- low priority behind software work
- do not create a production schema repo
- do not redesign crawler internals

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_SPEAKER_FITMENT_SEED_FIELD_MAP_2026-03-14.md`
- mapped the current export fields into a first-pass fitment seed centered on manufacturer, model, year range, location, and size
- defined supporting provenance/confidence fields and simple derived keys
- recorded explicit missing-data rules and parked trim/package, adapter, and deep install detail fields for later work
