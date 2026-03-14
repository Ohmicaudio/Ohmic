# Ohmic Static Content Import Surface

Date: 2026-03-13
Source repo: `/mnt/a/ohmic-audio-labs`
Target repo: `Ohmicaudio/ohmic-audio-static-content`
Status: clean-import definition

## Purpose

Define the dedicated repo surface for static site content that should no longer live as a co-equal workload inside `ohmic-audio-labs`.

## Include

- `public/`
- `site/`
- `content-work/`

These three surfaces capture:

- generated public HTML payloads
- suite/SEO page source material
- editorial/content workflow inputs and QA notes

## Transitional note

The app/runtime repo may temporarily keep a minimal `public/` subset for branding assets and link continuity.
That does not change the long-term intent: static content should be owned here.

## Exclude

Do not pull in app/runtime code, backend services, mobile shell code, firmware, or archive dumps.

## Recommendation

Use this repo as the static-content source of truth.
Keep `ohmic-audio-labs` focused on runtime code, contracts, backend, and active product docs.
