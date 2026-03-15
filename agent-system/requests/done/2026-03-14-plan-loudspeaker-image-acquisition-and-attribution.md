Status: done
Priority: low
Date: 2026-03-14
Project: cross-project

# Plan Loudspeaker Image Acquisition And Attribution

## Goal

Define a realistic strategy for getting speaker images later without creating copyright, provenance, or quality chaos.

## Why

The data lane may eventually want:

- product images
- brand images
- diagram fallbacks

That requires a source and attribution plan first.

## Inputs

- `B:\junk\loudspeakerdatabase.csv`
- `B:\junk\loudspeakerdatabase.xlsx`
- `B:\ohmic\repos\ohmic-audio-static-content`

## Deliverable

A short strategy note covering:

- likely image sources
- attribution requirements
- when to use generated diagrams instead of product photos
- what image fields should exist in the future data shape

## Constraints

- low priority behind software completion
- planning only, no scraping burst in this window

## Completion

- added `B:\ohmic\docs\architecture\OHMIC_LOUDSPEAKER_IMAGE_ACQUISITION_AND_ATTRIBUTION_2026-03-14.md`
- defined staged image handling, attribution rules, and recommended future image fields
- explicitly treated current source-hosted image URLs as references rather than automatically safe product assets
