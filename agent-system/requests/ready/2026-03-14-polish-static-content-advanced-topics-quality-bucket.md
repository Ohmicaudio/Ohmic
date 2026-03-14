scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
handoff_from: 2026-03-14-audit-static-content-quality-buckets
claim_id:
topic: requested-task

# Polish static-content `advanced-topics` quality bucket

## Requested Outcome

- replace the generic `advanced-topics/index.html` landing page with a real section hub
- remove or consolidate page-local `<style>` blocks across the bucket
- leave the bucket looking publication-ready without reopening parity decisions

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
