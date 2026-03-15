scope: global
horizon: mid
authority: working
project: org-wide
topic: initiatives
updated: 2026-03-15

# Mid-Term Memory

## Current Initiatives

- keep the shared agent system truthful enough that queue state, memory, and
  repo truth do not drift apart
- keep `B:\ohmic\repos\*` as the only active local work surface
- finish the main software lane in `ohmic-audio-labs` before side lanes steal
  attention
- keep one shared toolbox/math lane that can later feed both toolbox and public
  surfaces
- keep loudspeaker work in governed prototype/data mode until the main software
  lane is calmer

## Learned Lessons

- file-backed memory is easier to trust, diff, and repair than DB-only memory
- retrieval should accelerate recall, not replace authority
- shared agent behavior needs one explicit contract or it drifts across sessions
- queue drift often comes from stale metadata inside moved request files, not
  just from missing claim files

## Capability And Access Notes

- agents can use the local semantic-index setup as a cross-project retrieval layer
- reference and archive material should be consolidated under `B:\ohmic` for easier indexing and re-entry
- project overlays are the right place for repo-specific current truth that should not pollute global long-term memory
- `B:\junk` is the approved non-repo holding area for external datasets and scratch imports that may later feed productized data lanes

## Recurring Mistakes To Watch

- overloading long-term memory with unstable details
- confusing session continuity notes with canonical truth
- letting the content repo absorb data-lane ownership because generation feels
  close
- pretending repo-wide lint or type-check results are trustworthy when the repo
  is still too noisy

## Cross-Project Direction

- `Ohmic` remains the umbrella/context repo, not a monorepo dump
- product code should live in separate repos with explicit overlays and contracts
- the shared agent system should span repos without replacing repo-local truth
- `ohmic-audio-labs`, `amplab-firmware`, `cyd-remote`, and
  `ohmic-audio-static-content` should be treated as one coordinated ecosystem,
  but main software completion still outranks the side repos
- static-content should stay editorial/template-oriented, while normalized
  loudspeaker facts stay in the data lane

## Known Work Ahead

- finish the `Wiring Lab` implementation packet and later UI-state model
- identify minimum trusted runtime checks that actually mean something in
  `ohmic-audio-labs`
- keep toolbox/public-surface graduation deliberate, starting with `Ohm's Law`
  only when route/copy/CTA guidance is clear
- continue triaging `ohmic-audio-labs` into safe next commit slices instead of
  letting the dirty worktree stay one giant blur
- keep the loudspeaker lane narrow: parser proof, sample packet, then governed
  data shape before any larger generation step
