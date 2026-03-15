# Ohmic Speaker DB Output Inventory

Status: working inventory
Date: 2026-03-14
Source workspace: `A:\designlab\ohmic-speaker-db`

## Summary

The speaker-db lane already contains usable exported data, not just crawler code.

What exists today:

- one raw source sample in `output\raw`
- one exported final dataset in `output\final`
- pipeline code for normalization, merge, export, and schema
- debug/scrape probes around the crawler lane

What does not exist yet:

- a clearly persisted intermediate merged artifact
- multi-source harvested output on disk
- a governed production data package

## Artifact Inventory

### Raw Output

`A:\designlab\ohmic-speaker-db\output\raw\allspeakersize_f150_2021.json`

- type: raw source sample
- source shape: source-specific JSON
- current value: useful as provenance/example input
- current limitation: only one visible raw sample, not a broad raw corpus

### Final Exported Dataset

`A:\designlab\ohmic-speaker-db\output\final\speakers.json`

- type: exported normalized dataset
- size: 5,492 entries
- observed unique makes: 54
- observed unique locations: 30
- observed source values in export: `allspeakersize.com`
- field shape already present:
  - `make`
  - `model`
  - `year_start`
  - `year_end`
  - `location`
  - `size`
  - `shape`
  - `mounting_depth_mm`
  - `notes`
  - `source`
  - `confidence`
- current limitation:
  - `shape`, `mounting_depth_mm`, and `notes` are null for all sampled/exported rows
  - exported source coverage currently looks single-source despite merge logic existing in code

`A:\designlab\ohmic-speaker-db\output\final\speakers.csv`

- type: CSV export of the same final dataset
- current value: useful for spreadsheet review and quick manual inspection
- current limitation: not richer than the JSON export

`A:\designlab\ohmic-speaker-db\output\final\coverage_report.json`

- type: export summary
- current value:
  - `total_entries`: 5,492
  - `unique_makes`: 54
  - `average_confidence`: ~0.901
- current limitation: summary only, not a correlation input by itself

## Pipeline Artifacts

Code exists for:

- `pipeline\normalize.py`
- `pipeline\merge.py`
- `pipeline\export.py`
- `pipeline\schema.py`

Observed meaning:

- normalization rules already exist for make, model, location, and size cleanup
- merge logic exists, but the current export still appears to be sourced from one visible source
- schema is already shaped around speaker-fitment style records rather than raw page dumps

## Plausible Correlation Inputs

Best current correlation input:

- `A:\designlab\ohmic-speaker-db\output\final\speakers.json`

Secondary supporting inputs:

- `A:\designlab\ohmic-speaker-db\output\final\coverage_report.json`
- `A:\designlab\ohmic-speaker-db\output\raw\allspeakersize_f150_2021.json`

Why:

- the final JSON already provides normalized fitment-like rows
- the coverage report gives quick scale/source sanity context
- the raw sample helps explain provenance and source-specific field behavior

## Inventory Call

This lane is no longer "crawler only."

It is better described as:

- crawler plus ETL prototype
- with one usable normalized export
- and limited visible raw/source coverage on disk

That is enough to proceed into ranking entities and mapping a first fitment seed shape,
but not enough to call it a durable production dataset yet.
