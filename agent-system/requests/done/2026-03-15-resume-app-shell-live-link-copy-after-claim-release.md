Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T224200Z-livedlinkcopy

# Resume App Shell Live Link Copy After Claim Release

## Goal

Return to the app-shell copy harmonization lane once the current worker-owned
claim over the Hardware shell files is released.

## Focus

- remaining shell/test wording drift
- Live Link vs deck vs device naming consistency
- no discovery/link behavior changes

## Acceptance

- the next safe shell-copy slice is resumed without claim collision
- wording becomes more internally consistent across shell and tests

## Result

- resumed the next safe shell-copy harmonization slice with no discovery/link
  behavior changes
- removed remaining `unit` wording drift from the AmpLab deck shell, discovery
  idle copy, and supporting presentation/test strings in the touched slice
- verified the updated shell copy with targeted component tests:
  - `test/components/AmpLabHardwareDeckPanel.test.tsx`
  - `test/components/AmpLabDeckContentHost.test.tsx`
  - `test/components/HardwareLayoutAmpLabShell.test.tsx`
  - `test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`
