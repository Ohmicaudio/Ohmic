# Ohmic Audio Labs Public Deletion Reconciliation Packet

Date: 2026-03-15
Project: ohmic-audio-labs

## Purpose

Turn the existing `public/*` mass deletion wave into one deliberate prune packet
instead of leaving `594` tracked deletions competing with active product work.

## Reconciled Boundary

The app-side `public` tree is no longer the canonical static surface.

Canonical static ownership now lives in:

- `B:\ohmic\repos\ohmic-audio-static-content\public\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\favicon.svg`
- `B:\ohmic\repos\ohmic-audio-static-content\public\ohmic-logo.svg`
- `B:\ohmic\repos\ohmic-audio-static-content\public\robots.txt`
- `B:\ohmic\repos\ohmic-audio-static-content\public\llms.txt`
- `B:\ohmic\repos\ohmic-audio-static-content\public\ai-index.json`
- `B:\ohmic\repos\ohmic-audio-static-content\public\suite-index.json`
- `B:\ohmic\repos\ohmic-audio-static-content\public\apps\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\design-suite\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\measurement-suite\index.html`

The top-level static knowledge roots also exist in the static-content repo:

- `advanced-topics`
- `appendix`
- `apps`
- `competition`
- `design`
- `design-suite`
- `dsp`
- `electrical`
- `fundamentals`
- `installation`
- `measurement`
- `measurement-suite`
- `meta`
- `mobile-electronics`
- `reference`
- `subwoofer-enclosures`
- `tuning`

## App-Owned Keeper Check

One real keeper dependency surfaced during reconciliation:

- `scripts/generate-android-logo-assets.mjs` still expected
  `public/ohmic-logo.svg`

That dependency is app-owned, but it does not require the full app-side
`public/*` tree. The script can safely read the already-present app-local logo
source at:

- `android/app/src/main/assets/public/ohmic-logo.svg`

After that retarget, there are no remaining known runtime or build-critical
keepers inside `B:\ohmic\repos\ohmic-audio-labs\public`.

## Packet Decision

This grouped packet should be treated as:

- one deliberate prune of the tracked `public/*` tree in
  `ohmic-audio-labs`
- plus the minimal keeper retarget for Android logo generation

This makes the deletion wave explicit and removes it as ambient background
noise.

## Follow-On

The next safe packet after this prune is the docs truth sweep:

- `run-ohmic-audio-labs-docs-truth-sweep`

That follow-on should remove or reframe repo-local docs that still describe
`public/*` as an app-owned source root.
