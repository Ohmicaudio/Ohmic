Status: done
Priority: low
Date: 2026-03-14
Project: cross-project
Owner: d
Claim ID: 20260315T030933Z-9417545f

# Correlate Speaker DB Crawl Output Into Fitment Seeds

## Goal

Assuming the current crawl is far enough along, correlate the harvested speaker / vehicle data into a first normalized fitment seed model.

## Why

The next valuable step is not more crawling.

It is figuring out:

- what entities matter first
- what fields map cleanly
- what confidence levels the data deserves

## Inputs

- `A:\designlab\ohmic-speaker-db`
- `B:\ohmic\docs\architecture\OHMIC_SPEAKER_DB_DATA_PIPELINE_PATH_2026-03-14.md`
- `B:\ohmic\docs\migration\DESIGNLAB_INCUBATOR_REVIEW_2026-03-14.md`
- `B:\ohmic\docs\roadmap\OHMIC_NEXT_10_HOURS_EXECUTION_PLAN_2026-03-14.md`

## Deliverable

A short correlation packet that defines:

- initial target entities for speaker fitment
- first normalized field map
- confidence buckets
- what we care about first for speaker-related use

## Constraints

- low priority behind current software work
- do not redesign the crawler
- do not create a new repo in this window
- treat `A:` as source material only

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_SPEAKER_FITMENT_CORRELATION_PACKET_2026-03-14.md`
- synthesized the inventory, entity ranking, and field-map work into one first-pass fitment correlation packet
- identified the current exported `speakers.json` dataset as the primary seed input
- documented the first target entities, first-pass normalized seed shape, and the current confidence caveat that visible output is still effectively single-source
- kept the work in planning/docs only and did not redesign the crawler or create a new repo
