Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-static-content

# Ohmic Public Placeholder Copy Leak Cleanup

## Scope

Apply one bounded static-site wording pass to remove rough placeholder language
from public cards and chapter-stat footers.

## Applied Changes

- `public/measurement/index.html`
  - SPL Meter card copy no longer mentions a `placeholder workflow`
- chapter-stat footer lines on these public pages now say
  `Supporting visuals continue in linked reference assets` instead of exposing
  raw placeholder counts:
  - `public/subwoofer-enclosures/sections/10-7-troubleshooting-and-common-problems/index.html`
  - `public/mobile-electronics/sections/5-6-remote-start-security-and-smart-vehicle-integration/index.html`
  - `public/tuning/sections/4-6-sound-quality-vs-spl-competition/index.html`
  - `public/dsp/sections/12-7-complete-dsp-setup-walkthrough-real-world-example/index.html`
  - `public/installation/sections/2-6-batteries-and-capacitors/index.html`

## Why

Placeholder bookkeeping is still useful internally, but raw placeholder counts
and staging language reduce trust when they appear in public-facing copy.

This pass preserves honest staging through external docs instead of exposing it
in live page text.

## Verification

- diff sanity check on the six touched public HTML files

## Follow-on

- clean remaining placeholder-style descriptions in `public/ai-index.json`
- sweep remaining public page footer/stat wording for the same leak pattern
