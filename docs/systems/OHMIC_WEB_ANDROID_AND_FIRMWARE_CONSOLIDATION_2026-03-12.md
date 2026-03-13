# Ohmic Web, Android, and Firmware Consolidation

Date: 2026-03-12
Author: Codex
Scope: `A:\ohmic-audio-labs`, `A:\masterfirmware`, `A:\cyd_remote`

## Executive Summary

No: the useful conclusion is not "the UI wants nothing from firmware."

The correct conclusion is:

- Tier 2/3 static content should want almost nothing from firmware.
- The interactive app and Android shell should want nothing from firmware internals.
- They absolutely do want stable firmware contracts, transport behavior, and configuration APIs.

That is good news. The app is already structured close to the right boundary.

- The website and Android app are mostly the same React runtime.
- Android is primarily a Capacitor shell plus BLE/mobile affordances.
- The hardware surfaces already depend on typed contracts and transport adapters.
- The missing work is contract normalization and system consolidation, not a frontend rewrite.

The newer decisions from follow-up discussion are:

- `AmpLab` should be used as the pilot contract and learning curve while change is still cheap
- future mini apps should be thin consumers of the same shared core, not six independent codebases
- a private company org/context layer is a good idea, but it should not replace canonical source repos
- optional retrieval tooling such as Chroma/docker is useful for awareness and expediency, not as source-of-truth storage

## What I Audited

### App and shell entry points

- [App.tsx](/mnt/a/ohmic-audio-labs/App.tsx)
- [components/Hardware/HardwareLayout.tsx](/mnt/a/ohmic-audio-labs/components/Hardware/HardwareLayout.tsx)
- [components/Mobile/MobileLab.tsx](/mnt/a/ohmic-audio-labs/components/Mobile/MobileLab.tsx)
- [components/Tabs/HardwareTab.tsx](/mnt/a/ohmic-audio-labs/components/Tabs/HardwareTab.tsx)
- [docs/THREE_TIER_WEB_ARCHITECTURE.md](/mnt/a/ohmic-audio-labs/docs/THREE_TIER_WEB_ARCHITECTURE.md)
- [docs/SITE_SITEMAP.md](/mnt/a/ohmic-audio-labs/docs/SITE_SITEMAP.md)

### Hardware contract and transport layers

- [services/hardware/dsp/DSPDevice.ts](/mnt/a/ohmic-audio-labs/services/hardware/dsp/DSPDevice.ts)
- [services/hardware/dsp/DeviceRegistry.ts](/mnt/a/ohmic-audio-labs/services/hardware/dsp/DeviceRegistry.ts)
- [services/hardware/dsp/firmwareContract.ts](/mnt/a/ohmic-audio-labs/services/hardware/dsp/firmwareContract.ts)
- [components/Hardware/DspDeckSummary.tsx](/mnt/a/ohmic-audio-labs/components/Hardware/DspDeckSummary.tsx)
- [services/hardware/amplab/AmpLabDevice.ts](/mnt/a/ohmic-audio-labs/services/hardware/amplab/AmpLabDevice.ts)
- [services/hardware/amplab/transports/HttpAmpLabTransport.ts](/mnt/a/ohmic-audio-labs/services/hardware/amplab/transports/HttpAmpLabTransport.ts)
- [components/Hardware/useAmpLabControlPlane.ts](/mnt/a/ohmic-audio-labs/components/Hardware/useAmpLabControlPlane.ts)
- [components/Hardware/useAmpLabDiscoveryPlane.ts](/mnt/a/ohmic-audio-labs/components/Hardware/useAmpLabDiscoveryPlane.ts)

### Mobile/Android-specific parity points

- [components/Mobile/AmpLabBleTestSuite.tsx](/mnt/a/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx)
- [platform/mobile/android/AmpLabSchemaModels.kt](/mnt/a/ohmic-audio-labs/platform/mobile/android/AmpLabSchemaModels.kt)
- [platform/mobile/apple/AmpLabSchemaModels.swift](/mnt/a/ohmic-audio-labs/platform/mobile/apple/AmpLabSchemaModels.swift)
- [android/app/src/main/AndroidManifest.xml](/mnt/a/ohmic-audio-labs/android/app/src/main/AndroidManifest.xml)

### Sync and backend integration

- [services/CloudSync.ts](/mnt/a/ohmic-audio-labs/services/CloudSync.ts)
- [services/backend/README.md](/mnt/a/ohmic-audio-labs/services/backend/README.md)
- [docs/specs/BACKEND_FRONTEND_TRACEABILITY.md](/mnt/a/ohmic-audio-labs/docs/specs/BACKEND_FRONTEND_TRACEABILITY.md)

### Existing firmware-side reality

- [src/dsp_state.cpp](/mnt/a/masterfirmware/src/dsp_state.cpp)
- [src/dsp_state.hpp](/mnt/a/masterfirmware/src/dsp_state.hpp)
- [src/ui_remote.cpp](/mnt/a/masterfirmware/src/ui_remote.cpp)
- [src/main.cpp](/mnt/a/masterfirmware/src/main.cpp)
- [sigmastudio/master-2in-4out-measurement/FIRST_CONTROL_SLICE.md](/mnt/a/masterfirmware/sigmastudio/master-2in-4out-measurement/FIRST_CONTROL_SLICE.md)

## What the Website and Android App Actually Are

### 1. One shared app, not two separate product surfaces

[App.tsx](/mnt/a/ohmic-audio-labs/App.tsx) is the shared shell.

- Browser defaults to `DASHBOARD`.
- Native defaults to `MOBILE_MODE`.
- Hardware and mobile views are feature slices inside the same runtime.

That means the Android app is not a separate native product with separate firmware expectations. It is mostly:

- the same React hardware/runtime logic
- wrapped in Capacitor
- with Android BLE, barcode scan, native launch, and mobile-specific UX helpers

### 2. The repo already separates static content from runtime surfaces

The three-tier docs are explicit:

- Tier 1 interactive app/runtime in [docs/THREE_TIER_WEB_ARCHITECTURE.md](/mnt/a/ohmic-audio-labs/docs/THREE_TIER_WEB_ARCHITECTURE.md)
- Tier 2 suite docs
- Tier 3 knowledge/SEO/static pages

This is important because it answers the "does UI want firmware?" question properly:

- static docs and SEO pages do not need firmware
- the interactive hardware/runtime surfaces do

So yes, moving SEO/static-content work out of the main product code path is reasonable.

## Repo and context-layer direction

The clean structure is:

- canonical truth stays in real repos as text and code
- a private company org should hold the real product repos instead of one junk-drawer repo
- an `ohmiclabs.github`-style context surface can publish hierarchy, reference docs, AI-readable maps, and generated indexes
- semantic retrieval tooling such as the existing Chroma docker setup can help with multi-repo awareness, but it should not become the canonical truth store

That means:

- use the repos for truth
- use a context layer for discovery
- use retrieval tooling for convenience

not the other way around.

## What the UI Already Expects from Firmware

## AmpLab / device-web expectations

The shared hardware surfaces already assume these device-facing routes:

- `GET /api/status`
- `GET /api/state`
- `POST /api/cmd`
- `GET /api/inputs`
- `GET /api/device/config`
- `POST /api/device/config`
- `GET /api/images`
- `POST /api/image?screen=N`
- `DELETE /api/image?screen=N`
- planned `POST /api/display-settings`
- WebSocket `/ws`

Examples:

- [components/Hardware/useAmpLabControlPlane.ts](/mnt/a/ohmic-audio-labs/components/Hardware/useAmpLabControlPlane.ts)
- [services/hardware/amplab/transports/HttpAmpLabTransport.ts](/mnt/a/ohmic-audio-labs/services/hardware/amplab/transports/HttpAmpLabTransport.ts)
- [components/Hardware/AmpLabCustomizerModal.tsx](/mnt/a/ohmic-audio-labs/components/Hardware/AmpLabCustomizerModal.tsx)
- [components/Hardware/BrandingPanel.tsx](/mnt/a/ohmic-audio-labs/components/Hardware/BrandingPanel.tsx)

This means the hardware UI does not want "nothing." It already wants a clean device-web API.

## DSP contract expectations

The DSP surfaces are even clearer: they want a topic contract, not device-specific internals.

[services/hardware/dsp/firmwareContract.ts](/mnt/a/ohmic-audio-labs/services/hardware/dsp/firmwareContract.ts) and [components/Hardware/DspDeckSummary.tsx](/mnt/a/ohmic-audio-labs/components/Hardware/DspDeckSummary.tsx) already expect:

- `sys.info`
- `sys.capabilities`
- `dsp.state.live`
- `dsp.state.staged`
- `dsp.param.stage`
- `dsp.apply`
- `measure.fft.frame`

That is the right line:

- UI asks for state, capabilities, stage/apply, and measurement frames
- firmware decides how to fulfill that

## Android-specific expectations

The Android shell does not create a whole new contract. It mostly reuses the same one.

Examples:

- [components/Mobile/AmpLabBleTestSuite.tsx](/mnt/a/ohmic-audio-labs/components/Mobile/AmpLabBleTestSuite.tsx)
- [platform/mobile/android/AmpLabSchemaModels.kt](/mnt/a/ohmic-audio-labs/platform/mobile/android/AmpLabSchemaModels.kt)

Android-specific additions are mostly:

- BLE discovery/provisioning
- deep linking
- barcode scan
- mobile measurement UX

But the underlying data model is still:

- AmpLab telemetry/status/node envelopes
- DSP command/reply/state envelopes
- measurement ingest/analysis/sync envelopes

This is exactly why a shared-core mini-app strategy makes sense later:

- same contracts
- same parsing
- same validation
- smaller shells for focused workflows

not separate firmware-facing stacks.

## Mini-app strategy for later

Good candidates for thin Android/web mini apps:

- wiring / ohm-load calculator
- box and port calculator
- gain / voltage / power helper
- impedance / T-S helper
- RTA-lite or signal generator
- setup / commissioning utility

These should share:

- contracts
- calculator logic
- validation
- design tokens where practical
- backend/API bindings where needed

The goal is a web of small displays and tools over one core, not a family of disconnected apps.

## What the UI Should Want from Firmware

The UI should want these things from firmware and only these things:

### 1. Identity and presence

- hardware model
- unit id
- firmware version
- transport kind
- online/offline or session/link state

### 2. Capabilities

- which graphs/profiles/controls exist
- which measurement jobs exist
- which routes/inputs/outputs are available
- which transports are supported

### 3. Live state

- current control values
- current runtime state
- current health and telemetry
- live measurement/RTA frames

### 4. Mutations by intent

- stage this parameter
- apply staged changes
- recall/save preset
- arm/disarm job
- set brightness/branding/config

### 5. Deterministic acks/errors

- accepted
- rejected
- unsupported
- auth failed
- busy
- invalid value

### 6. Stable config APIs

- device config
- screen/image config
- startup/default behavior
- auth and ownership state
- artifact references for larger or longer-run data

The UI should not want:

- raw register maps
- SigmaStudio address arithmetic
- topology-specific hacks
- board-specific timing assumptions
- transport-specific packet quirks

That is the translator layer's job.

## What This Means for the "Translator Layer"

For the current Ohmic-native path:

- local translator on the CYD is not required
- the handheld can speak contract/API intent directly
- `masterfirmware` or backend-facing firmware can do the actual hardware-specific work

For future non-Ohmic control paths:

- USB control of third-party DSPs
- BLE control of third-party units
- helper bridges
- mixed transports

then yes, the translator layer becomes necessary.

So the architecture is:

- UI speaks intent
- contract defines meaning
- translator resolves implementation

That is exactly what will let one handheld/app control different DSP families later.

For the current Ohmic-native path, the handheld and app do not need a local translator. They can speak the contract directly.

## Current Repo Split, In Practical Terms

### Safe to keep frontend-only / not firmware-blocking

- Tier 2 suite docs
- Tier 3 reference/SEO/knowledge content
- design calculators and education tools
- store/community/billing/admin feature surfaces

These may still need backend APIs, but they do not block firmware consolidation.

### Firmware-sensitive surfaces

- hardware workbench
- AmpLab control and telemetry surfaces
- DSP deck / DSP runtime surfaces
- mobile measurement workflows
- sync/session/device routing
- CYD handheld surface

These are the surfaces that need contract discipline.

## Consolidation Problems Still Present

### 1. Important DSP truth is still untracked

The untracked docs/schemas/manifests in `ohmic-audio-labs` are still a process risk.

If they remain untracked, the frontend and firmware can drift without anyone noticing.

### 2. `masterfirmware` is still only partially aligned to the canonical contract

Known mismatches already found:

- `main.cpp` transport loop mismatch
- `dsp_state_on_message` signature mismatch
- `measure.fft.frame` payload mismatch (`bins` vs canonical `bins_db`)

### 3. AmpLab device-web APIs are semi-real, semi-ad hoc

The app already expects device-web features like:

- `/api/status`
- `/api/state`
- `/api/cmd`
- `/api/inputs`
- `/api/device/config`
- image/display config routes

These need to be treated as real product contracts, not convenient side endpoints.

### 4. Settings, SEO, and experimental surfaces are mixed into the main app repo

This is survivable, but it makes system planning noisier than it needs to be.

### 5. Long-run capture strategy is not yet treated as a first-class contract concern

For longer windows, live transport alone is not enough.

The system should explicitly support:

- live low-rate previews and health over WS/BLE
- SD-backed or otherwise persisted raw captures
- artifact references and manifests for later retrieval

That behavior should be documented as part of the contract, not left as an implementation accident.

## First Real Hardware/Software Consolidation Plan

## Phase 0. Freeze working handheld baseline

Keep `cyd_remote` stable.

The handheld is now usable enough to serve as the human-facing control companion while the contract work is cleaned up underneath.

## Phase 1. Promote canonical DSP docs/contracts to tracked source of truth

Move the important untracked DSP material in `ohmic-audio-labs` into tracked repo truth:

- transport schema
- firmware contract
- graph surface manifests
- measurement job docs
- apply/state machine docs

Without this, the app and firmware cannot consolidate cleanly.

## Phase 2. Normalize `masterfirmware` to the contract

Bring `masterfirmware` into alignment with the existing canonical topics and payloads.

Minimum target:

- `sys.info`
- `sys.capabilities`
- `dsp.state.live`
- `dsp.state.staged`
- `dsp.param.stage`
- `dsp.apply`
- `measure.fft.frame`

This is the minimum needed to make the app, handheld, and firmware feel like one system.

## Phase 3. Lock the AmpLab device-web API

Treat the device-web paths already used by the app as a formal surface:

- `/api/status`
- `/api/state`
- `/api/cmd`
- `/api/inputs`
- `/api/device/config`
- branding/image/display endpoints

Document what is canonical, what is legacy, and what is planned-but-not-real.

Also document the expected interaction style:

- app asks what exists
- firmware returns capabilities
- app requests what it wants
- firmware returns state/stream/artifact references

not broad implicit pushing by default.

## Phase 4. Define the "system works" scenario

A complete first working system should mean:

1. Device appears and identifies itself.
2. Web app and Android app can discover or reach it.
3. Handheld can control it.
4. Live telemetry and RTA frames stream correctly.
5. DSP stage/apply works for the first supported control slice.
6. Measurements can be captured, relayed, stored, and reviewed.
7. Settings/config/branding paths are deterministic.
8. Longer captures can be retrieved by artifact/reference instead of depending only on live transfer.

If those seven things work, you have a real system, not a pile of demos.

## Phase 5. Translator later, not now

Do not build the generalized multi-DSP translator before the Ohmic-native path is clean.

Do it after:

- the contract is stable
- the native firmware path is stable
- the shared UI surfaces are stable

Then add translators for:

- third-party DSP over USB
- third-party DSP over BLE
- helper bridge transports

## Phase 6. Shared-core mini apps later

After the native path is clean:

- split reusable calculators/contracts/bindings into shared core packages
- ship thin Android/web mini apps over that core
- keep them as consumers of the same system contract, not special-case firmware clients

## Final Answer to the Underlying Question

If the question is:

"Is the audit telling us the UI should want nothing from firmware?"

The answer is:

No.

The right answer is:

- the UI should want nothing from firmware internals
- the UI should want stable contracts from firmware
- the static content should be kept out of the firmware-critical path

That is exactly the foundation you need for the first real hardware/software consolidation plan.

## Recommended Immediate Next Step

Do the next pass in this order:

1. Freeze and keep shipping the current `cyd_remote` baseline.
2. Audit and promote the untracked DSP contract/docs in `ohmic-audio-labs`.
3. Normalize `masterfirmware` to those contracts.
4. Draft and review one canonical device contract from the AmpLab pilot.
5. Then do a narrow `DSP` screen implementation against the locked contract, not against ad hoc firmware behavior.

That path creates one coherent system instead of one app, one handheld, and one firmware branch that merely resemble each other.
