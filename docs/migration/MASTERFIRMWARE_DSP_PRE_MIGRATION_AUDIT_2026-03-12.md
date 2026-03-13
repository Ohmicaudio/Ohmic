# Masterfirmware DSP Pre-Migration Audit

Date: 2026-03-12
Status: active cleanup target
Source root: `/mnt/a/masterfirmware`

## Executive Summary

Yes, `masterfirmware` should be cleaned before migration.

The DSP work is still present, but the repo is in a mixed state:

- important DSP transport/state files exist
- important DSP docs and schemas exist
- `main.cpp` is currently badly clobbered
- the remote wiring is inconsistent with the transport/state files
- the repo is dirty enough that a blind repo migration would preserve confusion, not just history

## What Survived

The DSP-side work that matters is still here:

- `/mnt/a/masterfirmware/src/dsp_state.hpp`
- `/mnt/a/masterfirmware/src/dsp_state.cpp`
- `/mnt/a/masterfirmware/src/ws_client.hpp`
- `/mnt/a/masterfirmware/src/ws_client.cpp`
- `/mnt/a/masterfirmware/src/ui_remote.hpp`
- `/mnt/a/masterfirmware/src/ui_remote.cpp`
- `/mnt/a/masterfirmware/docs/ohmic-firmware-handoff/`
- `/mnt/a/masterfirmware/schemas/`
- `/mnt/a/masterfirmware/sigmastudio/`

This means the core DSP contract pilot work was not lost.

## Immediate Problems

### 1. `main.cpp` is clobbered

Current file:

- `/mnt/a/masterfirmware/src/main.cpp`

Observed problems:

- reduced to a drastically simplified boot path
- large original runtime removed
- contains stub functions only
- remote callback signature is wrong
- calls `ws_client_loop()` even though the transport exports `ws_client_update()`

Specific mismatches:

- declares:
  - `void dsp_state_on_message(const String& topic, const JsonObject& body);`
- actual DSP state header exports:
  - `void dsp_state_on_message(const char* json, size_t len);`
- loop calls:
  - `ws_client_loop();`
- actual transport header exports:
  - `void ws_client_update();`

This file should be treated as damaged and repaired before migration.

### 2. FFT payload mismatch still exists

Current docs/schemas expect:

- `measure.fft.frame`
- payload field: `bins_db`

Current parser in:

- `/mnt/a/masterfirmware/src/dsp_state.cpp`

still looks for:

- `body["bins"]`

That mismatch should be normalized before migration so the pilot contract is coherent.

### 3. Repo state is heavily dirty

Current local status includes:

- many modified legacy files
- many deleted schema files
- many untracked schema/doc replacements
- untracked DSP transport/control files

This is exactly the kind of state that needs harvesting and normalization before a clean repo import.

## What This Means

The DSP work is not gone.

But the repo currently mixes:

- old AmpLab/web-display code
- new DSP contract work
- local experimentation
- clobbered integration glue

If migrated as-is, the new repo would inherit ambiguity instead of a clean starting point.

## Pre-Migration Cleanup Target

### Phase 1. Protect the DSP pilot work

Make sure these are explicitly preserved:

- `src/dsp_state.*`
- `src/ws_client.*`
- `src/ui_remote.*`
- `docs/ohmic-firmware-handoff/`
- `schemas/dsp.firmware.transport.v1.schema.json`
- related schema examples
- `sigmastudio/`

### Phase 2. Repair integration glue

Repair `src/main.cpp` so it matches the DSP transport/state layer:

- replace `ws_client_loop()` with `ws_client_update()`
- remove the wrong local `dsp_state_on_message(...)` stub
- use the real callback signature from `dsp_state.hpp`
- call `dsp_state_update()` from the loop
- make startup/query flow consistent with `dsp_state_init()` and `ws_client_set_on_message(...)`

### Phase 3. Normalize the FFT event shape

Make the firmware and docs agree on:

- topic: `measure.fft.frame`
- field: `bins_db`

Do not preserve both `bins` and `bins_db` as drifting aliases unless compatibility requires it intentionally.

### Phase 4. Define what becomes the clean import

Before migration, decide:

- which schemas stay canonical
- which legacy files are archived
- which display/web-only pieces are no longer part of `amplab-firmware`

## Recommendation

Do this before migration:

1. Repair the DSP integration path in `masterfirmware`.
2. Confirm the current control slice works:
   - `sys.info`
   - `sys.capabilities`
   - `dsp.state.live`
   - `dsp.state.staged`
   - `dsp.param.stage`
   - `dsp.apply`
   - `measure.fft.frame`
3. Only then import into `amplab-firmware`.

## Why This Is Worth Doing Now

AmpLab is the pilot contract device family.

That means the cleanup is not just repo hygiene. It is the first chance to lock:

- the discovery model
- the state/stream model
- the command/apply model
- the artifact model

while the system is still flexible enough to change without years of compatibility debt.
