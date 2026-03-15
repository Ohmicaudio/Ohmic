Status: followup_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic OSM Tailwind Content Warning Followup

## What Happened

During the verified OSM build, Vite completed successfully but Tailwind emitted:

- warning that the `content` option is missing or empty

This did not fail the build.

## Current Ownership Read

The OSM workspace currently does not expose a local Tailwind config in:

- `products/ohmic-osm/`
- `products/ohmic-osm/apps/osm-web/`

No `tailwind.config.*` or `postcss.config.*` file surfaced in the OSM package
tree during this pass.

That means the warning is best treated as a configuration-ownership gap, not as
evidence that the newly verified editor-shell slice is broken.

## Why It Matters

- the build passes today
- but a missing `content` config can silently drop generated utility styles
- because the warning is non-blocking, it is easy to forget unless it is
  recorded explicitly

## Current Recommendation

Do not reopen the verified OSM shell slice just for this warning.

Instead:

1. identify where Tailwind is actually being pulled into the OSM app path
2. decide whether OSM should own a local Tailwind config or remove the unused
   Tailwind path
3. fix it in one bounded config slice later

## Best Next Step

Create one narrow OSM config task that decides:

- local Tailwind config for `apps/osm-web`, or
- removal/avoidance of the unused Tailwind path if it is accidental
