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
claim_id: 20260314T131735Z-f8ee3f26
topic: requested-task

# Produce `Backup Camera Wiring` graphic

## Requested Outcome

- create one reusable `Backup Camera Wiring` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/backup_camera_wiring.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/beginner-level-video-systems-overview/index.html`
  - `mobile-electronics/sections/5-4-video-integration-displays-cameras-and-navigation/index.html`

## Instructions

- show power, trigger, video path, and display endpoint clearly

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/backup_camera_wiring.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/backup_camera_wiring.svg.txt`
- replaced the `Backup Camera Wiring` placeholder block in:
  - `mobile-electronics/beginner-level-video-systems-overview/index.html`
  - `mobile-electronics/sections/5-4-video-integration-displays-cameras-and-navigation/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered backup-camera wiring graphic looks correct in static preview on both target pages
- the graphic preserves the real install distinction that camera power, reverse trigger, and video path are separate jobs, while using the common reverse-lamp-powered install as the reference layout

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
