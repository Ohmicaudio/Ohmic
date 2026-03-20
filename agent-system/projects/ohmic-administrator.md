scope: project
horizon: mid
authority: working
project: ohmic-administrator
topic: overlay
updated: 2026-03-20

# ohmic-administrator

## Identity

Operator desk, intake routing, queue execution, and business-ops control surface
for the broader Ohmic system.

## Working Location

- live GitHub remote: `Ohmicaudio/ohmic-administrator`
- active local repo home: `B:\ohmic\repos\ohmic-administrator`
- active work should happen from: `B:\ohmic\repos\ohmic-administrator`

## Current Truth

- this repo is the extracted administrator product and is now the real work
  surface for queue, runtime, intake, approvals, and business-ops workflow
- `Administrator` and `Business Ops` are separate top-level workspaces on
  purpose; do not collapse business flows back into the control desk
- the project board and queue flow are now part of the product itself, not just
  an external habit
- cross-project docs, launch reviews, migration notes, and repo-boundary rules
  still belong in `B:\ohmic\docs`, not inside this product repo

## First Read

- `B:\ohmic\repos\ohmic-administrator\AGENTS.md`
- `B:\ohmic\repos\ohmic-administrator\README.md`
- `B:\ohmic\docs\migration\OHMIC_ADMINISTRATOR_PRODUCT_EXTRACTION_EXECUTION_PLAN_2026-03-18.md`
- latest relevant launch/roadmap note under `B:\ohmic\docs\roadmap\`

## Current Next Move

- harden the board steering and operator workflow enough that packet creation,
  claim, follow-up, and launch-readiness review can happen with minimal manual
  translation
