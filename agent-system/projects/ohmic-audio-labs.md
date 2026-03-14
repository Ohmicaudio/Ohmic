scope: project
horizon: mid
authority: working
project: ohmic-audio-labs
topic: overlay
updated: 2026-03-14

# ohmic-audio-labs

## Identity

Primary product repo spanning the main web/app/backend platform plus related schemas, docs, and support tooling.

## Working Location

- active local repo home: `B:\ohmic\repos\ohmic-audio-labs`
- active work should happen from: `B:\ohmic\repos\ohmic-audio-labs`

## Current Truth

- static content and content-work archives were recently cleaned and documented
- local backend uses SQLite and file-backed stores for current development workflows
- this repo is in active preserve-history migration rather than ordinary isolated maintenance
- `public/` remains transitional while ownership shifts to `ohmic-audio-static-content`
- the repo is still dirty and should be treated carefully during moves or cleanup
- no other local path should be used as the active work root

## First Read

- `B:\ohmic\repos\ohmic-audio-labs\AGENTS.md`
- `B:\ohmic\repos\ohmic-audio-labs\docs\AGENT_CONTEXT.md`
- `B:\ohmic\repos\ohmic-audio-labs\docs\specs\SHIP_EXECUTION_QUEUE.md`
- `B:\ohmic\repos\ohmic-audio-labs\docs\specs\BACKEND_SERVING_STACK.md`
- `B:\ohmic\repos\ohmic-audio-labs\services\backend\README.md`

## Current Next Move

- keep the migration boundary explicit: runtime/backend/contracts stay here, while static content moves out and firmware stays in its own repos
