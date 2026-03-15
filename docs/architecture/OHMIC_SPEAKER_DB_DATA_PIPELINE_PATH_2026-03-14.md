# Ohmic Speaker DB Data Pipeline Path

Status: proposed path
Date: 2026-03-14

## Decision Direction

`A:\designlab\ohmic-speaker-db` should be preserved as an incubator data-pipeline lane, not treated as a finished database product.

## Current Truth

What exists today:

- source-specific crawler logic
- normalization helpers
- merge/export logic
- debug scripts and scrape probes

That means the current asset is:

- part crawler
- part ETL prototype
- part exploratory data lab

It is not yet:

- a durable database product
- a governed fitment source of truth
- a production ingestion pipeline

## Recommended Destination

Short term:

- keep this as a documented incubator lane in `B:\ohmic`
- do not silently drop it
- do not treat the `A:` crawler output as canonical product data

Medium term:

- create a dedicated `B:` repo or repo-local data-lab home when work resumes in earnest

Recommended future repo name:

- `ohmic-vehicle-fitment-lab`

Alternative acceptable name:

- `ohmic-speaker-fitment`

## Why Not Put It Directly In `ohmic-audio-labs` Now

Because the current asset still mixes:

- crawler experiments
- scrape-debug scripts
- pipeline logic
- output artifacts

Dropping that directly into the main app repo would add noise faster than value.

## Version 1 Data-Pipeline Requirements

Before productization, the lane needs:

1. clear source adapters
2. normalized internal schema
3. confidence rules that are source-aware
4. reproducible crawl runs
5. run metadata and provenance
6. explicit export contracts
7. a separation between debug tools and production pipeline

## Product Uses Later

If matured, this lane could support:

- BassBuilder defaults
- install planning helpers
- OSM fitment hints
- SEO pages
- vehicle-specific speaker guides

## Operational Rule

Preserve it now.

Productize it later.

Do not confuse the current crawler workspace with a finished database.
