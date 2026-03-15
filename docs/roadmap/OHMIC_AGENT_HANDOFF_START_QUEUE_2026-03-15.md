scope: system
status: active_handoff_board
updated: 2026-03-15

# Ohmic Agent Handoff Start Queue

## Purpose

Provide the first pickup order for agents starting the next completion wave.

## First Pickup Order

The old pickup order is stale.

Use this order now.

### 1. Group next `ohmic-audio-labs` stabilization wave

Task:

- completed; use the derived grouped waves below

Why first:

- the grouped stabilization packet now exists
- pickup should move directly into the derived grouped software waves

### 2. Bundle AmpLab browser and shell regression wave

Task:

- `bundle-amplab-browser-shell-regression-wave`

Why second:

- the live-link and browser path just moved substantially
- the next risk is regression drift, not missing tiny copy tweaks

### 3. Define post-link live-path parity wave

Task:

- `define-post-link-live-path-parity-wave`

Why third:

- browser, phone, deck, and linked-device behavior now need one honest parity
  packet instead of rediscovering edge cases piecemeal

### 4. Package backend chirp regression and bootstrap wave

Task:

- `package-backend-chirp-regression-and-bootstrap-wave`

Why fourth:

- the chirp lane is proven, but it should be turned into a durable grouped
  follow-on before the context goes cold

### 5. Classify `ohmic-audio-labs` nonproduct dirty domains

Task:

- `classify-ohmic-audio-labs-nonproduct-dirty-domains`

Why fifth:

- broad `public`, `docs`, `archive`, and `android` dirt should stop competing
  with active software work
- those domains need an explicit freeze/classification pass instead of ambient
  edits

### 6. Define OSM and design-sandbox regrouping wave

Task:

- `define-osm-and-design-sandbox-regrouping-wave`

Why sixth:

- the dirty `products` lane needs a fresh grouped packet before execution can
  restart there cleanly

### 7. Static public trust wave

Tasks:

- `clean-ai-index-placeholder-descriptions`
- `sweep-public-footer-placeholder-stat-copy`
- `classify-static-engineering-diagram-dirty-wave`

Why fifth:

- static-content is still a large public-facing dirt wave
- it is valid parallel work, but it should not outrank the grouped software
  lane while that lane is open

## Avoidance Rule

If an agent keeps selecting low-risk side work while the strongest current
lanes are open, that is not neutral prioritization. Treat it as avoidance and
redirect back to items 1-4.

## Coordination Rules

- claim before editing
- if a task is moved to `done`, immediately stage the matching queue move
- if another agent completes a lane underfoot, do not re-open it casually
- if a subsystem inventory reveals a safer narrower slice, create a new ready
  task instead of improvising it in chat
- assume grouped wave-definition tasks may finish in one focused session and
  size them accordingly
- keep at least `4` executable ready tasks visible; if the board is thinning,
  replenish it before leaving the lane
- app-side `public/` and archive surfaces are frozen by default; only touch
  them when a specific ready task names that lane explicitly

## Immediate Follow-On

After items 1-4 are either claimed or done, keep the queue above the floor by
promoting the next verified slice from the same subsystem instead of freelancing.
