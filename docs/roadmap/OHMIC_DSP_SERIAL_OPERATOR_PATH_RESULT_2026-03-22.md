# OHMIC DSP Serial Operator Path Result 2026-03-22

## Summary
- Added a backend DSP serial operator path that uses the same Windows serial helper flow as the bridge.
- Kept the bridge path on a shared transport-serial helper instead of leaving two unrelated serial stacks in the backend.
- Verified focused tests and backend type-check after the refactor.

## Code Landed
- `ohmic-audio-labs`
  - `services/backend/src/transportSerialControl.ts`
  - `services/backend/src/bridgeSerialControl.ts`
  - `services/backend/src/dspSerialControl.ts`
  - `services/backend/src/index.ts`
  - `services/backend/tools/transport-serial-command.ps1`
  - `test/backend/transportSerialControl.test.ts`
  - `test/backend/bridgeSerialControl.test.ts`
  - `test/backend/dspSerialControl.test.ts`

## Backend Contract
- New DSP serial routes:
  - `GET /api/dsp/serial/status?port=COM27`
  - `POST /api/dsp/serial/command`
- DSP serial operator route uses `ohmic.dsp.firmware.transport.v1` envelopes and currently targets:
  - `sys.network.status`
  - `sys.network.profiles`
  - `sys.network.scan`
  - `sys.network.connect`
  - `sys.network.profile.select`
  - `sys.network.target.set`
  - `sys.network.ap.set`

## Validation
- Focused Vitest pack passed: `13/13`
- `npm run type-check` passed

## Outcome
- Android is no longer required to attempt DSP network bring-up once the DSP is stable on serial.
- The next blocker is no longer operator-path debt. It is DSP hardware/runtime stability on `COM27`.
