# Ohmic Audio Labs Move Readiness Checklist

Date: 2026-03-13
Source repo: `/mnt/a/ohmic-audio-labs`

## Current state

- Active branch: `measurement/local-input-normalization`
- Upstream: none configured
- Main runtime/code surfaces appear path-portable
- Local junk/artifact surface is still present and should not be carried blindly

## Low-risk prep completed

- `.gitignore` updated to ignore:
  - `.playwright-cli/`
  - `output/`
  - `dev.log`
  - `dev-mobile.log`
  - `content-work.zip`
  - `sigma-flow-xml-skill-v3.zip`
- `.prettierignore` updated to ignore `archive/` in addition to legacy `docs/archive/`

## Pre-move checklist

1. Make one cold backup before any filesystem move.
2. Decide whether the move is:
   - filesystem relocation only
   - or relocation plus Git cleanup
3. Do not assume the current branch is recoverable remotely:
   - `measurement/local-input-normalization` currently has no upstream
4. Treat local artifacts before the move:
   - `output/`
   - `.playwright-cli/`
   - log files
   - zip leftovers
5. Keep the runtime repo focused on app/runtime code, contracts, active docs, and shipped assets.

## Post-move smoke pass

Run these after relocation:

```bash
npm run build
```

Then do:

- one content/static audit pass
- one preview check
- one Android/web shell sanity check if relevant to the move

## Recommendation

Move the repo with a short checklist, not a blind drag-and-drop.
The codebase looks moveable, but the branch/upstream and local-artifact state should be made explicit first.
