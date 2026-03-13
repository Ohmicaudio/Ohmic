scope: project
authority: working
project: org-wide
status: done
requested: 2026-03-13
requester: codex-local
origin: agent
priority: soon
blocking: no
depends_on: 
handoff_from: 
claim_id: 20260313T174720Z-a755b6ef
topic: semantic-index

# Make staged semantic index runs complete in practical time

## Requested Outcome

- make the non-bootstrap semantic index stages practical to run on this Windows workspace without babysitting or long foreground stalls
- keep the current successful bootstrap seed intact while improving the larger staged runs
- leave the stage runner and indexer documented well enough that another agent can run `core-docs`, `runtime`, `firmware`, and `static` with confidence

## Scope

- `B:\ohmic\tools\semantic-index\indexer.py`
- `B:\ohmic\tools\semantic-index\stage-index.ps1`
- `B:\ohmic\tools\semantic-index\corpus.yaml`
- `B:\ohmic\tools\semantic-index\README.md`
- optional supporting notes under `B:\ohmic\docs\` if the run strategy changes enough to need a status update

## Constraints

- do not break the working `agent-bootstrap` manifest flow
- do not replace the file-first memory model with DB-first authority
- prefer narrow performance or staging fixes over a full semantic-index redesign
- keep the solution Windows-friendly for the current `A:\` and `B:\` workspace layout
- if a full run is still too heavy for foreground execution, leave a clear staged or background operating path instead of pretending the problem is solved

## Notes

- the shared agent layer is already seeded successfully into Chroma through `agent-bootstrap-corpus.yaml`
- verified seeded sources include `B:\ohmic\agent-system\AGENTS.md`, `B:\ohmic\agent-system\instructions\request-routing.md`, `A:\ohmic-audio-labs\AGENTS.md`, and `A:\cyd_remote\AGENTS.md`
- the live `ohmic_context` collection currently contains 63 documents from that bootstrap seed
- `indexer.py` already has Windows and `/mnt/...` path normalization fixes in place
- `stage-index.ps1` already exists with stages for `agent-bootstrap`, `core-docs`, `runtime`, `firmware`, `static`, and `all`
- resolved on 2026-03-13 by pruning excluded trees during recursive discovery, tightening nested exclude patterns, and fixing the stage runner argument pass-through bug
- current verified behavior:
  - `ohmic-audio-labs` dry-run completes in under a second
  - `runtime` stage dry-run completes in about two seconds
  - full staged `all` run completes in about 74 seconds on this machine

## Ready When

- this request is already ready
- the next agent should start by measuring where `core-docs` and `runtime` spend time before changing behavior

## Suggested Claim Scope

- `B:\ohmic\tools\semantic-index\indexer.py`
- `B:\ohmic\tools\semantic-index\stage-index.ps1`
- `B:\ohmic\tools\semantic-index\corpus.yaml`
- `B:\ohmic\tools\semantic-index\README.md`

