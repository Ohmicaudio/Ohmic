Status: live coordination board
Date: 2026-03-14
Scope: cross-repo execution

# Ohmic Coordinated Execution Board

## Purpose

This board exists to stop the queue from reading like a flat pile of filenames.

Use it to answer:

- what is active now
- what should be picked next
- what is lower-priority but still worth staging
- what should stay parked

## Current State

Completed in the current wave:

- first-wave `ohmic-toolbox` import
- shared toolbox math core extraction
- canonical fixtures and cross-surface tests
- `Ohm's Law` extraction into the shared math core
- `Cone Area` extraction into the shared math core
- second-wave public mini-tool recommendation
- speaker-db inventory/correlation groundwork

No active claims are open right now.

## Pickup Order

### Now

1. [extract-acoustic-gain-into-shared-toolbox-math.md](/mnt/b/ohmic/agent-system/requests/ready/2026-03-14-extract-acoustic-gain-into-shared-toolbox-math.md)
2. [define-smart-wiring-lab-speaker-match-lane.md](/mnt/b/ohmic/agent-system/requests/ready/2026-03-14-define-smart-wiring-lab-speaker-match-lane.md)

Why:

- these keep software/product logic ahead of planning-heavy data work
- they stay in the same toolbox lane
- they directly reduce ambiguity about future calculator direction

### Next

3. [define-time-alignment-as-pro-helper-lane.md](/mnt/b/ohmic/agent-system/requests/ready/2026-03-14-define-time-alignment-as-pro-helper-lane.md)

Why:

- useful product-boundary clarification
- not as urgent as the current public-tool and smart-wiring decisions

### After Software Lane

4. [plan-loudspeaker-database-extraction-and-static-page-lane.md](/mnt/b/ohmic/agent-system/requests/ready/2026-03-14-plan-loudspeaker-database-extraction-and-static-page-lane.md)
5. [define-loudspeaker-static-page-template-and-seo-fields.md](/mnt/b/ohmic/agent-system/requests/ready/2026-03-14-define-loudspeaker-static-page-template-and-seo-fields.md)
6. [plan-loudspeaker-image-acquisition-and-attribution.md](/mnt/b/ohmic/agent-system/requests/ready/2026-03-14-plan-loudspeaker-image-acquisition-and-attribution.md)
7. [define-speaker-data-vs-content-boundary.md](/mnt/b/ohmic/agent-system/requests/ready/2026-03-14-define-speaker-data-vs-content-boundary.md)

Why:

- these are useful
- they are not current software completion blockers
- they should stay behind the toolbox/product lane unless software pauses

## Lanes

### Lane A: Toolbox Product Logic

Includes:

- `extract-acoustic-gain-into-shared-toolbox-math`
- `define-smart-wiring-lab-speaker-match-lane`
- `define-time-alignment-as-pro-helper-lane`

Rule:

- finish these before widening into more speaker-data planning

### Lane B: Loudspeaker Data And Static Pages

Includes:

- `plan-loudspeaker-database-extraction-and-static-page-lane`
- `define-loudspeaker-static-page-template-and-seo-fields`
- `plan-loudspeaker-image-acquisition-and-attribution`
- `define-speaker-data-vs-content-boundary`

Rule:

- treat these as structured planning, not production ingestion yet

## Parked

Do not pick these up during this wave unless they directly unblock a chosen task:

- OSM UI expansion
- hero page/public homepage work
- hardware planning expansion
- crawler redesign
- schema repo extraction
- broad business-ops follow-ons

## Operator Rule

When choosing the next task:

1. pick from `Now` first
2. if `Now` is empty, pick from `Next`
3. only then move into `After Software Lane`

Do not skip straight into the loudspeaker-page planning lane just because it looks interesting.
