Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Nonproduct Dirty Domain Classification

## Purpose

Refresh the nonproduct dirty-domain classification for `ohmic-audio-labs`
against the current repo reality so cleanup can proceed in bounded waves
instead of treating the whole worktree as one giant blur.

## Current Reality

- repo: `B:\ohmic\repos\ohmic-audio-labs`
- branch: `measurement/local-input-normalization`
- ahead of origin: `55`
- main completion risk is still mixed dirt, not missing ideas

Current top-level dirty counts from `git status --short`:

- `docs/*` `127`
- `products/*` `116`
- `services/*` `85`
- `components/*` `74`
- `archive/*` `43`
- `test/*` `42`
- `android/*` `22`
- `schemas/*` `22`
- `utils/*` `22`
- `scripts/*` `21`

Current untracked churn is concentrated in:

- generated/runtime output under `services/*`, `components/*`, and `products/*`
- dependency/install dirt like `node_modules/*`, `dist/*`, `.pio/*`
- local logs and capture artifacts like `backend_*.txt`, `dev*.log`, `captures/*`

Important shift since the earlier classification:

- `public/*` is no longer the leading nonproduct dirt source in the live tree
- today the heaviest nonproduct pressure is `docs/*`, plus frozen `archive/*`
  and `android/*`, with generated/dependency junk amplifying the confusion

## Classification Rule

Treat the current dirty tree as four different classes:

1. active product surfaces
2. nonproduct documentation and archive surfaces
3. frozen platform or legacy surfaces
4. generated, dependency, and local exhaust

## Active Product Surfaces

These remain legitimate execution territory, but should still be packeted:

- `products/*`
- `services/*`
- `components/*`
- `test/*`
- supporting code under `schemas/*`, `utils/*`, `scripts/*`

Why:

- these domains contain real current product work
- they are dirty, but not automatically junk
- they should be isolated from nonproduct and generated churn, not frozen

## Normalize-First Nonproduct Surfaces

These should not absorb ambient edits and should be handled in explicit cleanup
waves:

- `docs/*`

Why:

- this is now the loudest nonproduct modified domain
- it mixes real specs, old plans, archive remnants, and generated editorial
  drift
- it needs classification and truth-sweep behavior, not casual edits

## Frozen Until Explicit Reopen

These should remain frozen by default:

- `archive/*`
- `android/*`

Why:

- both domains are broad, mixed, and easy to churn accidentally
- neither should compete with current product completion unless a specific ready
  task reopens them

## Generated And Dependency Dirt

These should be treated as exhaust, not active feature work:

- `node_modules/*`
- `dist/*`
- `.pio/*`
- backend sqlite artifacts
- backend and mobile logs
- local captures and output bundles
- temporary zip or staging folders

Why:

- this category hides actual product deltas
- it teaches bad commit habits if left mixed into normal status reads
- it should be fenced, ignored, or cleaned before broader feature slicing

## Safe Next Cleanup Order

1. freeze and fence generated/dependency/local exhaust
2. classify `docs/*`, `archive/*`, and `android/*` into keep/freeze/reopen
   buckets
3. isolate active product surfaces so current implementation work can be read
   and committed without swimming through junk

## Boundary

This packet does not approve a broad repo sweep.

It defines the next truthful cleanup order so product work and cleanup work stop
poisoning each other.
