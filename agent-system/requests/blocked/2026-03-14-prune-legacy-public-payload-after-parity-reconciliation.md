scope: project
authority: working
project: ohmic-audio-labs
status: blocked
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on: 2026-03-14-reconcile-static-content-parity-before-public-prune
handoff_from:
claim_id: 20260314T024941Z-2ade8405
topic: requested-task

# Prune legacy `public/` payload after parity reconciliation

## Requested Outcome

- remove the duplicated legacy `public/` payload from `B:\ohmic\repos\ohmic-audio-labs`
- keep static docs/tools/reference content served from `ohmic-audio-static-content`
- avoid deleting the wrong side of the current content fork

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-labs\components\Landing`
- `B:\ohmic\repos\ohmic-audio-labs\index.html`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-audio-static-content`

## Constraints

- do not delete the app-side `public` tree while parity is unresolved
- keep app/runtime static-host routing intact
- keep favicon/logo/runtime fallback behavior working

## Blocker

- tracked path transfer is complete, but content parity is not
- the app and static-host repos share `594` exact relative `public` paths, but only `17` matching blobs and `577` differing blobs
- the prune pass should wait until the parity reconciliation task is complete

## Notes

- the app-side cutover plumbing is already in place in `vite.config.ts`, `netlify.toml`, `index.html`, `utils/staticContent.ts`, and `e2e/static-tier.spec.ts`
- the static host repo `B:\ohmic\repos\ohmic-audio-static-content` is already the dedicated destination for docs/tools/reference content
- parity findings are captured in `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Ready When

- static-content parity has been reconciled and the canonical content source is explicit
- the asset-serving plan for favicon/logo/support files remains explicit
- route removal can happen as cleanup rather than as a content decision

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-labs\components\Landing`
- `B:\ohmic\repos\ohmic-audio-labs\index.html`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-audio-static-content`
