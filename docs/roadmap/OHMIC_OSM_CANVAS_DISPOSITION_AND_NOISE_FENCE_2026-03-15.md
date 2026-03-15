Status: decision_note
Date: 2026-03-15
Project: ohmic-audio-labs

# OSM Canvas Disposition And Noise Fence

## Decision

`products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx` is a real
product diff, not formatting churn.

## Why

The current worktree diff is a compact visual-alignment change:

- replaces several hard-coded shell colors with `--ohm-surface`,
  `--ohm-surface-raised`, `--ohm-border`, and `--ohm-border-strong`
- preserves the component structure and interaction model
- does not read like a line-ending-only or whitespace-only rewrite

So `CanvasView.tsx` belongs in a future OSM product slice if committed by
itself or alongside similarly bounded canvas-only polish.

## Noise Fence

Exclude these paths from future OSM commit slices unless a task explicitly
targets generated/install state:

- `products/ohmic-osm/**/dist/`
- `products/ohmic-osm/**/node_modules/`

Those paths were refreshed during truthful OSM verification and are build/install
artifacts, not product changes.

## Next Slice

The next visible OSM product slice is:

- `products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`

Tasked separately as:

- `2026-03-15-commit-osm-canvas-theme-token-slice.md`
