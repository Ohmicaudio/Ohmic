Status: decision_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic OSM Tailwind Config Ownership Decision

## Decision

Do not give OSM its own Tailwind config by default.

The better fix is to stop the OSM app from inheriting the monorepo-root
Tailwind/PostCSS path unless OSM intentionally adopts Tailwind later.

## Why

Current read of `products/ohmic-osm/apps/osm-web`:

- no local `tailwind.config.*`
- no local `postcss.config.*`
- no `@tailwind` directives in `src/styles/app.css`
- no meaningful Tailwind utility-class usage in the OSM app path
- styling currently comes from local plain CSS

At the same time, the monorepo root does have:

- `tailwind.config.js`
- `postcss.config.js`

And that root Tailwind config only targets the root app paths, not OSM.

So the warning is best explained as accidental inherited Tailwind/PostCSS
processing, not as missing OSM Tailwind ownership.

## Recommended Fix Path

Use one bounded config slice later to make OSM opt out cleanly.

Preferred options:

1. add an OSM-local PostCSS config that excludes Tailwind
2. otherwise fence Vite/PostCSS resolution so `apps/osm-web` does not consume
   the root Tailwind config

## Not Recommended

- adding a new OSM Tailwind config just to silence a warning
- treating OSM like a Tailwind app when it currently is not one
- reopening the verified editor-shell slice for this warning alone

## Best Next Step

Implement one small OSM config fence so:

- the warning disappears
- OSM build ownership is clearer
- no unnecessary Tailwind surface is introduced
