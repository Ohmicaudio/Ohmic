Status: working boundary
Date: 2026-03-15

# Ohmic Speaker Data Vs Content Boundary

## Purpose

Define what belongs in the speaker-data lane versus the static-content lane
before any loudspeaker page generation starts.

The goal is simple:

- machine-readable facts should have one owner
- editorial copy should have one owner
- derived display fields should be generated, not retyped by hand in two places

## Boundary Rule

Use a three-layer model:

1. data-owned fields
2. shared derived fields
3. content-owned fields

Static pages should consume normalized data. They should not become a second
manual database.

## 1. Data-Owned Fields

These belong in the data lane and should be treated as the canonical source of
truth.

### Product identity

- `source_url`
- `source_image_url`
- `brand`
- `model`
- `product_type`
- `manufacturer_part_number` if present later

### Technical specs

- `nominal_impedance_ohms`
- `diameter_inches`
- `fs_hz`
- `qes`
- `qms`
- `qts`
- `vas_l`
- `re_ohms`
- `sensitivity_db`
- `power_rms_w`
- `power_max_w`

### Vehicle-fitment facts, if linked later

- `manufacturer_name`
- `vehicle_model_name`
- `vehicle_year_start`
- `vehicle_year_end`
- `speaker_location_label`
- `speaker_size_label`
- `speaker_shape`
- `mounting_depth_mm`
- `fitment_notes`
- `source_name`
- `source_confidence`

### Provenance and lifecycle

- crawl/run identifiers
- source timestamps
- normalization status
- confidence bucket

Rule:

- if it can be measured, scraped, normalized, imported, or traced back to a
  source, it belongs in the data lane first

## 2. Shared Derived Fields

These can be generated from normalized data and reused by page builders, but
they should not be hand-maintained in both places.

- `speaker_slug`
- `display_name`
- normalized size labels
- normalized impedance display
- `vehicle_identity_key`
- `fitment_slot_key`
- fitment coverage counts
- comparison tags such as `subwoofer`, `midbass`, `tweeter`, `component-set`
  when derived by explicit rules
- default SEO seed strings generated from brand/model/type/size

Rule:

- derived fields should be generated from data rules or page templates
- if a derived value needs human tone or judgment, it moves into the content
  lane instead

## 3. Content-Owned Fields

These belong in the static content lane and should be treated as editorial
material, not database facts.

### Narrative copy

- page intro
- summary copy
- explanation of what the speaker is for
- buyer/use-case guidance
- comparison notes
- installation cautions written for humans
- educational sidebars

### Page framing

- section order
- callouts
- internal-link selection
- CTA placement
- related-guide selection

### SEO copy decisions

- final title tag wording
- meta description wording
- on-page heading phrasing
- editorial FAQ copy

Rule:

- if a sentence sounds like explanation, advice, positioning, or search copy,
  it belongs in the content lane

## What Should Never Be Duplicated Manually

Do not hand-copy these into static pages as if the page were the source of
truth:

- raw technical specs
- fitment rows
- provenance/confidence values
- source image URLs
- source product URLs
- normalized brand/model identity

If those appear on a page, they should be injected from normalized data or from
a controlled export, not typed twice.

## What The Data Lane Should Not Own

Do not push these into the database just because they are useful on pages:

- marketing copy
- educational explanation
- "best for" judgments
- recommendation tone
- upgrade persuasion copy
- hand-written FAQs

Those become stale faster and require editorial control.

## Static Page Build Rule

If loudspeaker pages are generated later, the build should work like this:

- data lane provides normalized product facts
- page template provides structure
- content lane provides editorial copy blocks
- shared derived rules provide slugs, display labels, and default SEO seeds

That keeps product facts and editorial content linked without making either
layer fake ownership of the other.

## Fitment Boundary

Speaker product pages and vehicle-fitment pages should stay separate by default.

- a speaker page is about the product
- a fitment page is about vehicle compatibility

They may link later, but one should not silently absorb the other's schema.

## Operational Call

For the next lane:

- normalize and govern product facts in the data lane
- keep editorial page copy in static content
- generate shared display fields instead of duplicating them manually

That is the cleanest path to later speaker pages without turning the content
repo into a shadow database.
