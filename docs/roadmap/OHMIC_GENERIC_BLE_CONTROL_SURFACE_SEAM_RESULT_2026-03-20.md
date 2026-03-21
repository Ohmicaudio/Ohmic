## OHMIC Generic BLE Control Surface Seam Result

Date: 2026-03-20

Summary:
- introduced a generic `OhmicLinkBleControlSurface` wrapper in the app
- switched `MobileLab` to consume the generic surface instead of importing `AmpLabBleTestSuite` directly
- added focused coverage so the generic seam is exercised in tests

Repos:
- `ohmic-audio-labs`
- `ohmic`

Why this mattered:
- the current BLE control UI still works, but its legacy `AmpLab*` naming encourages new work to pile onto the old proving harness
- creating a generic seam lets the app move forward under the correct product name without forcing a risky full rename in one pass

Implementation notes:
- exported `AmpLabBleTestSuiteProps`
- added [`OhmicLinkBleControlSurface.tsx`](/mnt/b/ohmic/repos/ohmic-audio-labs/components/Mobile/OhmicLinkBleControlSurface.tsx)
- updated [`MobileLab.tsx`](/mnt/b/ohmic/repos/ohmic-audio-labs/components/Mobile/MobileLab.tsx) to use the generic control surface for both onboarding and full mode
- added [`OhmicLinkBleControlSurface.test.tsx`](/mnt/b/ohmic/repos/ohmic-audio-labs/test/components/OhmicLinkBleControlSurface.test.tsx)

Validation:
- focused Vitest:
  - `test/components/AmpLabBleTestSuite.test.tsx`
  - `test/components/OhmicLinkBleControlSurface.test.tsx`
- `npm run type-check`

Result:
- the app now has a stable generic entry point for BLE control work
- future cleanup can move behavior behind the generic Ohmic-link surface instead of expanding the legacy AmpLab-named import path
