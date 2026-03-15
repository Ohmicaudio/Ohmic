# Ohmic Audio Labs Nonproduct Dirty Domain Classification

Date: 2026-03-15
Project: ohmic-audio-labs

## Purpose

Classify the broad nonproduct dirt in `B:\ohmic\repos\ohmic-audio-labs` so
product execution lanes stop competing with ambient churn in `public`, `docs`,
`archive`, and `android`.

## Current Snapshot

From `git status --short -- public docs archive android`:

- `public` -> `594` entries, all deletions
- `docs` -> `74` entries
  - `62` modified
  - `2` deleted
  - `10` untracked
- `archive` -> `3` entries
  - `1` modified
  - `2` untracked
- `android` -> no current tracked dirt surfaced by that status slice

## Classification

### `public/*`

Classification: `normalize`

Reason:

- the entire domain is sitting in a mass deletion wave
- this is consistent with the already-started app-side static payload removal
- it is too large to treat as incidental local dirt, but it is also not a live
  product feature lane

Rule:

- no ad hoc `public/*` edits
- only grouped prune/reconcile packets should touch it

Next safe grouped task:

- reconcile the current deletion set against the app-owned keepers and the
  already-migrated static host boundary, then stage one deliberate prune packet

### `docs/*`

Classification: `normalize`

Reason:

- docs are broad and actively drifting, but the current wave is too wide to
  treat as one coherent product slice
- it mixes operational truth, architecture specs, and backlog-style changes

Rule:

- stop letting docs absorb ambient edits while product work is in flight
- only grouped documentation packets should stage this domain

Next safe grouped task:

- run a docs truth sweep that separates active canonical docs from speculative
  or backlog-heavy spec churn, then stage one bounded normalization packet

### `archive/*`

Classification: `freeze`

Reason:

- archive is not a product execution surface
- the current dirt is small, legacy-facing, and easy to let drift forever if it
  is not explicitly fenced

Rule:

- no casual edits inside `archive/*`
- only explicit salvage, relocation, or quarantine tasks should reopen it

Next safe grouped task:

- package the current legacy prototype edit plus the untracked artifact/temp
  folders into one archive quarantine decision

### `android/*`

Classification: `freeze`

Reason:

- there is no meaningful active dirt in this slice right now
- reopening it without a dedicated packet would just reintroduce broad tracked
  file noise

Rule:

- keep `android/*` closed until there is a dedicated normalization or product
  packet for it

Next safe grouped task:

- resume the dedicated Android tracked-file normalization sweep only when the
  Android lane is intentionally reopened

## Operational Boundary

The nonproduct domains above should not compete with the active product lanes:

- browser shell and device-link regression work
- backend chirp/bootstrap work
- OSM/design sandbox regrouping

Those product lanes should stage against their own surfaces while the
nonproduct domains stay fenced behind grouped packets.

## Recommended Order

1. Keep `archive` and `android` frozen.
2. Treat `public` as the first normalization priority because it is the largest
   deletion wave and has the most collision potential.
3. Follow with a grouped `docs` truth sweep once the `public` boundary is
   settled enough not to keep rewriting its supporting docs.
