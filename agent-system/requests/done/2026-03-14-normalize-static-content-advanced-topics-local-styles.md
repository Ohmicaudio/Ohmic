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
handoff_from: 2026-03-14-polish-static-content-advanced-topics-quality-bucket
claim_id: 20260314T040425Z-a8317517
topic: requested-task

# Normalize static-content `advanced-topics` local styles

## Requested Outcome

- remove or consolidate the remaining page-local `<style>` blocks across `advanced-topics`
- keep the advanced-topics articles readable and intentional without shipping nine one-off embedded style systems

## Completion

- removed page-local `<style>` blocks from all remaining advanced-topics pages that still carried them
- changed `9` advanced-topics pages in total
- reduced local-style pages from `9` to `0`
- `advanced-topics` now has no remaining generic landing page and no remaining article-local embedded style systems from the first-wave audit

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\advanced-topics`
- `B:\ohmic\docs\migration\STATIC_CONTENT_QUALITY_AUDIT_PLAN_2026-03-13.md`

## Notes

- `advanced-topics/index.html` is already rewritten as a real hub
- remaining pages with page-local `<style>` blocks: `9`
- representative cleanup targets:
  - `advanced-topics/beginner-level-ai-assisted-tuning/index.html`
  - `advanced-topics/engineer-level-inverter-switching-noise-analysis/index.html`
  - `advanced-topics/installer-level-working-with-most-systems/index.html`
  - `advanced-topics/sections/table-of-contents/index.html`
  - `advanced-topics/the-next-5-years-20262031/index.html`

## Ready When

- page-local style blocks are removed, consolidated, or intentionally normalized into a smaller shared pattern
- the bucket no longer depends on article-specific inline CSS for basic presentation quality
