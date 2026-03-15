# Ohmic Non-Repo Doc And Artifact Zone Inventory

Purpose: inventory top-level zones under `B:\ohmic` that are not the shared
system core or product repos, so later cleanup can move clutter deliberately
instead of by guesswork.

## Summary

This pass found five notable non-core zones under `B:\ohmic`:

1. `B:\ohmic\harvest`
2. `B:\ohmic\manifests`
3. `B:\ohmic\templates`
4. `B:\ohmic\ohmic-audio-universe`
5. `B:\ohmic\ohmic-audio-universe-db-reference`

Each zone is tagged below as `keep`, `migrate`, or `review`.

## Zone Decisions

### Keep

#### `B:\ohmic\manifests`

Reason:

- small, explicit shared metadata surface
- contains repo/app/device/import manifests
- belongs with umbrella coordination truth rather than a product repo

Observed contents:

- `apps.yaml`
- `contracts.yaml`
- `devices.yaml`
- `repos.yaml`
- `surfaces.yaml`
- `import-surfaces/*.yaml`

Action:

- keep in `B:\ohmic`
- treat as shared-system support truth

#### `B:\ohmic\templates`

Reason:

- small reusable bootstrap assets
- supports repo setup and shared conventions
- not local clutter

Observed contents:

- `templates/repo-bootstrap/README.ohmic-*.md`
- `templates/repo-bootstrap/gitignore.firmware`

Action:

- keep in `B:\ohmic`
- treat as reusable shared scaffolding

### Review

#### `B:\ohmic\harvest`

Reason:

- currently empty at the top level during this pass
- directory name implies import or capture staging rather than durable repo truth
- could become a valid shared intake zone, but should not silently turn into a
  junk drawer

Action:

- review before using heavily
- if it becomes raw intake storage, either:
  - keep it as a governed shared intake surface, or
  - migrate that role to `B:\junk` / `B:\ohmic-local`

#### `B:\ohmic\ohmic-audio-universe`

Reason:

- contains its own `.git` and behaves like a standalone sidecar repo
- currently lives outside `B:\ohmic\repos\*`, which breaks the intended storage boundary
- includes repo-like structure plus local-weight indicators such as `node_modules`

Observed signals:

- `.git/`
- `.github/`
- `.husky/`
- `README.md`
- `agents/`
- `architecture/`
- `captures/`
- `knowledge/`
- `migration/`
- `node_modules/`
- `packages/`

Action:

- review as a priority migration candidate
- likely end state should be one of:
  - move under `B:\ohmic\repos\*` if it is a real repo worth keeping, or
  - move to `B:\ohmic-local\archive` / `B:\junk` if it is reference or abandoned side work

#### `B:\ohmic\ohmic-audio-universe-db-reference`

Reason:

- looks like a reference-only support tree rather than active repo truth
- currently outside both `repos` and `junk`
- likely useful, but not clearly owned yet

Observed signals:

- `software/`
- `tools/`

Action:

- review for ownership and retention
- likely destination is:
  - `B:\junk` if it is raw reference material, or
  - `B:\ohmic-local\archive` if it is local-only curated reference

### Migrate

No immediate top-level migrations are required from this inventory alone.

The main outcome is identifying `ohmic-audio-universe` and
`ohmic-audio-universe-db-reference` as the highest-value review targets before a
larger cleanup sweep.

## Recommended Next Order

1. define user-requested document retention rules
2. define the non-repo storage migration packet
3. review `ohmic-audio-universe` ownership and intended future
4. review `ohmic-audio-universe-db-reference` retention value
5. only then move any large sidecar trees

## Guardrails

- do not move shared manifests or templates out of `B:\ohmic`
- do not move sidecar repo trees blindly just because they are outside `repos`
- do not mix raw imports, archived reference, and active repo truth in one move
- prefer classifying ownership first, then relocating
