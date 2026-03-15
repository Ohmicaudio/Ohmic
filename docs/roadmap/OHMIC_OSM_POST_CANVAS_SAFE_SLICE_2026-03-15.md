Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic OSM Post-Canvas Safe Slice

## Purpose

Define the next bounded OSM slice after the one-file `CanvasView.tsx`
theme-token pass.

## Recommended Next Slice

Take the `TopBar.tsx` editor-shell chrome slice next.

This is the strongest truthful follow-on slice because:

- the canvas token pass is now closed, so the next visible shell inconsistency
  is in the top bar chrome
- `TopBar.tsx` still carries hard-coded button colors and mojibake icon labels
- it is a single-component packet that can be verified without reopening the
  wider OSM workspace

## Exact Candidate Files

### Primary source files

- `products/ohmic-osm/apps/osm-web/src/components/TopBar.tsx`

## Why This Slice Next

- it preserves the one-file OSM packet rhythm that worked for `CanvasView.tsx`
- it improves the editor-shell chrome where users actually click first
- it can normalize both theme-token drift and visible text/icon corruption in
  one bounded surface
- it avoids widening into the already-broader inspector, equipment, or build
  checklist families

## Explicitly Out Of Scope

- `products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/InspectorPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/EquipmentManager.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/BuildChecklist.tsx`
- `products/ohmic-osm/**/dist/`
- `products/ohmic-osm/**/node_modules/`

## Verification

For the eventual implementation slice, use:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs/products/ohmic-osm
pnpm build
pnpm test
```

## Finish Condition

- the next OSM pickup starts from one named TopBar packet
- the slice remains one-file and editor-shell bounded
- generated/install noise stays fenced out
