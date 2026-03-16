# Ohmic Audio Labs Active Product Surface Isolation

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Identify the current active product surfaces in `ohmic-audio-labs` and
separate them from nonproduct and generated churn so real implementation lanes
can continue cleanly.

## Core Rule

Active product surfaces are the code and tests that directly shape shipped
behavior.

Everything else should be treated as one of:

- supporting source truth
- frozen/nonproduct domain
- generated or local-only exhaust

## Active Product Surfaces

### 1. `products/ohmic-osm/**`

Current active product surface:

- main product shell under active implementation and polish work

Why active:

- real build/test lane
- touched in recent safe implementation packets
- clear product boundary

### 2. `apps/ohmic-toolbox/**`

Current active product surface:

- bounded mini-tool application with tests/build path

Why active:

- now has shared-math extraction and direct app-local test/build flow
- explicit product-facing tool surface

### 3. `services/backend/**`

Current active product surface:

- backend API, measurement, auth, and storage behavior that supports runtime
  product features

Why active:

- real runtime behavior
- live contract and regression work already exists here

### 4. `services/hardware/**`

Current active product surface:

- hardware integration and DSP transport logic

Why active:

- directly tied to the hardware shell and remote/DSP work

### 5. `services/ui-runtime/**`

Current active product surface:

- UI runtime/editor work that appears to be under active product exploration

Why active:

- explicit service lane with generated/runtime work adjacent to live source

### 6. `components/Hardware/**`

Current active product surface:

- AmpLab, DSP, measurement, and hardware shell behavior

Why active:

- one of the heaviest real implementation surfaces in the repo

### 7. `components/Mobile/**`

Current active product surface:

- mobile-facing instrument and helper surfaces tied to the product shell

Why active:

- directly supports live product workflows

### 8. Shared App Shell Support

Include:

- `components/Shared/**`
- `components/Layout/**`
- `components/Landing/**`
- `components/Modals/**`
- `hooks/**`
- `store/**`
- `index.tsx`
- `index.css`
- `types.ts`

Why active:

- these surfaces support the runtime shell around product features

### 9. Product Validation And Contracts

Include:

- `test/**`
- `e2e/**`
- `schemas/**`
- `utils/**`
- `scripts/**`

Why active:

- they define verification, contracts, and supporting implementation logic for
  the active product surfaces

## Supporting But Not Primary Product Surfaces

These are still source-visible, but not the best first draw for new product
implementation packets:

- `components/DesignSandbox/**`
- `components/Education/**`
- `components/Tabs/**`
- `components/Visualizations/**`
- `components/Report/**`
- `services/diagnostics/**`
- `services/auth/**`

They may contain live source truth, but they are more likely to need their own
separate cleanup or classification packet before broad implementation resumes.

## Frozen Or Nonproduct Domains

Treat these as not part of the active product surface by default:

- `docs/**`
- `archive/**`
- `android/**`
- `research/**`
- `knowledge/**`
- `site/**`
- `content-work/**`
- `labs/**`
- `firmware/**`
- `captures/**`
- `plans/**`
- `legacy/**`

Reason:

- these are docs, historical, platform-specific, or auxiliary domains that
  compete with active product work if left mixed together

## Generated And Local Exhaust

These should be treated as generated, install, or local-only churn instead of
active product truth:

- `node_modules/**`
- `dist/**`
- `output/**`
- `playwright-report/**`
- `test-results/**`
- `tmp/**`
- `products/ohmic-osm/**/node_modules/**`
- `products/ohmic-osm/**/dist/**`
- `services/backend/dist/**`
- `services/backend/storage/*.sqlite*`
- `services/backend/storage/measurement-captures/**`
- `index/*.json`
- `index/cache/**`
- `esp32round128/.pio/**`

These may matter operationally, but they are not the surfaces to treat as
implementation truth.

## Next Safe Implementation Packets

The clean next implementation lanes should be drawn from:

1. `products/ohmic-osm/**`
2. `apps/ohmic-toolbox/**`
3. `services/backend/**`
4. `services/hardware/**`
5. `components/Hardware/**`
6. `components/Mobile/**`
7. `test/**` and `schemas/**` when validating the above

## Recommended Follow-On Cleanup Packets

The remaining repo dirt should be handled through separate packets, not mixed
back into product work:

1. docs/archive/android classification
2. generated versus source artifact split
3. ignore and cleanup boundary definition
4. local output and log retention boundary

## Outcome

After this isolation:

- active product work can proceed without pretending the whole repo is one live
  implementation surface
- frozen/nonproduct domains can be classified separately
- generated churn can be frozen or ignored without hiding source truth
