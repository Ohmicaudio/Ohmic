Status: verification_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic OSM PostCSS Tailwind Fence

## What Changed

OSM now owns a local PostCSS fence at:

- `products/ohmic-osm/apps/osm-web/postcss.config.cjs`

The file declares an empty plugin set so `apps/osm-web` stops inheriting the
monorepo-root PostCSS/Tailwind config by accident.

## Why This Was The Right Fix

- OSM is currently a plain-CSS app
- OSM does not use local `@tailwind` directives
- OSM did not need a Tailwind config of its own
- the warning was caused by config inheritance, not by missing OSM Tailwind
  adoption

## Verification

Ran from `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm`:

- `pnpm build`
- `pnpm test`

Result:

- the prior Tailwind `content` warning no longer appeared during `apps/osm-web`
  build
- OSM still built successfully
- test workspace still passed

## Remaining Noise

- Vite still prints the existing CJS Node API deprecation warning

That warning is separate from Tailwind/PostCSS ownership and was not widened
into this packet.
