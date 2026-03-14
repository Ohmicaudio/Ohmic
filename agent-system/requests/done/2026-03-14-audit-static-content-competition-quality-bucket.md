scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: follow-up
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Audit static-content `competition` quality bucket

## Requested Outcome

- audit the `competition/*` static pages for quality issues after parity closure
- leave explicit graphics, styling, and cleanup outcomes instead of reopening parity

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\competition`

## Completion

- `competition/*` is not a parity problem anymore; it is a graphics-quality bucket
- placeholder markers remain in `5` pages
- no page-local `<style>` blocks were found in this bucket
- no new encoding defects were found in this bucket during the pass
- no page-by-page copy rewrite was required to close the audit

## Placeholder Pages

- `competition/beginner-level-what-spl-competition-is/index.html`
- `competition/beginner-level-what-sq-judging-evaluates/index.html`
- `competition/installer-level-building-for-maximum-output/index.html`
- `competition/sections/13-1-spl-competition-engineering/index.html`
- `competition/sections/13-2-sound-quality-competition-strategy/index.html`

## Recommended Follow-up

- replace the SPL wall image placeholder with either a real photo or a clean diagram in:
  - `competition/beginner-level-what-spl-competition-is/index.html`
  - `competition/sections/13-1-spl-competition-engineering/index.html`
- replace the SQ install image placeholder with either a real install photo or a clean annotated diagram in:
  - `competition/beginner-level-what-sq-judging-evaluates/index.html`
  - `competition/sections/13-2-sound-quality-competition-strategy/index.html`
- replace the competition wall build diagram placeholder in:
  - `competition/installer-level-building-for-maximum-output/index.html`

## Notes

- representative non-placeholder pages such as `competition/index.html` and `competition/competition-day-procedures/index.html` are structurally simple but not obviously broken
- this bucket should stay on the quality track only; it does not justify reopening static parity
