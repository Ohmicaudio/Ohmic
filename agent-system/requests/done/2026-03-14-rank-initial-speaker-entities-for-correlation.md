Status: done
Priority: low
Date: 2026-03-14
Project: cross-project
Owner: d
Claim ID: 20260315T030646Z-fa723b62

# Rank Initial Speaker Entities For Correlation

## Goal

Define the first speaker-related entities we actually care about so correlation work stays narrow and useful.

## Why

There are only so many speaker-facing entities worth caring about first.

Without ranking them, the fitment lane will sprawl immediately.

## Inputs

- `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DB_DATA_PIPELINE_PATH_2026-03-14.md`
- `B:\ohmic\docs\migration\DESIGNLAB_INCUBATOR_REVIEW_2026-03-14.md`
- output inventory from `inventory-speaker-db-output-artifacts`

## Deliverable

A ranked first-pass list such as:

- manufacturer
- model line
- vehicle make
- vehicle model
- vehicle year range
- speaker location
- speaker size

With a note on what gets ignored for now.

## Constraints

- low priority behind software work
- keep it speaker-scoped
- do not turn this into a full schema proposal yet

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_SPEAKER_FITMENT_ENTITY_RANKING_2026-03-14.md`
- ranked the first-pass fitment entities as manufacturer, vehicle model, vehicle year range, speaker location, and speaker size
- separated provenance/confidence into supporting metadata instead of primary correlation entities
- explicitly parked trim/package detail, shape, mounting depth, notes, adapters, and recommendation layers for a later pass
