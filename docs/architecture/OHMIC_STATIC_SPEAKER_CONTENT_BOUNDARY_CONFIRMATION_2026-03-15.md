Status: boundary confirmation
Date: 2026-03-15

# Ohmic Static Speaker Content Boundary Confirmation

## Purpose

Reconfirm the static-content boundary after the grouped loudspeaker parser
prototype and sample normalized packet work.

The parser proof makes broader speaker generation feel close, but the system is
not ready to let `ohmic-audio-static-content` absorb raw data ownership.

## Confirmed Boundary

### Data lane stays responsible for:

- scrape-shaped source rows
- normalization logic
- grouped-field parsing
- confidence/provenance fields
- sample or future normalized packets
- any later machine-readable speaker or fitment records

### Static content stays responsible for:

- editorial page framing
- educational speaker guidance
- buyer/use-case copy
- human-written SEO copy
- section structure, callouts, FAQs, and CTA choices

## What The Parser Does Not Change

The grouped parser prototype proved one technical fact:

- semantic block detection can safely recover fields like `xmax`,
  `sensitivity_db_1w`, and `power_max_w` across multiple row shapes

It did not grant permission to:

- bulk-generate speaker pages into `ohmic-audio-static-content`
- copy raw specs into the content repo as source-of-truth data
- inject fitment tables into static pages as hand-maintained content
- treat the content repo as the home of normalized speaker records

## What Still Stays Blocked

Speaker-page generation is still blocked until at least these are true:

- a minimal trusted normalized record is governed as data, not content
- page-template inputs are defined explicitly
- image acquisition and attribution rules are settled
- product-page versus fitment-page separation is preserved
- generation rules avoid duplicating data-owned fields manually

## Operational Rule For The Next Lane

If a new loudspeaker task touches:

- parsing
- normalization
- confidence
- fitment rows
- source media URLs
- machine-readable spec payloads

it belongs in the data lane first.

If it touches:

- explanation
- page framing
- FAQs
- CTA flow
- editorial SEO wording

it belongs in the content lane.

## Current Safe Call

The current safe use of `ohmic-audio-static-content` is still:

- static educational content
- future speaker-page templates
- editorial blocks that consume governed data later

The current unsafe use is:

- turning the repo into a manually maintained loudspeaker database
