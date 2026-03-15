Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T105410Z-edc3728e

# Suppress Live Visual Placeholders On Public Pages

## Goal

Hide, replace, or otherwise suppress visible placeholder markers on live public
pages until the real visuals are ready.

## Source

- `docs/roadmap/OHMICAUDIO_SITE_AUDIT_TASK_BUNDLE_2026-03-15.md`
- `docs/roadmap/OHMIC_IMAGE_GENERATION_BRIEFS_FROM_SITE_AUDIT_2026-03-15.md`

## Focus

- explicit `[VISUAL PLACEHOLDER: ...]` tokens
- placeholder-heavy visual reference surfaces
- unreleased visual callouts that currently reduce trust

## Acceptance

- placeholder tokens are no longer visible on the live public surface
- unfinished visuals are hidden or replaced cleanly

## Outcome

Completed on 2026-03-15.

Result:

- replaced visible `[VISUAL PLACEHOLDER: ...]` tokens across the live static
  surface with neutral visitor-facing wording
- stripped placeholder-only suffixes from list/index entries so visual hub pages
  no longer leak internal placeholder filenames
- preserved surrounding explanatory copy where the placeholder marker was
  embedded inline with real description text

## Verification

- placeholder search count in `B:\ohmic\repos\ohmic-audio-static-content\public` returned `0`
- spot-checked `public/reference/visual/index.html`
- spot-checked `public/tuning/installer-level-professional-system-calibration/index.html`
