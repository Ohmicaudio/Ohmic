scope: system
status: working_plan
updated: 2026-03-15

# Ohmic Foreseeable Actionable Waves

## Purpose

Replace stale one-off queue assumptions with a current grouped view of what is
actually left across the active software repos.

## Current Reality

### Queue health

- active claims: `0`
- ready tasks before this planning pass: `2` real tasks
- ready tasks after this planning pass: `7` real tasks
- blocked tasks: `2` real tasks
- done tasks: `423`

The board was too thin.

This planning pass replenishes it with larger, truthful grouped blocks.

### Main software pressure

#### `B:\ohmic\repos\ohmic-audio-labs`

- branch: `measurement/local-input-normalization`
- ahead of origin: `47` commits
- still the center of gravity

Largest dirty top-level domains:

- `public` `594`
- `docs` `127`
- `products` `120`
- `services` `86`
- `components` `75`
- `archive` `43`
- `test` `42`
- `android` `22`

Interpretation:

- this is still the primary finish-risk repo
- product/runtime work is mixed with broad public/doc/archive churn
- grouped commit planning matters more here than any new micro-slice queue

#### `B:\ohmic\repos\ohmic-audio-static-content`

- branch: `main`
- ahead of origin: `8` commits
- dirty top-level domain: `public` `224`

Interpretation:

- static content is now one broad public-wave repo, not a few isolated files
- it still deserves bounded cleanup waves, but it should not silently absorb
  product priority

#### `B:\ohmic`

- branch: `main`
- ahead of origin: `276` commits
- queue docs have drifted away from current reality
- generated runtime files keep changing under normal claim/refresh activity

Interpretation:

- the umbrella repo is functioning, but it needs refreshed handoff truth and a
  stronger grouped board

## Priority Order

### 1. `ohmic-audio-labs` grouped stabilization waves

This remains the top software lane.

Current grouped wave candidates:

- AmpLab browser and shell regression hardening
- post-link live-path cleanup and parity verification
- OSM post-shell regrouping
- backend chirp regression and packaging
- dirty-domain boundary decisions for `public`, `docs`, and `archive`

### 2. static-content public trust wave

This is now a real secondary lane.

Current grouped wave candidates:

- remove remaining placeholder-style public copy leaks
- neutralize placeholder language in `public/ai-index.json`
- sweep footer/stat bookkeeping leaks
- decide whether the mass engineering-diagram modifications are generated churn,
  a batch asset wave, or both

### 3. umbrella planning and queue durability

This lane supports the first two.

Current grouped wave candidates:

- refresh priority and start-queue docs
- replenish the ready queue back above the floor with grouped tasks
- reconcile old ready-file deletions and runtime noise without scooping them
  blindly

## Recommended Next Grouped Tasks

### Top software lane

1. `group-next-ohmic-audio-labs-stabilization-wave`
2. `bundle-amplab-browser-shell-regression-wave`
3. `define-post-link-live-path-parity-wave`
4. `package-backend-chirp-regression-and-bootstrap-wave`

### Secondary static lane

5. `clean-ai-index-placeholder-descriptions`
6. `sweep-public-footer-placeholder-stat-copy`
7. `classify-static-engineering-diagram-dirty-wave`

## Planning Rule

Use grouped waves now unless a smaller slice is clearly safer.

The board has moved past the point where every remaining job should be a
single-file packet by default.
