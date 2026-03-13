# Ohmic

Private umbrella repo and local worksite root for the Ohmic system.

This root is intentionally **not** the place where all code gets dumped.
It exists to hold:

- architecture and migration docs
- contract indexes
- shared cross-project agent context and memory
- repo and surface manifests
- generated context indexes
- local mirror/clone landing zones

## Local Layout

```text
ohmic/
  agent-system/
  docs/
    architecture/
    contracts/
    migration/
    repo-map/
    systems/
  manifests/
  generated/
    ai-index/
    context-index/
  repos/
    ohmic-audio-labs/
    amplab-firmware/
    cyd-remote/
  tools/
    sync/
```

## Rules

1. `Ohmic` is the private umbrella/context repo.
2. Product code lives in separate private repos.
3. `repos/` is the local mirror/work area and is ignored by the umbrella repo.
4. Contracts, architecture notes, and repo ownership maps belong here.
5. Shared agent context can live here, but source Markdown remains the authority.
6. Generated context can live here, but generated files are not source of truth.

## Target GitHub Shape

- `Ohmicaudio/Ohmic`
- `Ohmicaudio/ohmic-audio-labs`
- `Ohmicaudio/amplab-firmware`
- `Ohmicaudio/cyd-remote`

Later only if needed:

- `Ohmicaudio/hardware-specs`
- `Ohmicaudio/ohmic-contracts`

## Current Seed Docs

- [`docs/migration/OHMIC_GITHUB_MIGRATION_PLAN_2026-03-12.md`](docs/migration/OHMIC_GITHUB_MIGRATION_PLAN_2026-03-12.md)
- [`docs/migration/LOCAL_HARVEST_AND_ARCHIVE_PLAN_2026-03-12.md`](docs/migration/LOCAL_HARVEST_AND_ARCHIVE_PLAN_2026-03-12.md)
- [`docs/migration/MASTERFIRMWARE_DSP_PRE_MIGRATION_AUDIT_2026-03-12.md`](docs/migration/MASTERFIRMWARE_DSP_PRE_MIGRATION_AUDIT_2026-03-12.md)
- [`docs/migration/MASTERFIRMWARE_INTERNAL_SPLIT_PROGRESS_2026-03-13.md`](docs/migration/MASTERFIRMWARE_INTERNAL_SPLIT_PROGRESS_2026-03-13.md)
- [`docs/contracts/OHMIC_CANONICAL_DEVICE_CONTRACT_DRAFT_2026-03-12.md`](docs/contracts/OHMIC_CANONICAL_DEVICE_CONTRACT_DRAFT_2026-03-12.md)
- [`docs/systems/OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md`](docs/systems/OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md)
- [`docs/systems/OHMIC_WEB_ANDROID_AND_FIRMWARE_CONSOLIDATION_2026-03-12.md`](docs/systems/OHMIC_WEB_ANDROID_AND_FIRMWARE_CONSOLIDATION_2026-03-12.md)
- [`docs/systems/DOCKER_SEMANTIC_INDEX_AND_CONTEXT_GUIDE_2026-03-12.md`](docs/systems/DOCKER_SEMANTIC_INDEX_AND_CONTEXT_GUIDE_2026-03-12.md)
- [`docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md`](docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md)

## Active Shared Proposals

These are not canonical law yet, but they should be read during related coordination work until they are either adopted into the agent rules or explicitly rejected:

- [`docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md`](docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md)

## Local Context Tooling

The umbrella repo now carries the current Chroma/docker semantic-index setup under:

- [`tools/semantic-index`](tools/semantic-index)

This is for retrieval and cross-project awareness only. It is not source of truth.

## Next Migration Steps

1. Authenticate this environment to GitHub.
2. Create the private repos under `Ohmicaudio`.
3. Push this umbrella repo to `Ohmicaudio/Ohmic`.
4. Mirror or transfer `ohmic-audio-labs` with history preserved.
5. Clean-import `amplab-firmware` and `cyd-remote` into their own repos.
