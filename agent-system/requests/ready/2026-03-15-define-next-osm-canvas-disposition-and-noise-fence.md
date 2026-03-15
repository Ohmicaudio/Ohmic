Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

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
