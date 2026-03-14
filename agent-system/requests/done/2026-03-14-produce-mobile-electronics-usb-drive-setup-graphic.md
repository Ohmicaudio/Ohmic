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
handoff_from: 2026-03-14-split-second-wave-mobile-electronics-placeholder-graphics-from-qa.md
claim_id: 20260314T192413Z-6e792f5a
topic: requested-task

# Produce `USB Drive Setup` graphic

## Requested Outcome

- create one reusable `USB Drive Setup` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/usb_drive_setup.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/sections/5-3-digital-audio-sources-formats-and-quality/index.html`

## Instructions

- show folder structure and practical head-unit compatibility considerations

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/usb_drive_setup.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/usb_drive_setup.svg.txt`
- replaced the `USB Drive Setup` placeholder block in:
  - `mobile-electronics/sections/5-3-digital-audio-sources-formats-and-quality/index.html`
- verification confirmed the target page now reuses the SVG with real `<figure><img>` markup and a practical setup caption
- verification confirmed the rendered USB-drive setup diagram reads cleanly in static preview on `mobile-electronics/sections/5-3-digital-audio-sources-formats-and-quality/`
- the graphic keeps the real compatibility lessons centered: supported file system, clean folder structure, complete tags, and album-art fallback matter more than headline USB speed

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
