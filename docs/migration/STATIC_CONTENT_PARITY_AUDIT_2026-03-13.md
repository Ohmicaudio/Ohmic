# Static Content Parity Audit

Date: 2026-03-13

## Purpose

Capture the actual parity state between:

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-static-content\public`

This note exists to stop the static cutover from being treated as a simple delete step when the duplicated content is not yet content-identical.

## Current Result

- tracked app `public` paths: `594`
- tracked static-host `public` paths: `595`
- shared paths by exact relative name: `594`
- exact blob matches across shared paths: `17`
- differing blobs across shared paths: `577`
- app-only tracked `public` paths: `0`
- static-only tracked `public` paths: `1`

Static-only path:

- `public/index.html`

## Meaning

- the path transfer is effectively complete
- the content transfer is not yet reconciled
- deleting the app-side `public` tree now would throw away one side of an unresolved content fork

## Observed Pattern

The differing files are broad and not confined to one tiny subsection.

Examples:

- `advanced-topics/*`
- `appendix/glossary/*`
- `electrical/*`
- `meta/*`
- many section index pages and knowledge pages

This is not a small residual asset mismatch.

Confirmed resolved bucket:

- `dsp/*`
  - `36` differing files
  - all `36` differences reduce to host metadata only (`ohmicaudio.netlify.app` in the app repo vs `ohmicaudiolabs.com` in the static repo)
  - no deeper content drift was found in the bucket sample or full-bucket normalization check
  - operational result: keep the `ohmic-audio-static-content` versions as canonical for the `dsp` bucket

## Operational Conclusion

Treat the migration state as:

- transfer complete by path
- migration incomplete by content parity

That means the next safe step is reconciliation, not prune.

## Comparison Rubric

When two files share the same path but differ in content, `stronger` means the version that wins this comparison order:

1. correctness
2. completeness
3. clarity and useful density
4. structure and formatting integrity
5. alignment with current product/site direction
6. visual and illustrative support

Practical interpretation:

- correctness
  - fewer factual mistakes
  - preserves valid technical details, units, formulas, and links
- completeness
  - covers the topic more fully without leaving obvious holes
- clarity and useful density
  - less filler
  - more technically useful content per line
- structure and formatting integrity
  - cleaner headings, lists, metadata, and encoding
  - fewer broken characters, malformed sections, or layout regressions
- alignment with current product/site direction
  - matches current canonical paths, host assumptions, terminology, and tone
- visual and illustrative support
  - better diagrams, graphics, tables, or page organization when all higher criteria are otherwise close

Tie-break rule:

- if one version is more correct but less polished, keep the more correct version and queue style/graphics cleanup separately
- never choose polish over correctness

## Next Move

1. decide which side is canonical for the shared static pages
2. reconcile the differing content into `ohmic-audio-static-content`
3. verify app/runtime links against the reconciled static host
4. only then remove the duplicated app-side `public` surface

## Bucket Decisions

### `electrical` bucket (2026-03-14)

- canonical source: `B:\ohmic\repos\ohmic-audio-static-content\public\electrical`
- historical app-side comparison source: `ohmic-audio-labs` Git `HEAD` under `public/electrical/*`
- current `ohmic-audio-labs` worktree no longer contains `public/electrical`, so reconciliation for this bucket was a canonical-decision pass rather than a file-copy pass
- compared files in bucket: `26`
- historical app-side files still using `https://ohmicaudio.netlify.app`: `26`
- static-host files still using `https://ohmicaudio.netlify.app`: `0`
- static-host files longer than the historical app-side versions: `26`
- static-host files with more explicit `<section>` structure than the historical app-side versions: `13`

Representative files that clearly favored the static-host copy:

- `electrical/index.html`
- `electrical/beginner-level-what-batteries-do/index.html`
- `electrical/engineer-level-ultracapacitors/index.html`
- `electrical/sections/table-of-contents/index.html`

Operational result:

- keep the current `ohmic-audio-static-content` `electrical/*` pages as canonical
- no page promotion from app history was needed for this bucket
