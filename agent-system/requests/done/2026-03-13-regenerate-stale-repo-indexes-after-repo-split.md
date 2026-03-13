scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-13
requester: codex-local
origin: agent
priority: soon
blocking: no
depends_on: 
handoff_from: 
claim_id: 20260313T140316Z-73a3ec41
topic: requested-task

# Regenerate stale repo indexes after repo split

## Requested Outcome

- refresh stale generated index artifacts so they no longer describe removed `firmware/`, `captures/`, `labs/`, `site/`, or `content-work/` surfaces as active repo content
- leave `ohmic-audio-labs/index/` consistent with the cleaned repo state

## Scope

- `/mnt/a/ohmic-audio-labs/index/`
- `/mnt/a/ohmic-audio-labs/tools/indexing/`
- docs that explain index freshness if they need a quick status note

## Constraints

- do not redesign the indexing system in the same task
- keep the work focused on regeneration or narrow cleanup, not new architecture
- preserve useful index tooling that is still active in `package.json`

## Notes

- `ohmic-audio-labs` has now removed `site/`, `content-work/`, in-repo `firmware/`, `captures/`, and `labs/`
- current generated files under `index/` still contain references to many of those old paths
- app build has passed after each cleanup step, so this is safe to pick up as follow-on hygiene

## Ready When

- this request is already ready
- the agent picking it up only needs a claim on `index/` and `tools/indexing/`

## Suggested Claim Scope

- `A:\ohmic-audio-labs\index`
- `A:\ohmic-audio-labs\tools\indexing`
- optional: `A:\ohmic-audio-labs\docs\repository-map.md`

