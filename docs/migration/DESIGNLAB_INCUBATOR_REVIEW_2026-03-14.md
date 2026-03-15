# Designlab Incubator Review

Status: active review
Date: 2026-03-14

## Purpose

Capture the current assessment of `A:\designlab` so useful work is not lost and the `B:\ohmic` system has an explicit salvage path.

## Workspace Truth

`A:\designlab` is a loose workspace, not a governed repo surface.

Observed top-level projects:

- `A:\designlab\ohmic-osm`
- `A:\designlab\apps\ohmic-toolbox`
- `A:\designlab\ohmic-speaker-db`

No `.git` roots were found under `A:\designlab` during the review pass.

## Findings

### 1. `ohmic-osm`

This is real implementation work, not just a concept shell.

What exists:

- monorepo structure with packages, app, and worker
- `apps/osm-web`
- `packages/schema`
- `packages/graph-engine`
- `packages/storage`
- `packages/integrations`
- `workers/osm-api`

Current conclusion:

- `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm` is already the more advanced canonical copy
- the `A:` copy is useful as historical incubation context, not as the migration target

Why:

- `B:` contains integration additions not present in `A:`
- `B:` contains test and adapter surfaces not present in `A:`
- `A:` does not currently complete a clean build

Operational rule:

- do not migrate `A:\designlab\ohmic-osm` wholesale
- harvest only narrowly if a specific interaction or component is missing from `B:`

### 2. `apps/ohmic-toolbox`

This is the cleanest salvage candidate in `A:\designlab`.

What exists:

- a buildable Vite React app
- a compact multi-calculator workbench
- calculators that can act as:
  - placeholders
  - lead-gen utilities
  - future in-product utility panels

Why it matters:

- it is immediately reusable
- it is low complexity compared with the planner or hardware lanes
- it can seed multiple future app surfaces without requiring a large new architecture effort

Current conclusion:

- `ohmic-toolbox` should be salvaged into `B:\ohmic`
- it should be treated as an incubator app or module source, not left in `A:`

### 3. `ohmic-speaker-db`

This is not just a static database drop.

What exists:

- crawler and scrape-debug scripts
- normalization pipeline
- export pipeline
- confidence-scoring logic

Why it matters:

- a vehicle speaker/fitment dataset could become a strong ecosystem asset
- it could support:
  - BassBuilder
  - OSM
  - install planning
  - SEO and content tooling

Current conclusion:

- preserve it
- do not productize it yet
- redesign it later as a real data-pipeline repo or module with source adapters, schema, confidence rules, and reproducible exports

## Priority Call

Priority order for `designlab` salvage:

1. salvage `ohmic-toolbox`
2. preserve and plan `ohmic-speaker-db`
3. treat `ohmic-osm` in `A:` as archive/incubation context only

## Rules Going Forward

- `A:\designlab` is not an active long-term work root
- useful material found there must be:
  - documented
  - assigned a destination in `B:\ohmic`
  - queued explicitly
- no large blind copy from `A:` to `B:`

## Immediate Next Actions

- create a calculator inventory and target-home map for `ohmic-toolbox`
- define the intended import surface for `ohmic-toolbox` inside `B:\ohmic`
- preserve `ohmic-speaker-db` as a planned data-pipeline lane instead of leaving it as an orphan crawler workspace
