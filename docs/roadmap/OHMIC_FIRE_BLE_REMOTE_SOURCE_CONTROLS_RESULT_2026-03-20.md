# OHMIC Fire BLE Remote Source Controls Result

Date: 2026-03-20

## Outcome

The compact Fire BLE onboarding card now exposes direct remote-audio source
selection controls instead of leaving the operator stuck in a status-only view.

## Completed

- compact Fire BLE mode now has a `Remote Audio Source` action block near the top
- direct BLE source controls are available for:
  - `Phone BT`
  - `SD Card`
  - `USB Media`
  - `Refresh Route`
- each source-select action now follows with a `sys.status.core` refresh so the
  card can quickly reflect the updated route state

## Verification

- `npm run type-check`
- `npx vitest run test/services/amplabBleSupport.test.ts test/components/AmpLabControlSurfaces.test.tsx test/services/audioTransport.test.ts`
- `npm run android:sync`
- `gradlew.bat installDebug`

## Next

- use the new compact controls to drive the first real remote-audio source run on
  the Fire without relying on hidden lower-screen controls
