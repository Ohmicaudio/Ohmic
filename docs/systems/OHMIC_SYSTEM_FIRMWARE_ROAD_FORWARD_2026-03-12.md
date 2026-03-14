# Ohmic System Firmware Road Forward

Date: 2026-03-12

## Purpose

Capture the current reality across:

- `B:\ohmic\repos\cyd-remote`
- `B:\ohmic\repos\amplab-firmware`
- `B:\ohmic\repos\ohmic-audio-labs`

and define the next firmware-focused execution order.

Legacy/source-only copies are not active work roots. Active work should stay in `B:\ohmic\repos\*`.

This note is meant to stop the DSP/control/measurement architecture from drifting back into chat-only decisions.

## New Decisions To Carry Forward

These decisions were made after the initial pass and should now be treated as part of the working direction:

- `AmpLab` is the pilot contract, not the permanent brand shape of the whole platform.
- app/runtime surfaces should ask for capability and state; they should not assume hidden firmware details
- firmware should answer discovery, capability, state, stream, and command requests explicitly
- long-window captures should prefer SD-backed artifacts and references over fragile live transfer paths
- the handheld is one consumer of the contract; future shared-core mini apps are another
- the contract should be designed so web, Android, handheld, and later helper tools can all consume the same intent model

## What Is Stable Now

### CYD handheld

The handheld UI is finally in a stable enough state to build on:

- display path is working
- flashing path is repeatable
- canonical page ring is usable
- utility screens are no longer the primary blocker

This means the handheld is no longer the architectural bottleneck.

### Ohmic app-side DSP contract

`ohmic-audio-labs` already contains the right contract direction:

- transport schema:
  - `schemas/dsp.firmware.transport.v1.schema.json`
- typed app-side contract:
  - `services/hardware/dsp/firmwareContract.ts`
- graph surface manifest:
  - `services/hardware/dsp/graphSurfaceManifest.ts`
- remote controller handoff:
  - `docs/specs/dsp-ui/2026-03-11-remote-display-controller-handoff.md`
- contract-driven UI generation direction:
  - `docs/specs/ui-runtime/2026-03-11-ai-ui-generation-framework.md`

The design intent is correct:

- UI binds to named contract targets
- transport is not the UI contract
- graph/profile/capabilities decide what renders

### Ohmic backend measurement stack

`ohmic-audio-labs` already has real backend pieces for measurement workflows:

- measurement envelope normalization:
  - `services/measurementIngest.ts`
- WS hub / session relay:
  - `services/backend/src/wsHub.ts`
- raw capture storage:
  - `services/backend/src/measurementCaptureStore.ts`
- reference chirp analysis:
  - `services/backend/src/measurementReferenceAnalyzer.ts`

So the platform already has meaningful ingest/storage/analysis plumbing.

### Shared app surface direction

The same contract direction can support:

- the CYD handheld
- the main web/Android runtime
- later thin Android mini apps

Those mini apps should not become separate firmware stacks. They should be small consumers of the same shared contract/core logic:

- wiring / impedance helpers
- box and port calculators
- gain / power calculators
- RTA-lite / signal tools
- small measurement or setup utilities

That is a later packaging strategy, not a reason to fork the contract now.

## Important Current Reality

### A large amount of the DSP work in `ohmic-audio-labs` is currently untracked

Relevant untracked files include:

- `docs/specs/DSP_FIRMWARE_*`
- `docs/specs/DSP_MEASUREMENT_AND_GENERATOR_JOBS.md`
- `docs/specs/dsp-ui/*`
- `docs/specs/ui-runtime/*`
- `schemas/dsp.firmware.transport.v1.schema.json`
- `schemas/examples/dsp.firmware.*`
- `services/hardware/dsp/firmwareContract.ts`
- `services/hardware/dsp/graphSurfaceManifest.ts`

That is the most serious documentation/process risk right now.

The architecture exists, but too much of the DSP/remote-control truth is not yet safely promoted into the tracked source of truth.

## What `masterfirmware` Actually Implements Today

### Good news

`masterfirmware` contains a real first slice, not just aspirational docs.

There is a concrete live measurement control slice in:

- `sigmastudio/master-2in-4out-measurement/FIRST_CONTROL_SLICE.md`

This first slice exposes 16 real control bindings, mainly:

- path inject gains
- selector stage gains
- path gains
- path mutes
- branch mix controls

There is also supporting Sigma extraction tooling in:

- `sigmastudio/tools/extract_adau1701_control_manifest.py`
- `sigmastudio/tools/query_dsp_contract.py`

### Less good news

The current remote implementation is only a thin ad hoc bridge:

- `src/dsp_state.hpp`
- `src/dsp_state.cpp`
- `src/ui_remote.cpp`

It is useful, but it is not yet fully aligned with the canonical app-side contract.

## Confirmed Mismatches And Risks

### 1. Transport/client drift inside `masterfirmware`

`src/main.cpp` calls:

- `ws_client_loop()`

but the transport header exports:

- `ws_client_update()`

from `src/ws_client.hpp`

That is a direct implementation mismatch.

### 2. Message handler signature drift

`src/main.cpp` forward-declares/stubs:

- `dsp_state_on_message(const String&, const JsonObject&)`

while the actual DSP state API expects:

- `dsp_state_on_message(const char* json, size_t len)`

from `src/dsp_state.hpp`

This indicates the live `masterfirmware` remote path still needs cleanup/hardening before it becomes the foundation for the handheld.

### 3. FFT event field mismatch

App-side canonical contract expects:

- `measure.fft.frame.body.bins_db`

Current `masterfirmware/src/dsp_state.cpp` parses:

- `body["bins"]`

That is a direct contract mismatch.

### 4. The current remote UI is still only the measurement-first slice

The current remote/controller reality in `masterfirmware` is measurement-focused, not general DSP editing:

- the graph manifest is measurement-oriented
- first writable controls are the measurement slice
- generator/filter/tap/full-DSP editing is still intentionally deferred

### 5. Untracked DSP docs and schemas are ahead of tracked reality

The most coherent DSP architecture now lives in untracked Ohmic docs and schemas, while `masterfirmware` is still a narrower prototype implementation.

That means the design is ahead of the code, but the design truth is not fully protected yet.

## What This Means

### For the handheld

The handheld does **not** need a local translator for the current Ohmic path.

For Ohmic-native firmware:

- handheld -> canonical API/contract topics

is enough.

A translator becomes important later when:

- one handheld must control non-Ohmic DSPs
- USB/BLE/helper bridges need device-specific mapping
- multiple DSP families expose different native parameter models

### For the wider system

The next correct move is **not** more random UI surface growth.

The next correct move is:

1. promote the current DSP contract work into tracked source of truth
2. clean the `masterfirmware` transport/state implementation to match it
3. build new DSP UI against that cleaned contract

That also means documenting the firmware surfaces honestly:

- what is implemented
- what is capability-gated
- what is stubbed
- what is legacy compatibility only
- what is planned but not yet real

## Recommended Execution Order

### Phase 0 — Freeze Working Handheld Baseline

Keep `cyd_remote` as the stable handheld UI baseline.

Do not let display/input stability work get mixed back into backend contract cleanup.

### Phase 1 — Promote The DSP Contract To Tracked Source Of Truth

In `ohmic-audio-labs`, promote the untracked DSP files into tracked canonical status:

- `docs/specs/DSP_FIRMWARE_OBJECT_MODEL.md`
- `docs/specs/DSP_FIRMWARE_TRANSPORT_AND_CAPABILITIES.md`
- `docs/specs/DSP_FIRMWARE_APPLY_AND_PRESET_STATE_MACHINE.md`
- `docs/specs/DSP_MEASUREMENT_AND_GENERATOR_JOBS.md`
- `schemas/dsp.firmware.transport.v1.schema.json`
- `services/hardware/dsp/firmwareContract.ts`
- `services/hardware/dsp/graphSurfaceManifest.ts`

This is the highest leverage documentation/task-management move.

### Phase 2 — Clean `masterfirmware` To Match The Contract

Bring the prototype into line with the canonical DSP contract:

- fix transport loop naming/runtime wiring
- fix DSP state callback signature mismatch
- emit/parse `bins_db`, not `bins`
- keep the first measurement control slice, but make it schema-clean
- document any intentionally unsupported topics as stubs or capability-gated
- document the request/reply/stream behavior so consumers know what must be polled, requested, or subscribed

Deliverable:

- one honest firmware node that answers the canonical topics cleanly

### Phase 3 — Lock The First Real Firmware Scope

The first real supported firmware scope should be:

- `sys.info`
- `sys.capabilities`
- `dsp.state.live`
- `dsp.state.staged`
- `dsp.param.stage`
- `dsp.apply`
- `measure.fft.frame`
- `measure.job.create` for `fft_stream`

And the interaction model should be explicit:

- app asks `who are you`
- firmware returns identity and version
- app asks `what can you do`
- firmware returns capabilities and supported topics/jobs
- app asks for current state or starts a stream
- firmware returns only the requested state/stream payloads
- app sends intent commands when it wants a change
- firmware acknowledges acceptance/rejection deterministically

Do not normalize around unsolicited firehose behavior as the primary contract.

Optional next step after that:

- `measure.capture.chunk`
- `measure.capture.complete`
- one generator job such as chirp or pink noise

For longer runs:

- preview and low-rate summaries can stay live over WS/BLE
- raw windows, captures, logs, and larger artifacts should prefer SD-backed references/manifests
- clients should retrieve artifacts by reference instead of assuming continuous live transfer

Do **not** try to ship full filter/tap/generator/editor semantics first.

### Phase 4 — Build Handheld Screens Against The Clean Contract

Once the contract is stable, the handheld roadmap becomes straightforward:

- `Control`
  - volume / mute / sub / quick actions
- `Info`
  - link health / volts / amps / temps / status
- `RTA`
  - live FFT / analyzer / scope-style visuals
- `DSP`
  - first contract-backed control slice only

First `DSP` screen should expose only real mapped controls, not aspirational editing.

### Phase 5 — Add Translator Layer Only When It Actually Matters

Add a translator layer when the handheld needs to control:

- non-Ohmic DSP units
- USB/HID/bridge-only devices
- alternate DSP families with different control models

Until then:

- intent/API contract is enough

## Short Firmware Road Forward

If work starts immediately, the next firmware-focused tasks should be:

1. Audit and promote untracked Ohmic DSP docs/schemas into tracked source control.
2. Normalize `masterfirmware` transport/state code to the contract.
3. Make `measure.fft.frame` canonical (`bins_db`).
4. Document the firmware node contract and device-web/API behavior alongside the code.
5. Keep the first DSP UI surface limited to the 16-control measurement slice.
6. Add measurement job support before deep DSP editing.
7. Only after that, expand into generator/filter/tap semantics.

## Bottom Line

The handheld is finally stable enough.

The system bottleneck is now:

- contract promotion
- backend normalization
- firmware hardening

not display plumbing.

That is the correct place to spend the next serious engineering pass.
