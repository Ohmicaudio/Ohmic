scope: system
status: proposal_for_review
updated: 2026-03-14
horizon: architecture_foundation

# Ohmic Schema Centralization Proposal

## Objective

Centralize schema ownership before contract drift becomes normal.

This is not about making the tree prettier.

It is about preventing firmware, app, handheld, and future hardware work from
silently diverging on the data language that ties the ecosystem together.

## Current Truth

Right now the same schema family exists in multiple active repos:

- `B:\ohmic\repos\ohmic-audio-labs\schemas`
- `B:\ohmic\repos\amplab-firmware\schemas`
- `B:\ohmic\repos\cyd-remote\schemas`

Those trees are currently in parity, which is good.

That parity is also fragile.

If schema changes begin landing in more than one place without a hard ownership
rule, contract drift will become one of the most expensive failure modes in the
system.

## Why This Matters

The schema layer is the protocol layer for:

- app/runtime state
- DSP transport
- measurement ingest and analysis
- device registry and access policy
- saved project formats
- future hardware and service interoperability

If this layer drifts, all of these drift with it:

- validation
- tests
- firmware behavior
- handheld behavior
- saved files
- examples and docs

## Decision Proposal

### Future-State Target

Create a dedicated repo:

- `Ohmicaudio/ohmic-schemas`

This should become the canonical home for:

- schema files
- example payloads
- contract manifest
- contract tests
- version history
- publishing rules

### Immediate Rule Until That Repo Exists

Treat:

- `B:\ohmic\repos\ohmic-audio-labs\schemas`

as the authoritative authoring source.

Treat these as mirrored consumer copies:

- `B:\ohmic\repos\amplab-firmware\schemas`
- `B:\ohmic\repos\cyd-remote\schemas`

Treat these as documentation mirrors only, not editable source:

- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\schemas`

## Why `ohmic-audio-labs` Is The Temporary Canonical Source

- it is the software center of gravity
- it already carries schema-aware runtime and test surfaces
- software completion remains the top business priority
- firmware and handheld are consumers of the shared contracts, not the only
  owners of them

This is a temporary operational rule, not the final architecture.

The final architecture is still a dedicated schema repo.

## Contract Families Covered

The centralized schema layer should include at minimum:

- `amplab.data`
- `dsp.firmware.transport`
- `measurement.ingest`
- `measurement.analysis`
- `design.tool-state`
- `bassbuilder.project`
- `osm.project`
- `ohmic.access.policy`
- `ohmic.auth.revocations`
- `ohmic.device.registry`
- `auth/ohmic.session-token.claims`

## Change-Control Rule

No schema change should be considered complete unless it includes:

1. schema update in the canonical source
2. example payload update if applicable
3. `contracts.manifest.v1.json` update if applicable
4. consumer mirror sync into firmware and handheld repos
5. parity verification against the mirrors
6. note of any breaking-change impact

## Versioning Rule

Follow these rules:

- additive changes can stay within the current major line
- breaking contract changes require a new schema version
- examples must track the version they demonstrate
- manifests must describe the real supported contract family, not the intended
  family

Do not reuse old filenames for new semantics.

## Ownership Rule

Ownership should be explicit by layer:

- platform and persistence semantics: `ohmic-audio-labs`
- firmware transport semantics: reviewed with `amplab-firmware`
- handheld consumption and UI implications: reviewed with `cyd-remote`
- future hardware interface implications: reviewed with `hardware-specs` as
  needed

But the file authority should still stay in one canonical schema source, not
scatter back out by repo.

## Publication Target

`ohmic-schemas` should eventually publish:

- raw JSON schemas
- example payload bundle
- manifest bundle
- changelog
- optional package artifacts for TS/runtime validation use

## Migration Path

### Phase 0: now

- keep schema edits centralized in `ohmic-audio-labs`
- mirror outward to firmware and handheld
- forbid direct drift edits in mirrored copies

### Phase 1: after current software completion pressure drops

- create `Ohmicaudio/ohmic-schemas`
- move canonical schema family there
- keep consumer mirrors only where local tests/builds require them

### Phase 2: mature publication

- add automated parity checks
- add publish/update workflow
- make schema consumers pull from the dedicated source with less manual copying

## Not A Priority Right This Second

Creating `ohmic-schemas` is important.

It is not more urgent than current software/content completion.

The immediate win is governance:

- one source
- no drift
- clear future destination

That gives the benefit now without turning this into another live migration
before the current wave is complete.

## Recommendation

Approve this as the schema-governance direction:

- temporary canonical source: `ohmic-audio-labs/schemas`
- consumer mirrors: firmware and handheld
- future dedicated repo: `ohmic-schemas`

That keeps today stable while protecting tomorrow's implementation path.
