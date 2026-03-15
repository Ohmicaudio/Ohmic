# Ohmic Toolbox Import Surface Decision

Status: decided
Date: 2026-03-14

## Decision

The salvage destination for `A:\designlab\apps\ohmic-toolbox` should be:

- primary home: `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`

## Why This Home

### 1. It matches the current repo structure

`ohmic-audio-labs` already has an `apps/` home for user-facing applications.

### 2. Toolbox is app-adjacent, not hardware-core

The calculator set is:

- user-facing
- education-adjacent
- lead-gen capable
- useful as placeholder utility surfaces

That fits the app runtime repo better than:

- `hardware-specs`
- `amplab-firmware`
- `ohmic-audio-static-content`

### 3. It keeps the center of gravity in software

Current priority is software completion and software-led value creation.

Putting toolbox under `ohmic-audio-labs` keeps it near:

- shared UI patterns
- future auth / gating
- SEO / funnel integration
- future product shell integration

### 4. It avoids premature repo sprawl

`ohmic-toolbox` is not large enough yet to justify a dedicated repo.

Start inside `ohmic-audio-labs`.

Split later only if one of these becomes true:

- the toolbox develops its own release cadence
- the toolbox becomes materially separate from the main product shell
- build/runtime coupling starts to slow the main repo

## Recommended Structure

Initial import shape:

```text
ohmic-audio-labs/
  apps/
    ohmic-toolbox/
      README.md
      package.json
      src/
```

Optional later extraction path:

- shared calculator logic -> common utility or package layer
- UI shell stays in `apps/ohmic-toolbox`

## First-Wave Scope

Bring over only:

- Wiring Lab
- Box Volume
- Wire Gauge

These are the best combination of:

- utility
- broad appeal
- placeholder value
- low integration risk

## What Not To Import First

Do not start with:

- all ten calculators at once
- heavy visual redesign
- broad state/store rewrite
- deep coupling to `OSM`

## Operational Rule

Treat the original `A:` toolbox as source material only.

Do not copy it blindly.

Use staged salvage:

1. establish app home in `B:`
2. carry first-wave calculator logic
3. verify behavior
4. expand only after the first slice is stable
