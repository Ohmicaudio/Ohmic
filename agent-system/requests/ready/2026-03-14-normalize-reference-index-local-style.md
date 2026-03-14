scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: follow-up
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Normalize `reference/index.html` off local styles

## Requested Outcome

- remove the page-local `<style>` block from `reference/index.html`
- preserve the current information architecture while moving the page back toward the shared static-site styling model

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\index.html`

## Notes

- this is the only audited `reference/*` page still using a page-local style block
- current style block defines a self-contained dark card-grid layout with custom colors and spacing
- do not regress readability or section navigation while normalizing it

## Ready When

- `reference/index.html` no longer carries a page-local `<style>` block
- the page still presents the reference categories clearly with readable links and descriptions

