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

### `meta` bucket (2026-03-14)

- canonical source: `B:\ohmic\repos\ohmic-audio-static-content\public\meta`
- historical app-side comparison source: `ohmic-audio-labs` Git `HEAD` under `public/meta/*`
- current `ohmic-audio-labs` worktree no longer contains `public/meta`, so reconciliation for this bucket was also a canonical-decision pass rather than a file-copy pass
- compared files in bucket: `71`
- historical app-side files still using `https://ohmicaudio.netlify.app`: `71`
- static-host files still using `https://ohmicaudio.netlify.app`: `0`
- static-host files longer than the historical app-side versions: `70`
- static-host files with more explicit `<section>` structure than the historical app-side versions: `53`
- one file, `meta/index.html`, is shorter than the historical app-side version but still more structured and remains the stronger canonical page

Representative files that clearly favored the static-host copy:

- `meta/index.html`
- `meta/ohmic-audio-labs-car-audio-wiki/index.html`
- `meta/for-engineers/index.html`
- `meta/master-index-pages-257-270/index.html`

Operational result:

- keep the current `ohmic-audio-static-content` `meta/*` pages as canonical
- no page promotion from app history was needed for this bucket
- inspection note: the earlier apparent mojibake in terminal output was caused by a PowerShell decoding path during review, not by invalid UTF-8 bytes in the published files

### `dsp` bucket (2026-03-14)

- canonical source: `B:\ohmic\repos\ohmic-audio-static-content\public\dsp`
- historical app-side comparison source: `ohmic-audio-labs` Git `HEAD` under `public/dsp/*`
- current `ohmic-audio-labs` worktree no longer contains `public/dsp`, so reconciliation for this bucket was also a canonical-decision pass rather than a file-copy pass
- compared files in bucket: `36`
- historical app-side files still using `https://ohmicaudio.netlify.app`: `36`
- static-host files still using `https://ohmicaudio.netlify.app`: `0`
- static-host files longer than the historical app-side versions: `36`
- static-host files with more explicit `<section>` structure than the historical app-side versions: `0`

Representative files that favored keeping the static-host copy:

- `dsp/index.html`
- `dsp/day-1-physical-installation-and-wiring/index.html`
- `dsp/engineer-level-fir-filter-mathematics/index.html`
- `dsp/sections/table-of-contents/index.html`

Operational result:

- keep the current `ohmic-audio-static-content` `dsp/*` pages as canonical
- no page promotion from app history was needed for this bucket
- quality follow-up still remains outside parity: `11` `dsp/*` pages include visual placeholders and should stay on the quality-audit track

### `advanced-topics` bucket (2026-03-14)

- canonical source: `B:\ohmic\repos\ohmic-audio-static-content\public\advanced-topics`
- historical app-side comparison source: `ohmic-audio-labs` Git `HEAD` under `public/advanced-topics/*`
- current `ohmic-audio-labs` worktree no longer contains `public/advanced-topics`, so reconciliation for this bucket was also a canonical-decision pass rather than a file-copy pass
- compared files in bucket: `25`
- historical app-side files still using `https://ohmicaudio.netlify.app`: `25`
- static-host files still using `https://ohmicaudio.netlify.app`: `0`
- static-host files longer than the historical app-side versions: `25`
- static-host files with more explicit `<section>` structure than the historical app-side versions: `24`
- visual placeholder pages in historical app-side copy: `2`
- visual placeholder pages in static-host copy: `0`

Representative files that clearly favored the static-host copy:

- `advanced-topics/index.html`
- `advanced-topics/sections/table-of-contents/index.html`
- `advanced-topics/engineer-level-neural-networks-for-room-correction/index.html`
- `advanced-topics/beginner-level-what-spatial-audio-is/index.html`

Operational result:

- keep the current `ohmic-audio-static-content` `advanced-topics/*` pages as canonical
- no page promotion from app history was needed for this bucket
- quality follow-up still remains outside parity: `9` `advanced-topics/*` pages include page-local `<style>` blocks and should stay on the quality-audit track

### `competition` bucket (2026-03-14)

- canonical source: `B:\ohmic\repos\ohmic-audio-static-content\public\competition`
- historical app-side comparison source: `ohmic-audio-labs` Git `HEAD` under `public/competition/*`
- current `ohmic-audio-labs` worktree no longer contains `public/competition`, so reconciliation for this bucket was also a canonical-decision pass rather than a file-copy pass
- compared files in bucket: `19`
- historical app-side files still using `https://ohmicaudio.netlify.app`: `19`
- static-host files still using `https://ohmicaudio.netlify.app`: `0`
- static-host files longer than the historical app-side versions: `19`
- static-host files with more explicit `<section>` structure than the historical app-side versions: `0`
- files that match exactly after host normalization and line-ending trim: `19`

Representative files that favored keeping the static-host copy:

- `competition/index.html`
- `competition/competition-day-procedures/index.html`
- `competition/sections/13-1-spl-competition-engineering/index.html`
- `competition/sections/13-2-sound-quality-competition-strategy/index.html`

Operational result:

- keep the current `ohmic-audio-static-content` `competition/*` pages as canonical
- no page promotion from app history was needed for this bucket
- quality follow-up still remains outside parity: `5` `competition/*` pages include visual placeholders and should stay on the quality-audit track
