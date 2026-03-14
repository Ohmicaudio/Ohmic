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
handoff_from: 2026-03-14-audit-static-content-quality-buckets
claim_id: 20260314T035746Z-91344c06
topic: requested-task

# Polish static-content `advanced-topics` quality bucket

## Requested Outcome

- replace the generic `advanced-topics/index.html` landing page with a real section hub
- remove or consolidate page-local `<style>` blocks across the bucket
- leave the bucket looking publication-ready without reopening parity decisions

## Completion

- rewrote `advanced-topics/index.html` into a real section hub with routing by question, experience level, and topic track
- replaced the generic auto-index metadata and footer with publication-ready section-index copy
- intentionally split the remaining `9` page-local `<style>` blocks into a dedicated follow-up bucket because they are nine unique article-level layouts rather than one reusable quick fix
- high-visibility landing-page debt is now cleared from the `advanced-topics` bucket

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\advanced-topics`
- `B:\ohmic\docs\migration\STATIC_CONTENT_QUALITY_AUDIT_PLAN_2026-03-13.md`

## Notes

- bucket pages audited: `25`
- pages with inline `<style>` blocks: `9`
- generic section landing page still present: `advanced-topics/index.html`
- representative cleanup targets:
  - `advanced-topics/index.html`
  - `advanced-topics/beginner-level-ai-assisted-tuning/index.html`
  - `advanced-topics/engineer-level-inverter-switching-noise-analysis/index.html`
  - `advanced-topics/sections/table-of-contents/index.html`

## Ready When

- the section landing page reads like a real hub instead of an auto-index
- page-local style debt is removed or intentionally normalized
- any remaining style exceptions are explicit rather than accidental
