# Ohmic Audio Labs Source-Visible Cleanup Promotion

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Promote the next cleanup wave that touches only source-visible tracked surfaces
now that the loudest local-only clutter has been reduced.

## Promotion Basis

Local-only cleanup work is now explicit and moving:

- first safe cleanup wave is defined
- first local-only relocation wave is complete
- disposable log/report purge is complete
- repo `output/` clutter is fully relocated out of the repo
- backend measurement capture retention is separated into its own execution
  slice
- rebuildable dependency junk has its own future purge wave

That means source-visible cleanup no longer has to compete with obvious local
junk for attention.

## What Is Now Eligible

### Root Tracked Deletion Review

- `.gitignore`
- `.env.example`
- `.github/workflows/*`
- `.prettier*`
- `.claude/*`
- `.vscode/extensions.json`
- `AGENT_MEMORY/*`

### Source-Visible Docs Cleanup

- live root docs truth
- tracked docs deletions
- tracked `docs/specs/**` and `docs/specs/adr/**` modifications

### Source-Visible Product Cleanup

- tracked modifications/deletions under active product surfaces
- source-visible untracked additions under active product/service/support lanes

## Promotion Rule

The next cleanup wave should touch only tracked source-visible truth plus any
supporting untracked source additions that clearly belong to active product
surfaces.

Do not reintroduce:

- runtime storage evidence
- retained local-only artifacts
- rebuildable install/build output
- exploratory docs imports

## Recommended Order

1. root config deletion review wave
2. source-visible docs cleanup wave
3. source-visible product-surface cleanup wave

## Outcome

Source-visible cleanup is now officially promotable. The remaining blocker is
review bandwidth, not local-only repo clutter.
