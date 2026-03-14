# Ohmic Static Content

Dedicated static-content repo for the Ohmic platform.

This repo is the long-lived home for:

- generated static public pages
- static suite/landing content
- SEO-oriented content surfaces
- content-work and editorial staging inputs

It is not the home for:

- app runtime code
- backend services
- Android shell code
- device firmware

## Expected contents

- `public/`
- `site/`
- `content-work/`

## Relationship to `ohmic-audio-labs`

`ohmic-audio-labs` remains the app/runtime repo.
This repo owns the static content surface that used to live beside that runtime.

During transition, `ohmic-audio-labs` may retain a minimal `public/` payload for runtime branding assets and temporary link continuity.
