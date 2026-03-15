Status: inventory
Date: 2026-03-15

# Ohmic Audio Labs Dirty Worktree Inventory

## Purpose

Turn the current `ohmic-audio-labs` dirty worktree into domain buckets so the
repo can be completed in slices instead of treated like one giant mess.

## Snapshot Summary

Branch:

- `measurement/local-input-normalization`

Current high-level pattern:

- the repo is broadly dirty across product, docs, archive, Android, static
  payload, generated artifacts, and experimental lanes
- the toolbox lane itself is relatively controlled
- the biggest risk is not one broken file, it is mixed-scope churn

## Largest Dirty Domains By Count

Approximate bucket counts from the current worktree snapshot:

- `public`: `594`
- `docs`: `128`
- `products`: `126`
- `components`: `98`
- `services`: `89`
- `test`: `46`
- `archive`: `43`
- `android`: `32`
- `"docs/created book"`: `28`
- `schemas`: `22`
- `utils`: `22`
- `scripts`: `21`
- `esp32round128`: `15`
- `index`: `12`

## Domain Triage

## 1. Safe Next-Commit Domains

These are the best candidates for focused next slices because they map to live
product value and can likely be separated from the rest.

### A. Toolbox-specific product lane

Examples:

- `apps/ohmic-toolbox`
- `utils/toolboxMath.ts`
- `utils/toolboxMath.fixtures.ts`
- `test/utils/toolboxMath.test.ts`

Assessment:

- already proving to be sliceable
- safest current product lane
- good place to keep building while larger repo triage happens

Recommendation:

- continue committing toolbox-related work separately

### B. Main app/runtime root surfaces

Examples:

- `App.tsx`
- `components/*`
- `services/*`
- `store/*`
- `constants.ts`

Assessment:

- high product value
- but too broad to commit as one unit

Recommendation:

- subdivide by runtime domain before committing
- likely separate into:
  - dashboard/shell
  - hardware/control surfaces
  - measurement/support services

### C. Product packages under `products/`

Examples:

- `products/ohmic-osm/*`

Assessment:

- meaningful lane
- should not be mixed blindly with runtime churn

Recommendation:

- treat as its own domain
- inventory separately before committing further

## 2. Freeze For Now

These areas are too large, too noisy, or too legacy-shaped to treat as normal
active completion work right now.

### A. `public`

Count:

- `594`

Assessment:

- still enormous
- likely contains mixed transitional/static payload residue
- too dangerous to treat casually inside the main app repo

Recommendation:

- freeze
- do not commit broad `public` changes until a dedicated boundary pass is done

### B. Archive and legacy surfaces

Examples:

- `archive/*`
- `legacy/*`
- `docs/archive/*`
- `docs/created book/*`

Assessment:

- very large
- low current revenue/completion value
- easy place to waste time

Recommendation:

- freeze unless specifically doing archival cleanup

### C. Android wrapper and mobile shell

Examples:

- `android/*`
- `capacitor.config.ts`

Assessment:

- important, but too broad and too mixed for opportunistic cleanup
- deserves its own triage pass

Recommendation:

- freeze until explicitly split into Android-specific slices

## 3. Needs Separate Triage Before Commit

These are real work lanes, but not safe to commit without one more inventory
pass.

### A. `components`

Count:

- `98`

Assessment:

- contains active product work and placeholder deletions
- likely mixes several UI lanes

Recommendation:

- split by:
  - `components/Hardware`
  - `components/Mobile`
  - `components/Landing`
  - `components/Modals`
  - `components/Tabs`

### B. `services`

Count:

- `89`

Assessment:

- likely mixes backend, auth, hardware, measurement, and runtime/editor work

Recommendation:

- split by service family before any commit plan

### C. `products`

Count:

- `126`

Assessment:

- likely its own large subsystem
- should not be bundled with app shell or toolbox changes

Recommendation:

- separate product-surface triage task

### D. `docs`

Count:

- `128`

Assessment:

- contains active docs, stale docs, historical docs, and likely generated docs

Recommendation:

- do not try to “clean docs” as one job
- split into:
  - active repo docs
  - archival docs
  - generated/book material

## 4. Likely Generated / Noise / Disposable

These should be treated carefully, but they are strong candidates for cleanup
or ignore decisions rather than product work.

Examples:

- `dist/`
- `node_modules/`
- `playwright-report/`
- `test-results/`
- `output/`
- `captures/`
- `backend_*.txt`
- `dev.log`
- `dev-mobile.log`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

Assessment:

- likely not meaningful source of truth

Recommendation:

- classify and purge or ignore in a separate cleanup slice

## 5. Small But Important Governance Domains

These are not the biggest counts, but they can still cause real damage.

### A. `schemas`

Assessment:

- cross-repo drift risk

Recommendation:

- do not edit casually
- treat under schema governance rules only

### B. root config files

Examples:

- `.gitignore`
- `.env.example`
- `.github/workflows/*`
- `package.json`
- `vite.config.ts`
- `playwright.config.ts`

Assessment:

- small count, high blast radius

Recommendation:

- isolate into dedicated config/governance slices

## Immediate Classification

### Safe to work next

- toolbox lane
- `Wiring Lab` implementation packet
- runtime verification packet
- dirty-worktree split planning

### Needs isolation before touching

- `components`
- `services`
- `products`
- `docs`
- Android wrapper

### Freeze

- `public`
- archive/legacy surfaces
- big historical book/content material

### Treat as cleanup noise

- build artifacts
- logs
- reports
- packaged zips
- `node_modules`

## Best Next Follow-On Tasks

1. identify safe next commit slices in `ohmic-audio-labs`
2. identify minimum trusted runtime checks
3. split `components` by active UI domain
4. split `services` by active service domain
5. classify generated/noise paths for purge or ignore rules

## Summary

The repo is not “one dirty worktree.”

It is several different kinds of dirt mixed together:

- active product work
- risky config/workflow edits
- static payload residue
- Android wrapper churn
- archives and historical material
- generated noise

The correct completion path is to separate those classes before trying to
“clean” anything.
