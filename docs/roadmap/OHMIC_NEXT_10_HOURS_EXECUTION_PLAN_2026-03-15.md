Status: working plan
Date: 2026-03-15
Scope: cross-repo execution
Priority rule: current software completion outranks planning, hardware, and exploratory data work

# Ohmic Next 10 Hours Execution Plan

## Current Truth

The prior 10-hour plan has effectively been completed.

Completed in the last wave:

- first-wave `ohmic-toolbox` app import
- toolbox app surface wiring and clean app-local run/build path
- shared toolbox math core extraction
- canonical fixtures and cross-surface tests
- shared math consumer contract
- `Ohm's Law` extraction into the shared math core
- `Cone Area` extraction into the shared math core
- loudspeaker database preservation into `B:\junk`
- loudspeaker data lane staged as later structured work instead of vague chat memory

## Main Goal

Use the next 10 hours to:

1. finish the strongest remaining toolbox logic work
2. clarify the next important product-boundary decisions
3. advance loudspeaker/static-page planning only after the software lane is shaped

## Pickup Order

### 1. Now

- `extract-acoustic-gain-into-shared-toolbox-math`
- `define-smart-wiring-lab-speaker-match-lane`

Why:

- both directly improve the calculator/tool lane
- both stay close to current code and current product meaning
- neither depends on broad new architecture work

### 2. Next

- `define-time-alignment-as-pro-helper-lane`

Why:

- this is a product-boundary clarification that reduces future drift
- useful, but behind the stronger current-tool lane

### 3. After Software Lane

- `plan-loudspeaker-database-extraction-and-static-page-lane`
- `define-loudspeaker-static-page-template-and-seo-fields`
- `plan-loudspeaker-image-acquisition-and-attribution`
- `define-speaker-data-vs-content-boundary`

Why:

- these are valuable, but they are planning and shaping work
- none of them should outrank current software/tool completion

## Lane Breakdown

### Lane A: Toolbox And Calculator Logic

Focus:

- shared math expansion where it is compact and reusable
- better distinction between generic electrical tools and speaker-specific tools
- stronger public-tool sequencing

Current tasks:

- `extract-acoustic-gain-into-shared-toolbox-math`
- `define-smart-wiring-lab-speaker-match-lane`
- `define-time-alignment-as-pro-helper-lane`

### Lane B: Loudspeaker Data And Static Pages

Focus:

- turn preserved loudspeaker data into a scoped future lane
- define what data, images, and static pages would require before generation starts

Current tasks:

- `plan-loudspeaker-database-extraction-and-static-page-lane`
- `define-loudspeaker-static-page-template-and-seo-fields`
- `plan-loudspeaker-image-acquisition-and-attribution`
- `define-speaker-data-vs-content-boundary`

## Explicit Not-To-Do List

Do not let this window drift into:

- OSM UI expansion
- homepage/hero rewrite
- hardware planning expansion
- crawler redesign
- new schema repo extraction
- broad business-ops work
- large static-content polish unrelated to calculator or loudspeaker lanes

## Definition Of Success

At the end of this window, we should be able to say:

- the next public mini-tool wave is technically stronger
- `Wiring Lab` has a clearer future as a smarter speaker-match tool
- `Time Alignment` is placed correctly instead of floating between lanes
- loudspeaker static-page work is shaped enough to use later without re-deriving the same thinking
