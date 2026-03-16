Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Generated And Dependency Dirt Fence

## Purpose

Fence the generated, dependency, cache, log, and local staging dirt in
`ohmic-audio-labs` so the active source tree becomes more readable and safer to
classify.

## Scope

This fence is for disposable or regenerable dirt.

It is not approval to delete broad tracked source, docs, archive, or platform
work.

## Current Junk Classes

The current dirty tree contains a large untracked exhaust layer that should be
treated separately from real source changes.

### Dependency And Build Output

Examples:

- `node_modules/*`
- `products/ohmic-osm/**/node_modules/*`
- `services/backend/node_modules/*`
- `dist/*`
- `products/ohmic-osm/apps/osm-web/dist/*`
- `services/backend/dist/*`
- `esp32round128/.pio/*`

### Runtime Storage And Temporary Backend State

Examples:

- `services/backend/storage/auth-control-plane.v1.sqlite`
- `services/backend/storage/auth-control-plane.v1.sqlite-shm`
- `services/backend/storage/auth-control-plane.v1.sqlite-wal`
- `services/backend/storage/measurement-captures/*`
- `services/backend/tools/__pycache__/*`

### Local Logs, Captures, And Staging Exhaust

Examples:

- `backend_log.txt`
- `backend_new_log.txt`
- `backend_final_log.txt`
- `backend_err.txt`
- `dev.log`
- `dev-mobile.log`
- `captures/*`
- `output/*`
- `tmp/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

## Boundary Rule

Treat these classes as:

- local exhaust
- generated artifacts
- dependency/install output
- temporary runtime state

Do not mix them with active product classification.

## Important Exclusions

Do not automatically sweep these just because they look adjacent to runtime or
generated work:

- tracked source files under `products/*`, `services/*`, `components/*`,
  `schemas/*`, `utils/*`, `scripts/*`
- tracked support artifacts like
  `services/backend/storage/device-registry.test.json`
- tracked source changes that happen to reference logging or storage

Those belong to product-surface classification, not junk cleanup.

## Current Decision

Freeze this junk class as a separate cleanup lane.

That means:

- do not treat it as feature work
- do not let it dominate `git status` interpretation
- classify or ignore it before broader source cleanup

## Safe Next Order

1. classify local output and log exhaust
2. define the repo ignore and cleanup boundary
3. split generated/runtime artifacts from true source artifacts

## Outcome Standard

If this fence is working, then:

- generated and dependency dirt stops masquerading as product work
- tracked source changes are easier to reason about
- later cleanup waves can work on source truth without dragging logs and
  installs along
