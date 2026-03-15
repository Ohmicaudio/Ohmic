Status: done
Priority: low
Date: 2026-03-14
Project: cross-project
Owner: d
Claim ID: 20260315T030412Z-63593673

# Inventory Speaker DB Output Artifacts

## Goal

Identify what concrete crawl and export artifacts already exist in `A:\designlab\ohmic-speaker-db` before correlation work starts.

## Why

We need to know whether the current lane has:

- usable outputs
- partial merges
- source-separated dumps
- only crawler code with no usable data

## Inputs

- `A:\designlab\ohmic-speaker-db`
- `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DB_DATA_PIPELINE_PATH_2026-03-14.md`

## Deliverable

A short inventory noting:

- output files that already exist
- whether they are raw, merged, or normalized
- which ones are plausible correlation inputs

## Constraints

- low priority behind software work
- do not rewrite the crawler
- do not move files into `B:` in this window

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DB_OUTPUT_INVENTORY_2026-03-14.md`
- confirmed the lane contains a usable exported dataset in `output\final`, not just crawler code
- identified `output\final\speakers.json` as the best current correlation input
- identified `coverage_report.json` and the raw `allspeakersize_f150_2021.json` sample as supporting inputs
- recorded that the visible export currently appears single-source and that `shape`, `mounting_depth_mm`, and `notes` are still null across the exported rows
- no crawler rewrite or file movement was performed
