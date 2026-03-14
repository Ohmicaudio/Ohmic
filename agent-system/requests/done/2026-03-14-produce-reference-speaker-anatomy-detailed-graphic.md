scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: split
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T105615Z-5f61c27e
topic: requested-task

# Produce `Speaker Anatomy Detailed` graphic

## Requested Outcome

- create one reusable `Speaker Anatomy Detailed` asset
- use or refine the existing asset family at:
  - `assets/engineering-diagrams/images/diagrams/speaker_anatomy.svg`
- replace the placeholder in exactly these pages:
  - `reference/visual/speaker-anatomy-cross-section/index.html`
  - `reference/visual/sections/9-3-speaker-and-enclosure-reference-diagrams/index.html`

## Asset Brief

- cross-section woofer diagram
- label dust cap, cone, surround, spider, voice coil former, windings, top plate, magnet, back plate/yoke, pole piece, basket/frame, and terminal cup
- include brief functional labeling, not just part names

## Instructions

- prefer reusing/refining `speaker_anatomy.svg` over creating a second competing file name
- replace only the `Speaker Anatomy Detailed` placeholder family
- do not touch the T/S parameter or enclosure blueprint placeholders in the section page
- follow the verification steps in `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Completion

- refined the existing reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/speaker_anatomy.svg`
- updated the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/speaker_anatomy.svg.txt`
- replaced the `Speaker Anatomy Detailed` placeholder block in:
  - `reference/visual/speaker-anatomy-cross-section/index.html`
  - `reference/visual/sections/9-3-speaker-and-enclosure-reference-diagrams/index.html`
- verification confirmed both target pages now reuse `speaker_anatomy.svg` with real `<figure><img>` markup and captions
- verification confirmed the rendered page looks correct in static preview on `reference/visual/speaker-anatomy-cross-section/`
- unrelated T/S parameter and enclosure blueprint placeholders still remain in the section page and were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
