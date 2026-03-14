scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T025728Z-aee035a1
topic: requested-task

# Audit static-content quality buckets

## Requested Outcome

- audit the static-content repo in section-sized buckets for content quality, styling, graphics needs, and remaining encoding defects
- leave clear per-section outcomes instead of one giant undifferentiated cleanup list

## Completion

- audited the first five visible sections: `meta`, `advanced-topics`, `electrical`, `dsp`, and `installation`
- confirmed `meta` and `electrical` as clean keep-as-is sections for now
- identified `advanced-topics` as a styling/landing-page cleanup bucket
- identified `dsp` as a graphics-placeholder/landing-page cleanup bucket
- identified `installation` as the highest-debt quality bucket, with heavy placeholder and landing-page cleanup still needed
- recorded the section findings in `B:\ohmic\docs\migration\STATIC_CONTENT_QUALITY_AUDIT_PLAN_2026-03-13.md`
- split the concrete follow-up into smaller ready tasks so the remaining cleanup can run in parallel

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public`
- `B:\ohmic\repos\ohmic-audio-static-content\site`
- `B:\ohmic\repos\ohmic-audio-static-content\content-work`
- `B:\ohmic\docs\migration\STATIC_CONTENT_QUALITY_AUDIT_PLAN_2026-03-13.md`

## Constraints

- do not assume file presence means quality is good enough
- prefer section-level audit outputs over repo-wide vague summaries
- keep the audit useful for parallel work by multiple agents

## Notes

- parity drift and quality drift are related but not identical
- the first visible buckets to audit are `meta`, `advanced-topics`, `electrical`, `dsp`, and `installation`
- one mojibake defect was already found and fixed in `content-work/INSTRUCTIONS.md`

## Ready When

- a claim is active for one or more concrete section buckets
- the audit output can tell another agent what to rewrite, restyle, illustrate, or leave alone

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\meta`
- `B:\ohmic\repos\ohmic-audio-static-content\public\advanced-topics`
- `B:\ohmic\repos\ohmic-audio-static-content\public\electrical`
- `B:\ohmic\repos\ohmic-audio-static-content\public\dsp`
- `B:\ohmic\repos\ohmic-audio-static-content\public\installation`
