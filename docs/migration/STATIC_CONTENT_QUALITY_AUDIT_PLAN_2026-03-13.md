# Static Content Quality Audit Plan

Date: 2026-03-13

## Purpose

Turn the static-content cleanup into concrete review buckets:

- content parity
- encoding cleanup
- styling and layout review
- graphics and illustration coverage

This avoids treating the static repo as "done" just because the files exist.

## Current Signals

- parity audit shows `594` shared static paths between app and static-host repos
- only `17` of those shared paths currently match by exact blob hash
- one concrete mojibake defect was found in `content-work/INSTRUCTIONS.md` and corrected
- the largest public sections by page count are:
  - `appendix`: `117`
  - `reference`: `104`
  - `meta`: `71`
  - `installation`: `46`
  - `dsp`: `36`
  - `subwoofer-enclosures`: `35`
  - `electrical`: `26`
  - `fundamentals`: `26`
  - `mobile-electronics`: `26`
  - `tuning`: `26`
  - `advanced-topics`: `25`

## Recommended Audit Order

1. `meta`
2. `advanced-topics`
3. `electrical`
4. `dsp`
5. `installation`
6. `appendix`
7. `reference`

Rationale:

- `meta` and top-level landing pages affect routing, discoverability, and perceived quality first
- `advanced-topics`, `electrical`, and `dsp` are already showing large content drift in parity samples
- `appendix` and `reference` are large surfaces that benefit from systematic treatment after the higher-visibility sections

## Audit Questions Per Section

- content: which side has the better current copy, app repo or static repo?
- encoding: are there mojibake or formatting artifacts?
- style: does the page match the current site tone and layout expectations?
- graphics: does the page need diagrams, illustrations, or richer visual treatment?
- routing: does the page still match current canonical paths and host assumptions?

## Stronger File Rule

Use this order when deciding which version is stronger:

1. correctness
2. completeness
3. clarity and useful density
4. structure and formatting integrity
5. alignment with current site direction
6. graphics and illustration support

That means:

- do not keep a prettier file if it is less accurate
- do not keep a denser file if it is mostly filler
- if one side wins on correctness and the other wins on polish, keep the correct one and queue polish as follow-up

## Deliverable Shape

Each section audit should produce:

1. keep app version
2. keep static version
3. merge manually
4. needs graphics
5. needs styling pass
6. needs encoding cleanup

## Next Move

Start with a section-level audit request for the highest-visibility buckets instead of trying to reconcile all `577` differing files at once.
