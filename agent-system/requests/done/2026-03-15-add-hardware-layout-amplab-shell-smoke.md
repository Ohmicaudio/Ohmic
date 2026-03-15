Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T202033Z-148ec728

# Add HardwareLayout AmpLab Shell Smoke

## Goal

Add one focused regression check that mounts the AmpLab shell through
`HardwareLayout` without jumping all the way to live browser automation.

## Source

- `docs/roadmap/OHMIC_AMPLAB_DECK_SURFACE_ROUTE_SMOKE_2026-03-15.md`
- `agent-system/requests/ready/2026-03-15-verify-browser-ui-live-amplab-link-flow.md`

## Focus

- full page shell mounting
- AmpLab surface visibility through `HardwareLayout`
- linked-unit and flow state visible through the mounted shell

## Acceptance

- one `HardwareLayout`-level AmpLab shell smoke exists
- it remains a local regression check, not a live browser/device pass

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\repos\ohmic-audio-labs\test\components\HardwareLayoutAmpLabShell.test.tsx`
- `B:\ohmic\docs\roadmap\OHMIC_HARDWARE_LAYOUT_AMPLAB_SHELL_SMOKE_2026-03-15.md`

Result:

- `HardwareLayout` now has a focused AmpLab shell regression check above the
  deck route layer
- the check keeps live device/browser work out of the local regression lane
- linked-unit, flow, and transport copy are now visible through the mounted
  shell path in test
