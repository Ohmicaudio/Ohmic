Status: template note
Date: 2026-03-14

# Ohmic Loudspeaker Static Page Template And SEO Fields

## Purpose

Define what a future per-speaker static page must contain before any generation work starts.

This is a template definition only, not a page-generation go signal.

## Recommended Page Type

Future page type:

- one page per loudspeaker model when the data is strong enough to support a useful reference page

Suggested path shape later:

- `/reference/speakers/<brand>/<model>/`

## Minimum Required Fields

These fields should exist before a speaker page is generated:

- `brand`
- `model`
- `source_url`
- `product_type`
- `nominal_impedance_ohms`
- `diameter_inches`

If those are missing, the page should not be generated yet.

## Recommended Technical Fields

These are strong candidates for the first meaningful technical section:

- `fs_hz`
- `usable_frequency_low_hz`
- `usable_frequency_high_hz`
- `sensitivity_db`
- `power_rms_w`
- `qts`
- `qes`
- `qms`
- `vas_l`

Only fields that can be named confidently should be published.

Do not dump scrape-column labels onto public pages.

## Optional Enrichment Fields

Later enrichment can include:

- source image
- alternate product images
- category grouping
- application notes
- comparison links
- related speakers by brand, size, or type

## Page Sections

Recommended future section order:

1. title block
2. quick specs
3. application / category summary
4. technical parameter table
5. source and provenance
6. related models or comparison links

## SEO-Critical Fields

Every generated speaker page should define:

- `<title>`
- `<meta name="description">`
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image when available

Recommended title pattern:

- `<Brand> <Model> Speaker Reference | Ohmic Audio`

Recommended meta description ingredients:

- brand
- model
- product type
- size
- nominal impedance
- one or two strongest technical identifiers

## Structured Data Later

Good structured-data candidates later:

- `Product`
- `Brand`
- `ImageObject`

Only add structured data after:

- field naming is stable
- provenance rules are defined
- image policy is defined

## Publishing Rule

Generate only when the page can be genuinely useful.

Do not publish:

- thin stubs
- pages with unclear field names
- pages whose only value is “brand + model exists”

## Summary

The first useful speaker page should be:

- clearly identified
- technically credible
- provenance-aware
- SEO-complete

Not:

- a raw scrape dump with pretty HTML
