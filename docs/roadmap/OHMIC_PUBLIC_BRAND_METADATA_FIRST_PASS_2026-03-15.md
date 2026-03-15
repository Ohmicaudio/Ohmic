Status: implementation_note
Date: 2026-03-15
Project: ohmicaudio-public

# Ohmic Public Brand Metadata First Pass

## Purpose

Record the first bounded public-trust cleanup slice so the site audit turns
into visible credibility work instead of another open-ended polish pass.

## In Scope

This first pass only covers front-door public naming and machine-readable
metadata:

- `public/index.html`
- `public/ai-index.json`
- `public/assets/engineering-diagrams/image_catalog.json`

## Corrections Applied

- normalized the homepage title and meta description from internal
  `static content` wording to public-facing `Reference Hub` wording
- fixed the homepage legacy-domain note to point at
  `https://ohmicaudiolabs.com/`
- normalized the AI index top-level brand name to `Ohmic Audio`
- removed the stray `labs` brand term from the AI index wiki entry metadata
- normalized the engineering image catalog project string to `Ohmic Audio`

## Deliberately Left Out

- deep content rewriting
- broad `meta/*` page editorial cleanup
- worked example math verification
- large-scale mojibake cleanup across `ai-index.json`
- route/path slug changes for existing published pages

## Next Public Trust Slice

The next highest-value follow-on remains:

- `verify-high-risk-public-worked-examples`

That slice should focus on technical correctness and contradictory example
content, not naming cleanup.
