scope: global
horizon: short
authority: working
project: org-wide
topic: active-priorities
updated: 2026-03-15

# Short-Term Memory

## Repo-Root Truth

- `B:\ohmic` is the umbrella repo for shared docs, queue state, memory, tools,
  and coordination
- `B:\ohmic\repos\*` are the only active local repo roots
- `B:\junk` is the preserved non-repo holding area for external datasets and
  scratch imports
- `B:\junk\loudspeakerdatabase.csv` and `B:\junk\loudspeakerdatabase.xlsx`
  remain the preserved loudspeaker source files

## Current Priority Truth

- highest completion pressure is still `B:\ohmic\repos\ohmic-audio-labs`
- second priority is keeping `B:\ohmic` and
  `B:\ohmic\repos\ohmic-audio-static-content` truthful and durable
- firmware, `cyd-remote`, and hardware-specs stay warm but should not outrank
  software completion without a blocker

## Current Product/Deployment Truth

- `B:\ohmic\repos\ohmic-audio-labs` is the active main app/runtime repo
- `B:\ohmic\repos\ohmic-audio-static-content` is the only static docs/assets
  maintenance surface
- canonical static host is `https://ohmicaudio.com`
- `https://ohmicaudiolabs.com` is the redirect host, not the canonical one
- the duplicated app-side static `public/` payload is already gone from
  `ohmic-audio-labs`

## Current Watchouts

- `ohmic-audio-labs` still has a very dirty worktree and remains the biggest
  completion risk
- queue truth matters: when a task is taken, the request and claim must agree
- live active claims should use one canonical YAML schema only; legacy claim
  headers are tolerated only as repair input
- generated `agent-work` snapshots are derived and now carry freshness metadata,
  but manual edits still require validation or refresh afterward
- do not let `requests/ready/` collapse below `4` executable tasks if more
  real work can be surfaced from audits, follow-ons, or verification lanes
- do not let `ohmic-audio-static-content` turn into a shadow loudspeaker
  database
- loudspeaker work is still prototype-mode only; no mass extraction or page
  generation yet

## Immediate Useful Lanes

- write the `Wiring Lab` implementation packet
- identify the minimum trusted `ohmic-audio-labs` runtime checks
- document the current toolbox surface cleanly for pickup
- keep `ohmic-audio-labs` worktree triage and safe-next-commit slicing visible
