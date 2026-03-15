Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T125654Z-a5f4c87e

# Define Next OSM Canvas Disposition And Noise Fence

## Goal

Tighten the next OSM boundary by deciding what to do with `CanvasView.tsx` and
the remaining nested workspace noise.

## Focus

- determine whether `CanvasView.tsx` is real product change or formatting churn
- explicitly fence nested `dist/` and `node_modules/` from future OSM commits

## Required Output

- one clear disposition for `CanvasView.tsx`
- one clear note on generated/install noise to exclude from the next OSM slice
- if a next real OSM slice is visible, queue it

## Acceptance

- the next OSM pickup has less ambiguity
- no one has to guess whether `CanvasView.tsx` belongs in a real product commit

## Outcome

Completed on 2026-03-15.

Result:

- `CanvasView.tsx` is a real product change, not formatting churn
- the diff is a bounded theme-token alignment pass inside the live OSM canvas:
  it replaces several hard-coded shell colors with `--ohm-*` tokens and keeps
  the component behavior intact
- the generated/install noise fence is now explicit: exclude
  `products/ohmic-osm/**/dist/` and all nested `node_modules/` from future OSM
  commit slices
- queued the next real OSM slice as a focused CanvasView theme-token cleanup
  task instead of leaving the file in "maybe churn" limbo

## Verification

- inspected the exact diff with:
  `git diff -- products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`
- verified current OSM workspace noise with:
  `git status --short -- products/ohmic-osm`
- checked file history with:
  `git log --oneline -- products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`
  - result: the file itself traces back to the initial OSM onboarding/build-gate
    commits, and the current working diff is a small live UI adjustment rather
    than mass line-ending churn

## Follow-Up

- `2026-03-15-commit-osm-canvas-theme-token-slice.md`
