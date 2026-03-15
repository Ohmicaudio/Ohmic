Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

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
