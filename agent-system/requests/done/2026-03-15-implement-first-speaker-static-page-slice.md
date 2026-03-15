Status: done
Priority: medium
Date: 2026-03-15
Project: ohmicaudio-static
Owner: d
Claim ID: 20260315T183743Z-0a2a4856

# Implement First Speaker Static Page Slice

## Goal

Turn the first bounded speaker reference page packet into one real static page
without widening into bulk loudspeaker generation.

## Source

- `docs/roadmap/OHMIC_FIRST_SPEAKER_STATIC_PAGE_SAFE_SLICE_2026-03-15.md`
- `generated/loudspeaker/sample-normalized-loudspeaker-packet-2026-03-15.json`

## Focus

- one representative speaker page
- provenance-aware quick specs and technical table
- image / attribution placeholder block
- keep the slice commit-sized

## Acceptance

- one representative speaker static page is implemented
- only sample-backed, display-safe fields are shown
- provenance and source links are visible
- the slice does not turn into bulk speaker generation

## Outcome

Completed on 2026-03-15.

Result:

- implemented the first speaker reference page for the Beyma 15LEX1200Nd
- kept the page bounded to sample-backed, display-safe fields only
- exposed the preserved source page and source image URLs on-page
- embedded a safe packet excerpt so the page stays tied to committed normalized data

## Artifact

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\speakers\beyma\15lex1200nd\index.html`
- `B:\ohmic\generated\loudspeaker\sample-normalized-loudspeaker-packet-2026-03-15.json`
- `B:\ohmic\docs\roadmap\OHMIC_FIRST_SPEAKER_STATIC_PAGE_SAFE_SLICE_2026-03-15.md`

## Verification

- local static render returned `200` for `/reference/speakers/beyma/15lex1200nd/`
- canonical URL is present and points to `https://ohmicaudio.com/reference/speakers/beyma/15lex1200nd/`
- preserved source URL is visible on-page
- `raw_fields` does not appear in visible page output
