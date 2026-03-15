Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Audio Labs Stabilization Wave

## Purpose

Define the next grouped software execution wave for `ohmic-audio-labs` based on
the current dirty-domain reality instead of relying on stale micro-slices.

## Current Reality

- branch: `measurement/local-input-normalization`
- ahead of origin: `47`
- the repo is still the main completion-risk center

Largest dirty top-level domains:

- `public` `594`
- `docs` `127`
- `products` `120`
- `services` `86`
- `components` `75`
- `archive` `43`
- `test` `42`
- `android` `22`

## Stabilization Rule

Treat this repo as two different things:

1. active software lanes that should keep moving
2. broad dirt domains that should be frozen, classified, or normalized before
   more casual edits

## Active Execution Lanes

### 1. AmpLab browser and shell regression wave

Primary surfaces:

- `components/Hardware/*`
- `components/Layout/*`
- `components/Landing/*`
- `test/components/*`
- `e2e/*`

Why now:

- recent Live Link, deck, browser-smoke, and naming work all landed here
- this is the warmest path and the easiest place to lose parity if it sits

Expected grouped outputs:

- browser-shell regression bundle
- deck-body readiness checks
- linked-device state parity hardening

### 2. Post-link live-path parity wave

Primary surfaces:

- shared discovery/link behavior
- shell/deck copy and state presentation
- browser vs phone live-path expectations
- live verification notes and smoke tasks

Why now:

- phone-assisted live validation narrowed the failure layer cleanly
- the next useful move is one grouped parity packet, not more ad hoc debugging

### 3. Backend chirp regression and bootstrap wave

Primary surfaces:

- `services/backend/tools/*`
- narrow backend analyzer entry points
- backend regression coverage and runtime notes

Why now:

- the chirp path is proven enough to preserve
- it should become durable before the context cools

### 4. OSM and design-sandbox regrouping wave

Primary surfaces:

- `products/*`
- supporting visualization/design-sandbox components

Why now:

- `products` is still one of the largest remaining dirty domains
- OSM moved recently, but the next grouped follow-on has not been redefined

## Freeze Or Classification Lanes

These should not absorb ambient edits until named by a specific task:

- `public/*`
- `docs/*`
- `archive/*`
- `android/*`

Why:

- they are too broad and too mixed to be safe background cleanup
- they need either classification, normalization, or explicit freeze rules

## Immediate Next Execution Blocks

1. `bundle-amplab-browser-shell-regression-wave`
2. `define-post-link-live-path-parity-wave`
3. `package-backend-chirp-regression-and-bootstrap-wave`
4. `classify-ohmic-audio-labs-nonproduct-dirty-domains`
5. `define-osm-and-design-sandbox-regrouping-wave`

## Boundary

This packet does not approve a broad sweep across the repo.

It defines which grouped software lanes should keep moving and which broad
domains should be treated as freeze/classification territory first.
