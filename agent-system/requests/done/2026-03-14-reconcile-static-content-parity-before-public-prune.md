scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: now
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T024941Z-2ade8405
topic: requested-task

# Reconcile static-content parity before app-side prune

## Requested Outcome

- reconcile the duplicated static content between `ohmic-audio-labs` and `ohmic-audio-static-content`
- decide which side is canonical for the differing pages
- leave the static-host repo as the trusted destination before any app-side delete/prune step

## Completion

- all top-level differing parity buckets have now been explicitly resolved and recorded under `agent-system/requests/done/`
- the final remaining unresolved bucket, `competition`, reduced to host metadata only once historical app-side URLs were normalized from `https://ohmicaudio.netlify.app` to `https://ohmicaudiolabs.com`
- the canonical destination for the shared static-doc surface is now explicit: `B:\ohmic\repos\ohmic-audio-static-content\public`
- the current `ohmic-audio-labs` worktree no longer contains `public/`, so parity closure now serves as historical reconciliation rather than as a gate on a future delete
- remaining follow-up belongs on the separate static-content quality-audit track, not on the parity board

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-static-content\public`
- `B:\ohmic\repos\ohmic-audio-static-content\site`
- `B:\ohmic\repos\ohmic-audio-static-content\content-work`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Constraints

- do not delete the app-side `public` tree until parity is resolved
- do not assume the static-host repo already contains the desired final content just because the paths exist
- keep app/runtime routing behavior intact while reconciliation is underway
- use the explicit stronger-file rubric from `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- tracked app `public` paths: `594`
- tracked static-host `public` paths: `595`
- shared exact relative paths: `594`
- exact matching blobs across shared paths: `17`
- differing blobs across shared paths: `577`
- app-only tracked `public` paths: `0`
- static-only tracked `public` paths: `1` (`public/index.html`)
- see `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`
- differing files by top-level bucket:
  - `appendix`: `117`
  - `reference`: `104`
  - `meta`: `71`
  - `installation`: `46`
  - `dsp`: `36`
  - `subwoofer-enclosures`: `35`
  - `electrical`: `26`
  - `fundamentals`: `26`
  - `mobile-electronics`: `26`
  - `tuning`: `26`
  - `advanced-topics`: `25`
  - `competition`: `19`
- recommended first reconciliation buckets:
  - `meta`
  - `advanced-topics`
  - `electrical`
  - `dsp`
  - `installation`
- completed split buckets already recorded in `requests/done/`:
  - `appendix`
  - `reference`
  - `meta`
  - `advanced-topics`
  - `electrical`
  - `dsp`
  - `installation`
  - `fundamentals`
  - `mobile-electronics`
  - `subwoofer-enclosures`
  - `tuning`
  - `competition`

## Notes

- first-wave and second-wave bucket closures are already recorded in `requests/done/`
- no unresolved top-level parity buckets remain
- quality/style work should continue through the separate audit track rather than by re-opening already-resolved host-only parity buckets
