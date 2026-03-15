# Ohmic Repo Storage Boundary

Purpose: keep `B:\ohmic` and the repos below it focused on Git-worthy project
truth while pushing local-only clutter into explicit non-repo zones.

## Core Decision

Yes, it is smart to do this before the ecosystem gets further cluttered.

But the right order is:

1. define storage classes
2. define retention rules
3. inventory mixed zones
4. move obvious non-repo material
5. leave real repo/project truth in place

Do not run a blind cleanup sweep first.

## Storage Classes

### 1. Product Repo Truth

Location:

- `B:\ohmic\repos\*`

Allowed:

- product code
- product tests
- product docs that belong with that repo
- repo-local specs and implementation packets that truly guide that repo

Not allowed:

- loose external datasets
- temporary exports
- local-only reports
- copied docs with no ownership
- generated junk that is not intentionally tracked

### 2. Umbrella Coordination Truth

Location:

- `B:\ohmic`

Allowed:

- shared agent system
- cross-repo roadmap docs
- cross-repo architecture notes
- system rules
- queue, memory, claims, and handoff surfaces
- repo-map and migration docs

Not allowed:

- full source trees
- duplicate product docs better owned by a repo
- random local audit exports
- build artifacts
- loose scratch bundles

### 3. Local Import And Junk Storage

Location:

- `B:\junk`

Allowed:

- externally sourced CSV/XLSX/PDF/image drops
- raw datasets not yet normalized
- one-off inbound material that may later feed a productized lane

Rule:

- treat this as source storage, not canonical product truth

### 4. Local-Only Working And Report Storage

Location:

- `B:\ohmic-local\exports`
- `B:\ohmic-local\reports`
- `B:\ohmic-local\working`
- `B:\ohmic-local\archive`

Allowed:

- one-off user-requested reports that do not become project truth
- delivery copies
- local staging bundles
- archival copies kept for reference only

Rule:

- this tree is intentionally outside the Git-centered project truth

## User-Requested Document Retention Rule

Not every document requested in chat should live in Git forever.

Short form:

- `docs/systems/OHMIC_USER_REQUESTED_DOCUMENT_RETENTION_RULES_2026-03-15.md`

### Keep In Git

Keep the canonical version in Git when the document:

- changes project direction
- drives implementation
- becomes part of the queue or handoff system
- defines a reusable standard
- is likely to be referenced again by agents or humans

Typical homes:

- product repo `docs/`
- umbrella `docs/`
- shared request/roadmap/system docs

### Keep Local-Only

Keep it in `B:\ohmic-local\reports` or `B:\ohmic-local\archive` when the
document is:

- a one-off explanation
- a disposable audit delivery copy
- a local reference export
- a convenience summary that does not change system or product truth

### Keep Both

Use both when:

- a canonical project version belongs in Git
- and a handoff/export copy is useful outside Git

In that case:

- Git holds the authoritative version
- `ohmic-local` holds the delivery copy if needed

## Practical Sorting Rule

When deciding whether a file belongs in Git:

Ask:

1. Does this file affect active work, product behavior, queue truth, or future
   decisions?
2. Would losing it from Git make the next agent dumber or less safe?
3. Is this file actually owned by a repo or by the shared system?

If the answer is `no`, it probably does not belong in Git.

## Recommended Immediate Sweep Order

1. inventory non-repo docs and artifact zones under `B:\ohmic`
2. identify obvious local-only folders/files
3. move local-only material into `B:\ohmic-local\*` or `B:\junk`
4. leave repo-owned docs in place
5. only then decide whether any duplicate docs should be deleted

## Hard Guardrails

- never move files out of a product repo just because they are ugly
- never move shared queue/memory/system docs out of `B:\ohmic`
- do not delete a user-requested document until its canonical replacement is
  obvious
- prefer moving obvious local-only clutter first, not reclassifying active
  product truth
