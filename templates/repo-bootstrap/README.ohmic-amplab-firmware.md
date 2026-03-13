# AmpLab Firmware

AmpLab device firmware and the pilot Ohmic DSP/control contract runtime.

This repo is the first clean firmware home for the AmpLab device family. It keeps AmpLab-specific hardware/runtime glue together with the DSP transport/state layer that is currently proving out the canonical Ohmic device contract.

## Current Role

This firmware owns:

- AmpLab platform bring-up
- DSP transport and state normalization
- local display/runtime surfaces
- remote DSP control UI
- schema-backed control and telemetry surfaces

This repo is intentionally AmpLab-shaped today, but it should keep the contract-facing pieces reusable enough for later device families.

## Internal Shape

### Runtime entrypoint

- `src/main.cpp`
- `src/MODULE_MAP.md`

### DSP layer

- `src/dsp/`

Responsibilities:

- WebSocket transport
- DSP state normalization
- contract-aligned control and telemetry flow

### AmpLab-specific platform glue

- `src/platform/amplab/`

Responsibilities:

- hardware profile
- DSP program/loader specifics
- board/device-specific runtime details

### Local display/runtime

- `src/platform/display/`
- `src/ui/local/`

### Remote DSP UI

- `src/ui/remote/`

### Embedded web/runtime payloads

- `src/runtime/web/`

## Build

Primary target today:

```bash
pio run -e esp32s3
```

## Important Docs

- `docs/ohmic-firmware-handoff/`
- `docs/PINOUT_CANONICAL_V1.md`
- `schemas/`
- `sigmastudio/`

## Migration Rule

Do not migrate the whole dirty source repo as-is.

Start from the clean import surface only:

- live `src/` modules
- live `include/` files
- `schemas/`
- `sigmastudio/`
- current contract/device docs

Leave local build junk, dead headers, and archive/reference noise behind unless deliberately harvested later.
