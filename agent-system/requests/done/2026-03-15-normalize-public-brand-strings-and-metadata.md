Status: done
Priority: low
Date: 2026-03-15
Project: ohmicaudio-public
Owner: d
Claim ID: 20260315T174639Z-8eda7bdf

# Normalize Public Brand Strings And Metadata

## Goal

Normalize brand strings, titles, and metadata so public naming stops drifting
between brand and lab terminology where it should not.

## Source

- `docs/roadmap/OHMICAUDIO_SITE_AUDIT_TASK_BUNDLE_2026-03-15.md`
- `docs/systems/OHMIC_REPO_STORAGE_BOUNDARY_2026-03-15.md`

## Focus

- public-facing brand strings
- titles and meta descriptions
- nav labels and obvious host references

## Acceptance

- the first public naming pass is done in a bounded slice
- canonical public host language is applied consistently
- legacy lab naming is only retained where intentional

## Outcome

Completed on 2026-03-15.

Result:

- normalized the homepage title, description, and hub label to public-facing
  `Ohmic Audio` wording
- corrected the legacy redirect reference from `ohmicaudio.com` to
  `ohmicaudiolabs.com`
- removed the obvious `Labs` branding drift from the AI index top-level name
  and wiki metadata entry
- normalized the engineering image catalog project string to `Ohmic Audio`

## Artifact

- `B:\ohmic\repos\ohmic-audio-static-content\public\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\ai-index.json`
- `B:\ohmic\repos\ohmic-audio-static-content\public\assets\engineering-diagrams\image_catalog.json`
