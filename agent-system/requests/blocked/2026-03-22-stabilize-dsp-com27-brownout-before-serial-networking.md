# Stabilize DSP COM27 Brownout Before Serial Networking

## Why Blocked
- The new backend DSP serial operator path is live and tested.
- A live serial route probe against `COM27` returned repeated `BROWNOUT_RST` boot diagnostics instead of a transport reply.
- Until the DSP is stable enough to stay booted, network join/target setup cannot be completed over serial.

## Evidence
- Result docs:
  - `docs/roadmap/OHMIC_DSP_SERIAL_OPERATOR_PATH_RESULT_2026-03-22.md`
  - `docs/roadmap/OHMIC_DSP_COM27_BROWNOUT_RESULT_2026-03-22.md`

## Next Action
- Check DSP power/USB stability and rerun the backend serial status probe on `COM27`
