# Ohmic Audio Labs Knowledge and Research Boundary

Date: 2026-03-13
Source repo: `/mnt/a/ohmic-audio-labs`

## Result

The `knowledge/` and `research/` surfaces in `ohmic-audio-labs` are not active
runtime systems.

Current observed state:

- `knowledge/` contains only `knowledge/README.md`
- `research/` contains only `research/README.md`

No live app/backend/mobile/runtime code path inspected in this pass depends on
either folder.

## Decision

Treat both folders as non-runtime placeholders and remove them from the main
app repo.

If future domain-reference or experiment material needs a real home, it should
live in:

- `ohmic-audio-static-content`
- the umbrella/context layer under `Ohmic`
- or a dedicated research/docs surface

It should not regrow ambiguously inside the runtime repo.

## Follow-on doc updates

After removal:

- `docs/subsystem-index.md` should stop advertising `knowledge/` as a live
  subsystem
- cleanup/migration notes should record that the boundary has been resolved
