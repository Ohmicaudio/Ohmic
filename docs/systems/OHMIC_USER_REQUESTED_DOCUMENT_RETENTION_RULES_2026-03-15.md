# Ohmic User-Requested Document Retention Rules

Purpose: give a fast rule for deciding whether a user-requested document should
live in Git, stay local-only, or keep both forms.

## Default Rule

Do not assume every requested document belongs in Git.

Keep the smallest durable version that preserves project truth.

## Keep In Git

Keep the canonical version in Git if the document:

- changes direction
- drives implementation
- affects queue, memory, claims, or handoffs
- defines a reusable system or product rule
- will likely be referenced again by agents or humans

Typical homes:

- `B:\ohmic\docs\*`
- `B:\ohmic\repos\<repo>\docs\*`
- `B:\ohmic\agent-system\requests\*`

## Keep Local-Only

Keep it in `B:\ohmic-local\reports` or `B:\ohmic-local\archive` if it is:

- a one-off explanation
- a disposable delivery copy
- a convenience summary
- a local reference export
- useful to the current user but not part of durable project truth

## Keep Both

Keep both when:

- Git should hold the canonical project version
- and a separate delivery/export copy is convenient locally

Rule:

- Git version = authority
- local-only version = convenience copy

## Fast Decision Test

Ask:

1. Will the next agent or teammate be less safe without this in Git?
2. Does it directly affect product behavior, roadmap truth, or workflow truth?
3. Is it likely to be reused instead of read once and forgotten?

If the answer is mostly `no`, prefer local-only storage.

## Anti-Clutter Rule

Do not keep duplicate report-style copies in Git when:

- the canonical content already exists elsewhere
- the copy is only for delivery or convenience
- the copy does not add new project truth

## Related

- `docs/systems/OHMIC_REPO_STORAGE_BOUNDARY_2026-03-15.md`
