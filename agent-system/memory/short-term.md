scope: global
horizon: short
authority: working
project: org-wide
topic: active-priorities
updated: 2026-03-14

# Short-Term Memory

## Always-Load Context

- this file is meant to stay in active session context
- it is the quickest snapshot of what matters right now across projects
- if a useful skill, keyword, access note, or current failure pattern is not documented elsewhere yet, it belongs here first

## Active Priorities

- stand up the shared agent-system so cross-session behavior and memory stop drifting
- keep `B:\ohmic\repos\*` as the only active local repo roots
- keep the migration of `ohmic-audio-labs`, `amplab-firmware`, `cyd-remote`, and `ohmic-audio-static-content` visible as a first-class workstream
- use the semantic index as a retrieval layer for long-lived reference docs

## Current Workspace Truth

- `B:\ohmic` is the umbrella context root for shared docs, manifests, tools, archives, and reference material
- `B:\ohmic\repos\ohmic-audio-labs` is the active local repo home for the main app/runtime repo
- `B:\ohmic\repos\ohmic-audio-labs` now tracks `origin/main` at `https://github.com/Ohmicaudio/ohmic-audio-labs.git`, and `measurement/local-input-normalization` is also pushed upstream
- `B:\ohmic\repos\ohmic-audio-labs` no longer carries the duplicated static-docs `public/` tree; that payload now lives only in `B:\ohmic\repos\ohmic-audio-static-content`
- `B:\ohmic\repos\amplab-firmware` is the active local repo home for the firmware lane
- `B:\ohmic\repos\cyd-remote` is the active local repo home for the handheld lane
- `B:\ohmic\repos\ohmic-audio-static-content` is the active local repo home for the static-content lane
- `B:\junk` is the non-repo holding area for large external files and one-off imports that should not live inside active repos
- `B:\junk\loudspeakerdatabase.csv` and `B:\junk\loudspeakerdatabase.xlsx` are preserved there for later speaker-data extraction, image gathering, and possible per-speaker static page generation
- no other local path should be treated as an active work root
- database/reference material kept from `ohmic-audio-universe` should live under `B:\ohmic` and below
- the local Chroma semantic index is verified running from `B:\ohmic\tools\semantic-index`

## Active Skills And Keywords

- skills in active use:
  - shared agent-system design
  - documentation consolidation
  - archive/reference normalization
  - semantic-index setup and local Docker verification
- retrieval keywords:
  - `agent-system`
  - `memory`
  - `handoff`
  - `semantic-index`
  - `Chroma`
  - `authority`
  - `canonical`
  - `reference`

## Current Watchouts And Repeated Mistakes

- do not let folder names keep lying once their role changes
- do not treat the vector DB as the authority
- do not promote raw chat impressions straight into long-term memory
- when a useful fact is still fresh or unstable, keep it here before promoting it upward
- do not let the startup funnel or shared memory keep agents orbiting the umbrella repo after the active repo is known
- do not let the migration of the three active code repos drop out of the live task picture
- repo-local Git credential overrides can silently bypass the working `gh` auth helper; check `.git/config` before treating a GitHub push failure as an account-scope problem
- once a static-content cutover is complete, delete the duplicate app-repo payload instead of leaving both copies alive

## Immediate Next Uses For This System

- keep the B-drive repo-home rule visible across sessions until agents stop drifting back to stale path assumptions
- finish normalizing shared docs, manifests, and tooling around `B:\ohmic` and the migrated repo names
- use the shared system to hand agents into the active repo quickly instead of parking them at the umbrella layer
- treat `B:\ohmic\repos\ohmic-audio-static-content` as the only maintenance surface for static docs, tools, SEO files, and branding assets
- use `B:\junk` for bulky external inputs that are intentionally kept outside repo history until they are normalized
