scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: now
blocking: yes
depends_on:
handoff_from:
claim_id: 20260314T024941Z-2ade8405
topic: requested-task

# Reconcile static-content parity before app-side prune

## Requested Outcome

- reconcile the duplicated static content between `ohmic-audio-labs` and `ohmic-audio-static-content`
- decide which side is canonical for the differing pages
- leave the static-host repo as the trusted destination before any app-side delete/prune step

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

## Ready When

- a claim is active for the reconciliation surfaces
- the canonical direction for differing page content is explicit
- the surviving content set in `ohmic-audio-static-content` is verified enough that prune becomes a cleanup step instead of a risky decision
- keep/merge decisions are explained using the stronger-file rubric rather than taste alone

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-static-content\public`
- `B:\ohmic\repos\ohmic-audio-static-content\site`
- `B:\ohmic\repos\ohmic-audio-static-content\content-work`

## Suggested Split

- first-wave and second-wave bucket closures are already recorded in `requests/done/`
- the remaining unresolved top-level parity bucket is:
  - `competition`
- quality/style work should continue through the separate audit track rather than by re-opening already-resolved host-only parity buckets
