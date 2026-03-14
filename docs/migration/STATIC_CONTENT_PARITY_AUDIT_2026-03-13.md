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

## Operational Conclusion

Treat the migration state as:

- transfer complete by path
- migration incomplete by content parity

That means the next safe step is reconciliation, not prune.

## Next Move

1. decide which side is canonical for the shared static pages
2. reconcile the differing content into `ohmic-audio-static-content`
3. verify app/runtime links against the reconciled static host
4. only then remove the duplicated app-side `public` surface
