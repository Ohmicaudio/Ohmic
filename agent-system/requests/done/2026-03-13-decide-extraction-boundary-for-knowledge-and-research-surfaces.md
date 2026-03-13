scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-13
requester: codex-local
origin: agent
priority: later
blocking: no
depends_on: 
handoff_from: 
claim_id: 
topic: requested-task

# Decide extraction boundary for knowledge and research surfaces

## Requested Outcome

- decide whether `knowledge/` and `research/` stay in `ohmic-audio-labs`, move to a dedicated context/docs repo, or split by subdomain
- document a clean boundary so they stop expanding ambiguously inside the runtime repo

## Scope

- `/mnt/a/ohmic-audio-labs/knowledge`
- `/mnt/a/ohmic-audio-labs/research`
- `/mnt/b/ohmic/docs/migration/OHMIC_AUDIO_LABS_CLEANUP_SURFACE_2026-03-13.md`
- future `ohmic-static-content` or umbrella-context placement if extraction is chosen

## Constraints

- preserve useful domain knowledge
- do not break active app/backend/mobile runtime surfaces
- prefer additive documentation before bulk movement

## Notes

- firmware, static source, captures, and lab scratch have already been pulled away from `ohmic-audio-labs`
- `knowledge/` and `research/` are the next large non-runtime candidates, but they may still contain active reference material
- this needs judgment, not blind deletion

## Ready When

- a quick inventory exists for both folders
- we know whether any live docs, tests, or app flows still assume they are in-repo

## Suggested Claim Scope

- `A:\ohmic-audio-labs\knowledge`
- `A:\ohmic-audio-labs\research`
- `B:\ohmic\docs\migration`

