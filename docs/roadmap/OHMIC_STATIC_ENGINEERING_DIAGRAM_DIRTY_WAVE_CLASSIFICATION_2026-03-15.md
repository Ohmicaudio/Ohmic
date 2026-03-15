# Ohmic Static Engineering Diagram Dirty Wave Classification

Date: 2026-03-15
Project: ohmic-audio-static-content

## Current State

The engineering-diagram lane is not currently dirty.

`git status --short` in `B:\ohmic\repos\ohmic-audio-static-content` is clean
after the latest public-trust cleanup commits, including the
`public/assets/engineering-diagrams/*` surfaces.

## Evidence

- `public/assets/engineering-diagrams/images/*` currently contains:
  - `85` diagram SVGs
  - `2` graph SVGs
- `public/assets/engineering-diagrams/metadata/*` currently contains:
  - `69` metadata sidecars
- `git log --since="2026-03-14 00:00" -- public/assets/engineering-diagrams`
  shows `85` commits touching the lane
- recent history is dominated by deliberate asset additions such as:
  - `Add waterfall CSD example graphic`
  - `Add factory integration DSP diagram`
  - `Add SPL competition wall graphic`
  - `Add full-system time alignment graphic`
- the follow-on churn is small and explainable:
  - `Normalize public brand metadata surfaces`
  - `Clean static diagram copy placeholders`

## Classification

This was not generator trash and it was not ambient repo noise.

It was a real grouped asset-production wave with a smaller normalization tail:

1. primary wave:
   deliberate SVG and page-support additions tied to the graphics task queue
2. secondary wave:
   support-file cleanup in `image_catalog.json`, metadata text, and diagram copy

So the right classification is:

- `images/*`: active asset lane
- `metadata/*`: normalization debt inside the same lane
- catalog/support files: expected follow-on churn, not a separate dirty domain

## Gap Still Visible

The lane is clean, but metadata coverage is not yet complete.

At the time of this classification, these image assets do not have matching
metadata sidecars in `public/assets/engineering-diagrams/metadata`:

- `amplifier_setup_quick_reference`
- `before_after_eq_response`
- `bluetooth_profile_diagram`
- `competition_spl_wall`
- `competition_sq_install`
- `competition_wall_build_cross_section`
- `digital_audio_chain_diagram`
- `frequency_response_curve`
- `gain_knob_diagram`
- `head_unit_anatomy`
- `measurement_mic_types`
- `multi_camera_system_overview`
- `ohms_law_triangle`
- `remote_start_system_overview`
- `sq_scorecard`
- `sq_vs_spl_system_comparison`
- `swc_interface_location`
- `video_integration_signal_map`

## Decision

Do not freeze this lane as if it were suspicious churn.

Do not keep freelancing one-off edits inside it either.

Treat it as an active grouped asset lane with one clear next normalization pass:

- backfill missing metadata sidecars for the current unmatched SVG set
- refresh any catalog/support files once, in the same packet
- keep future diagram work bundled as image + metadata + page wiring together

## Next Safe Packet

The next grouped task should be:

- `backfill engineering-diagram metadata companions for unmatched assets`

That packet should stay inside:

- `public/assets/engineering-diagrams/images/*`
- `public/assets/engineering-diagrams/metadata/*`
- `public/assets/engineering-diagrams/image_catalog.json`

This keeps the lane moving without pretending the recent wave was accidental.
