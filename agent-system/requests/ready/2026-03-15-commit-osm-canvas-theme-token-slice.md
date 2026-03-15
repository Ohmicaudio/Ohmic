Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Commit OSM Canvas Theme Token Slice

## Goal

Commit the real `CanvasView.tsx` UI polish slice while explicitly excluding the
generated OSM workspace noise.

## Scope

- `products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`

## Out Of Scope

- `products/ohmic-osm/**/dist/`
- `products/ohmic-osm/**/node_modules/`
- any other OSM component or package file

## Verification

- `pnpm build`
- `pnpm test`
- run from `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm`

## Acceptance

- `CanvasView.tsx` lands as a one-file OSM product slice
- generated/install noise is kept out of the commit
- verification is recorded from the correct Windows shell
