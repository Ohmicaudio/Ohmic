Status: scoped lane
Date: 2026-03-14

# Ohmic Loudspeaker Database Extraction And Static Page Lane

## Purpose

Define the later-use lane for turning the preserved loudspeaker database files into:

- normalized speaker data
- image-aware enrichment
- selective per-speaker static pages

## Source Inputs

Current preserved files:

- `B:\junk\loudspeakerdatabase.csv`
- `B:\junk\loudspeakerdatabase.xlsx`

## Current Reality

The CSV already contains useful content, but it is scrape-shaped rather than product-shaped.

Observed examples:

- source page URL
- source image URL
- brand
- model
- nominal impedance
- size
- type/category
- frequency-related values

Current column names are not yet governed.

Examples:

- `photos_and_graphs href`
- `photo src`
- `brand_ref_imp`
- `brand_ref_imp 2`
- `value 2`
- `fr`

That means the next work is not “publish pages now.”

It is:

- field mapping
- naming cleanup
- confidence and provenance decisions

## Recommended Work Order

### 1. Normalize The Data Shape

First extract the core speaker identity fields:

- source URL
- source image URL
- brand
- model
- nominal impedance
- nominal diameter / size
- product type

Then extract the second-tier technical fields only after identity is stable.

### 2. Define The Page Template Before Generation

Do not mass-generate pages before deciding:

- required fields
- optional fields
- SEO fields
- structured-data candidates
- what pages are worth publishing at all

### 3. Define Image Strategy Before Pulling Images

The image lane should answer:

- whether to hotlink, download, or re-source
- what attribution or provenance is required
- when diagrams are better than product images

### 4. Generate Only The Worthwhile Pages

Per-speaker static pages should be created only where they make search and reference sense.

Good candidates later:

- meaningful brand/model pages
- pages with enough technical fields to be useful
- pages that can support comparison, fitment, or reference use

Bad candidates:

- empty stubs
- pages with only one or two weak fields
- pages with no clear search or utility value

## First Extraction Fields

Recommended first normalized fields:

- `source_url`
- `source_image_url`
- `brand`
- `model`
- `nominal_impedance_ohms`
- `diameter_inches`
- `product_type`

Recommended later technical fields:

- `fs_hz`
- `qes`
- `qms`
- `qts`
- `vas_l`
- `re_ohms`
- `sensitivity_db`
- `power_rms_w`
- `power_max_w`

## Boundary Rule

This lane is not the same as vehicle fitment.

Speaker product pages and vehicle fitment pages should stay conceptually separate unless a future data model intentionally links them.

## Static Page Rule

The static-page lane should consume normalized data, not scrape-shaped raw CSV columns.

That means:

- no direct raw-column-to-page generation
- no publishing from the raw file itself

## Summary

Short version:

- preserve the files in `B:\junk`
- normalize identity first
- define template and image policy second
- only then consider per-speaker static generation
