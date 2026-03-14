# Ohmic

Private umbrella repo and local worksite root for the Ohmic system.

This root is intentionally **not** the place where all code gets dumped.
It exists to hold:

- architecture and migration docs
- contract indexes
- shared cross-project agent context and memory
- repo and surface manifests
- generated context indexes
- active local repo homes

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
    ohmic-audio-static-content/
    amplab-firmware/
    cyd-remote/
  tools/
    sync/
```

## Rules

1. `Ohmic` is the private umbrella/context repo.
2. Product code lives in separate private repos.
3. `repos/` is the active local work area and is ignored by the umbrella repo.
4. Contracts, architecture notes, and repo ownership maps belong here.
5. Shared agent context can live here, but source Markdown remains the authority.
6. Generated context can live here, but generated files are not source of truth.

## Target GitHub Shape

- `Ohmicaudio/Ohmic`
- `Ohmicaudio/ohmic-audio-labs`
- `Ohmicaudio/ohmic-audio-static-content`
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
- [`docs/systems/GIT_AND_GITHUB_BOOTSTRAP_IN_MIXED_ENV_2026-03-13.md`](docs/systems/GIT_AND_GITHUB_BOOTSTRAP_IN_MIXED_ENV_2026-03-13.md)
- [`docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md`](docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md)
- [`docs/systems/STARTUP_FUNNEL_AND_REMOTE_SYNC_PROPOSAL_2026-03-13.md`](docs/systems/STARTUP_FUNNEL_AND_REMOTE_SYNC_PROPOSAL_2026-03-13.md)

## Startup Rule

Use `B:\ohmic` as the startup funnel:

1. read [`agent-system/AGENTS.md`](agent-system/AGENTS.md)
2. read the horizon layer in [`docs/systems/ALWAYS_IN_CONTEXT_SURVIVAL_MODEL_2026-03-14.md`](docs/systems/ALWAYS_IN_CONTEXT_SURVIVAL_MODEL_2026-03-14.md)
3. read the relevant project overlay under [`agent-system/projects/`](agent-system/projects/)
4. then enter the active repo under [`repos/`](repos/)
5. read that repo's local `AGENTS.md` and startup docs
6. account for `agent-system/requests/ready/` before claiming there is no queued work
7. do repo-specific work there

Do not stop at the umbrella layer once the target repo is known.

Before entering active work, apply the conduct gate:

- [`docs/systems/AGENT_CONDUCT_GATE_2026-03-14.md`](docs/systems/AGENT_CONDUCT_GATE_2026-03-14.md)

Before narrowing into task detail, keep the horizon layer loaded:

- [`docs/systems/ALWAYS_IN_CONTEXT_SURVIVAL_MODEL_2026-03-14.md`](docs/systems/ALWAYS_IN_CONTEXT_SURVIVAL_MODEL_2026-03-14.md)

## Local Sandbox Boundary

Ignored nested repos under `B:/ohmic` are local-only sandboxes unless they are
explicitly harvested into tracked docs, manifests, or target repos.

Current reference:

- [`docs/systems/IGNORED_NESTED_REPOS_AND_LOCAL_SANDBOXES_2026-03-13.md`](docs/systems/IGNORED_NESTED_REPOS_AND_LOCAL_SANDBOXES_2026-03-13.md)

## Active Shared Proposals

These are not canonical law yet, but they should be read during related coordination work until they are either adopted into the agent rules or explicitly rejected:

- [`docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md`](docs/systems/DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md)
- [`docs/systems/STARTUP_FUNNEL_AND_REMOTE_SYNC_PROPOSAL_2026-03-13.md`](docs/systems/STARTUP_FUNNEL_AND_REMOTE_SYNC_PROPOSAL_2026-03-13.md)

## Local Context Tooling

The umbrella repo now carries the current Chroma/docker semantic-index setup under:

- [`tools/semantic-index`](tools/semantic-index)

This is for retrieval and cross-project awareness only. It is not source of truth.

## Next Migration Steps

1. Push this umbrella repo to `Ohmicaudio/Ohmic`.
2. Keep `B:\ohmic\repos\ohmic-audio-labs` as the active local app repo home.
3. Firmware remotes are live: `Ohmicaudio/amplab-firmware` and `Ohmicaudio/cyd-remote`.
4. Verify Cloudflare deploy and domain wiring for `ohmic-audio-static-content`.
5. Retire duplicate app-side static payload only after the cutover cleanup is isolated from unrelated repo changes.
