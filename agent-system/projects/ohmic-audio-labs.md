scope: project
horizon: mid
authority: working
project: ohmic-audio-labs
topic: overlay
updated: 2026-03-13

# ohmic-audio-labs

## Identity

Primary product repo spanning the main web/app/backend platform plus related schemas, docs, and support tooling.

## Working Location

- migration target repo: `B:\ohmic\repos\ohmic-audio-labs`
- legacy/source working copy still exists at: `A:\ohmic-audio-labs`

## Current Truth

- static content and content-work archives were recently cleaned and documented
- local backend uses SQLite and file-backed stores for current development workflows
- this repo is in active preserve-history migration rather than ordinary isolated maintenance
- `public/` remains transitional while ownership shifts to `ohmic-audio-static-content`
- the repo is still dirty and should be treated carefully during moves or cleanup
- repo-local bridge file exists in both the legacy copy and the migrated mirror

## First Read

- `A:\ohmic-audio-labs\AGENTS.md`
- `A:\ohmic-audio-labs\docs\AGENT_CONTEXT.md`
- `A:\ohmic-audio-labs\docs\specs\SHIP_EXECUTION_QUEUE.md`
- `A:\ohmic-audio-labs\docs\specs\BACKEND_SERVING_STACK.md`
- `A:\ohmic-audio-labs\services\backend\README.md`

## Current Next Move

- keep the migration boundary explicit: runtime/backend/contracts stay here, while static content moves out and firmware stays in its own repos
