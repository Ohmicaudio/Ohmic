scope: project
authority: working
project: ohmic-audio-labs
status: blocked
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T023416Z-d999ccc6
topic: requested-task

# Prune legacy `public/` payload after worktree isolation

## Requested Outcome

- remove the duplicated legacy `public/` payload from `B:\ohmic\repos\ohmic-audio-labs`
- keep static docs/tools/reference content served from `ohmic-audio-static-content`
- avoid trampling active unrelated edits inside the current `public/` tree

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-labs\components\Landing`
- `B:\ohmic\repos\ohmic-audio-labs\index.html`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-audio-static-content`

## Constraints

- do not delete or rewrite the current `public/` tree while it contains broad in-flight edits
- keep app/runtime static-host routing intact
- keep favicon/logo/runtime fallback behavior working

## Blocker

- `B:\ohmic\repos\ohmic-audio-labs\public` is currently a heavily modified worktree surface, not an isolated transitional payload cleanup
- the prune pass should wait until those changes are either committed, separated, or otherwise intentionally cleared

## Notes

- the app-side cutover plumbing is already in place in `vite.config.ts`, `netlify.toml`, `index.html`, `utils/staticContent.ts`, and `e2e/static-tier.spec.ts`
- the static host repo `B:\ohmic\repos\ohmic-audio-static-content` is already the dedicated destination for docs/tools/reference content
- this blocked item is only for the physical prune/removal of the duplicated app-side payload

## Ready When

- the `public/` worktree is isolated enough that removal can happen without crossing unrelated active edits
- the asset-serving plan for favicon/logo/support files remains explicit
- the custom-domain behavior is explicit enough that route removal will not surprise app/runtime consumers

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-labs\components\Landing`
- `B:\ohmic\repos\ohmic-audio-labs\index.html`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-audio-static-content`
