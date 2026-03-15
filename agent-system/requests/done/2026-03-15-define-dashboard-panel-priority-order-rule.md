Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T141340Z-20c3433e

# Define Dashboard Panel Priority Order Rule

## Goal

Define which dashboard panels should remain visually dominant when the surface
is crowded or viewed on smaller layouts.

## Focus

- priority order of session, health, action, input, and output panels
- what may collapse first on tighter surfaces
- preserving the most useful information first

## Acceptance

- one bounded panel-priority packet exists
- it matches the existing dashboard surface and card rules
- it stays lightweight and contract-focused

## Outcome

Completed on 2026-03-15.

Result:

- fixed a clear panel priority order for crowded and small layouts
- defined collapse order for output and command surfaces before core trust cards
- added an alert override rule so blockers/risk can rise above routine current action when needed

## Artifact

- `docs/systems/OHMIC_DASHBOARD_PANEL_PRIORITY_ORDER_RULE_2026-03-15.md`
