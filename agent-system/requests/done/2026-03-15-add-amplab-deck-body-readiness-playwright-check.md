Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T215000Z-amplabdeck

# Add AmpLab Deck Body Readiness Playwright Check

## Goal

Extend the local AmpLab browser shell smoke one rung deeper so the deck body
itself is proven ready in the Playwright harness.

## Source

- `docs/roadmap/OHMIC_AMPLAB_BROWSER_SHELL_PLAYWRIGHT_SMOKE_2026-03-15.md`
- `agent-system/requests/ready/2026-03-15-verify-browser-ui-live-amplab-link-flow.md`

## Focus

- one stable selector inside the loaded AmpLab deck body
- browser deck readiness without live device dependency
- clear separation from the later live browser link flow

## Acceptance

- one Playwright check proves the deck body is actually ready, not just shell chrome
- it stays below live discovery/link execution

## Result

- the AmpLab browser shell smoke now waits for real deck-body controls
  instead of stopping at shell chrome
- readiness is proven by the deck-local controls:
  - `Refresh Units`
  - `Signal Snapshot`
- the check uses a longer readiness timeout so lazy deck loading is measured
  honestly instead of failing on the first import lag

## Verification

- `npm run test:e2e -- e2e/amplab-shell.spec.ts`
