# Ohmic Audio Labs Generated Vs Source Artifact Split

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Separate generated or runtime artifacts from true source artifacts in the dirty
tree so future commits and classification passes stop mixing the two.

## Core Rule

Generated or runtime exhaust should not be allowed to hide real source work.

At the same time, tracked support data that still acts as source truth should
not be swept away as if it were disposable build output.

## Generated Or Runtime Artifact Classes

These are generated, installed, cached, or local runtime artifacts and should
not be treated as primary source truth:

### Build Output

- `dist/**`
- `products/ohmic-osm/apps/osm-web/dist/**`
- `services/backend/dist/**`

### Dependency Install Output

- `node_modules/**`
- `products/ohmic-osm/**/node_modules/**`
- `services/backend/node_modules/**`

### Local Output And Test Exhaust

- `output/**`
- `playwright-report/**`
- `test-results/**`
- `tmp/**`

### Runtime Storage Artifacts

- `services/backend/storage/auth-control-plane.v1.sqlite*`
- `services/backend/storage/measurement-captures.v1.json`
- `services/backend/storage/measurement-captures/**`

### Generated Or Cache-Like Index Artifacts

- `index/cache/state.json`
- `index/code_chunks.json`
- `index/file_summaries.json`
- `index/hot_paths.json`
- `index/repo_map.json`
- `index/routing_rules.yaml`
- `index/semantic_file_summaries.json`
- `index/semantic_repo_map.json`
- `index/semantic_symbol_index.json`
- `index/subsystem_index.md`
- `index/symbol_index.json`
- `index/.cache.json`

These may have operational value, but they are not the same kind of source as
the product and service code.

## Source Artifacts

These are true source or support-truth surfaces and should remain visible:

### Product And App Source

- `components/**`
- `services/**`
- `hooks/**`
- `store/**`
- `utils/**`
- `index.tsx`
- `index.css`
- `types.ts`

### Product Packages

- `products/ohmic-osm/**` source files
- `apps/ohmic-toolbox/**` source files

### Contracts And Validation

- `schemas/**`
- `test/**`
- `e2e/**`
- `scripts/**`

## Support Artifacts That Still Belong To Source

Some files look auxiliary, but still belong on the source side:

- `schemas/contracts.manifest.v1.json`
- tracked examples under `schemas/examples/**`
- source-facing backend README and contract docs when they define runtime truth
- source scripts that generate, migrate, or validate controlled outputs

These should not be bundled with disposable build or install output.

## Mixed Or Careful Cases

These need extra care because they sit close to generated exhaust:

### `services/ui-runtime/generated/**`

Likely generated, but adjacent to active source under `services/ui-runtime/**`.
Treat as generated/runtime-adjacent until a dedicated keep/freeze rule says
otherwise.

### `services/backend/storage/**`

Mostly runtime storage and local evidence, not durable source.
Should be classified separately from backend code.

### `index/**`

Current files behave more like generated/cached indexing output than hand-owned
source, even though they are tracked in the dirty tree.
They should not be allowed to dominate source cleanup decisions.

## Recommended Next-State Buckets

### Freeze Or Ignore As Generated

- build output
- install output
- test/report output
- runtime DB/storage files
- index/cache artifacts

### Keep As Source

- product source files
- service source files
- contracts, schemas, tests, scripts

### Reclassify In Dedicated Follow-On

- `services/ui-runtime/generated/**`
- any tracked support data whose source/generated status is still ambiguous

## Why This Split Helps

Once generated/runtime artifacts are treated separately:

- source cleanup can focus on code and docs truth
- ignore/cleanup rules can be written without hiding real product work
- product packets stop competing with package installs, dist output, and local
  backend storage churn

## Immediate Follow-On

This split should feed:

1. repo-level ignore and cleanup boundary
2. local output and log retention boundary
3. first safe cleanup execution wave
