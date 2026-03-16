# Ohmic Audio Labs First Local-Only Relocation Wave

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Execute the first bounded local-only relocation wave so obvious staging and
runtime clutter leaves `ohmic-audio-labs` without touching tracked source
truth.

## Local-Only Target Root

All moved material in this wave landed under:

- `B:\\ohmic-local\\working\\ohmic-audio-labs-retained\\2026-03-16-first-local-only-relocation-wave\\`

## Moved In This Wave

### Repo-Root Staging Material

Moved:

- `content-work/**`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

Why:

- untracked staging/import material
- not part of normal repo source layout

### Local Capture Evidence

Moved:

- `captures/**`

Why:

- local-only capture evidence
- worth retaining, but not as ambient repo clutter

### Selected Output Exhaust

Moved:

- `output/playwright/**`
- `output/android-measure-smoke/**`
- `output/pc2a-web.log`

Why:

- completed local verification output
- useful to retain briefly, but not in the repo root

## Explicitly Left In Place

Held in `output/`:

- `fold-base.apk`
- `last-pc2a-session.txt`
- `ohmic-ui-fold.xml`
- `pc2a-sync-state.json`

Held in repo root:

- `sigma-flow-xml-skill-v3/**`

Why held:

- still close enough to active phone/session or skill work that they should not
  be swept into the first relocation wave blindly

## Safety Check

After relocation:

- `content-work/**` is no longer present in repo status
- `captures/**` is no longer present in repo status
- selected output directories and `pc2a-web.log` are no longer present in repo
  status
- no tracked source files were moved

## Result

The repo lost the loudest local-only staging clutter while leaving active or
potentially reusable session artifacts untouched for later review.
