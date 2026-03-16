# Ohmic Audio Labs First Safe Cleanup Execution Wave

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Define the first concrete cleanup wave that can safely reduce
`ohmic-audio-labs` dirt without deleting tracked source truth or stepping on
active implementation lanes.

## Core Rule

Wave 1 must only touch paths whose class is already known and whose removal or
relocation does not change product source truth.

If a path is tracked source, mixed, or still under active implementation, it
does not belong in Wave 1.

## Why A Narrow First Wave

Current repo status mixes all of the following:

- tracked source modifications across active product surfaces
- tracked root-level deletions that could be intentional or risky
- untracked local staging bundles
- rebuildable install and build exhaust
- short-lived logs and report output

That means the first safe wave should be small, explicit, and reversible.

## Wave 1 Target Classes

### 1. Purge Now

These are disposable local exhaust and can be removed first:

- `backend_err.txt`
- `backend_log.txt`
- `backend_new_log.txt`
- `backend_final_log.txt`
- `dev.log`
- `dev-mobile.log`
- `playwright-report/**`
- `test-results/**`
- `tmp/**`

Why safe:

- untracked local run residue
- no known source-truth role
- no dependency on product code review

### 2. Relocate Next In The Same Wave

These should leave the repo root, but should be retained locally instead of
deleted:

- `content-work/**`
- `content-work.zip`
- `sigma-flow-xml-skill-v3/**`
- `sigma-flow-xml-skill-v3.zip`

Recommended local-only holding root:

- `B:\\ohmic-local\\working\\ohmic-audio-labs-retained\\2026-03-16-first-safe-cleanup\\`

Why safe:

- untracked staging or import material
- clearly not normal product source layout
- likely still useful enough to retain outside the repo

### 3. Hold For Later Waves

Do not touch these in Wave 1:

- tracked root deletions such as `.gitignore`, `.env.example`, workflow files,
  and root config files
- tracked source modifications under `components/**`, `services/**`,
  `products/**`, `apps/**`, `schemas/**`, `test/**`, `scripts/**`, and active
  docs truth
- `captures/**`
- `output/**`
- `services/backend/storage/measurement-captures/**`
- `node_modules/**`
- `dist/**`
- `products/ohmic-osm/**/node_modules/**`
- `products/ohmic-osm/**/dist/**`
- `services/backend/dist/**`
- `index/**`
- `services/ui-runtime/generated/**`

Why hold:

- active source truth or tracked ambiguity
- runtime evidence needing retention policy
- rebuildable junk that is large but not necessary for the first smallest safe
  wave
- mixed zones that still need dedicated cleanup rules

## Exact Wave 1 Sequence

1. Capture a pre-clean snapshot with:
   - `git status --short --ignored`
2. Confirm every purge target is untracked local exhaust.
3. Move the relocation set into the local-only holding root.
4. Purge the disposable log and report set.
5. Capture a post-clean snapshot with:
   - `git status --short --ignored`
6. Verify the only status change is the absence of the targeted purge and
   relocation paths.

## Verification Checks

Before cleanup:

- purge targets are untracked
- relocation targets are untracked
- no active claim overlaps the relocation root or retained bundle paths

After cleanup:

- no new tracked deletions appear
- active product source modifications remain visible
- targeted logs, report folders, and temp folders are gone
- staging bundles are no longer present in repo status

## Explicit Non-Goals For Wave 1

Wave 1 does not:

- normalize tracked root deletions
- delete `node_modules` or `dist` trees
- purge captures or backend measurement evidence
- classify `services/ui-runtime/generated/**`
- rewrite ignore rules

Those belong to separate follow-on packets.

## Follow-On Packets After Wave 1

1. local-only relocation plan for retained evidence
2. ignore and cleanup boundary execution
3. first tracked-source cleanup packet
4. index and generated-adjacent reclassification

## Outcome Standard

If Wave 1 is executed correctly:

- the repo loses obvious disposable clutter
- useful staging bundles survive outside the repo
- tracked source truth remains untouched
- later cleanup waves start from a less chaotic baseline
