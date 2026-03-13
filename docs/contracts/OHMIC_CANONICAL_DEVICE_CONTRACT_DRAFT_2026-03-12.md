# Ohmic Canonical Device Contract Draft

Date: 2026-03-12
Status: Draft for review
Role: seed contract derived from the current AmpLab and DSP pilot work

## Purpose

Define the device contract shape that web, Android, handheld, and future mini apps should consume.

This draft is intentionally about behavior and boundaries first, not transport quirks or register-level implementation.

## Core Rules

### 1. Consumers ask; firmware answers

The system should behave like this:

- consumer asks identity
- firmware answers identity
- consumer asks capabilities
- firmware answers capabilities
- consumer asks for state or a stream
- firmware returns the requested state or stream
- consumer sends an intent command
- firmware returns deterministic acceptance or rejection

Do not make the contract depend on hidden assumptions or unsolicited firehose behavior as the normal mode.

### 2. Consumers bind to intent, not implementation

Consumers should not know:

- raw register maps
- SigmaStudio address math
- board-specific ADC wiring details
- transport-specific framing hacks
- firmware-internal object names that are not part of the public contract

Consumers should know:

- device identity
- capabilities
- current state
- supported commands
- supported jobs
- artifact references

### 3. Long captures are artifacts, not just streams

Use live transport for:

- health
- telemetry
- preview traces
- short confirmations
- RTA frames

Use artifact references for:

- long raw windows
- multi-second or multi-minute captures
- logs
- session bundles
- analysis inputs/outputs

Artifact storage may be SD-backed on the device.

## Contract Layers

## Layer 1. Discovery and identity

Every device should support a small identity surface.

Minimum fields:

- `hardware_model`
- `unit_id`
- `firmware_version`
- `transport_kind`
- `device_family`
- `role`
- `session_id` or equivalent when participating in a multi-node session

Suggested topic:

- `sys.info`

## Layer 2. Capabilities

Every device should advertise what it can do instead of forcing the client to infer it.

Minimum capability domains:

- supported topics
- supported commands
- supported jobs
- supported graph profiles
- supported control targets
- supported transports
- supported artifact/media paths

Suggested topic:

- `sys.capabilities`

Important rule:

If a feature is not supported, it should be absent or explicitly marked unsupported in capabilities.

## Layer 3. Live state

Devices should expose current state in stable, queryable form.

Examples:

- current graph/profile
- current applied and staged control state
- runtime health
- telemetry
- link state
- environmental data

Suggested topics:

- `dsp.state.live`
- `dsp.state.staged`
- device-family status topics like `amplab.status`, `amplab.node`, `amplab.telemetry`

## Layer 4. Streams

High-rate or ongoing feeds should be explicit streams, not ambiguous state polling.

Examples:

- `measure.fft.frame`
- scope or waveform previews
- low-rate telemetry streams
- progress notifications for active jobs

Important rule:

Stream payload fields must stay canonical. For example, the DSP measurement path should settle on `bins_db`, not drift between `bins`, `values`, and similar aliases.

## Layer 5. Commands and mutations

Commands should express intent, not implementation details.

Examples:

- `dsp.param.stage`
- `dsp.apply`
- `measure.job.create`
- `measure.job.cancel`
- config writes such as display, brightness, branding, or device setup

Every command path should support:

- accepted
- rejected
- unsupported
- invalid value
- busy
- auth required

## Layer 6. Artifacts

Artifacts are named outputs or stored inputs that can be retrieved later.

Examples:

- raw WAV captures
- session logs
- measurement bundles
- exported screen/image assets
- future SD-backed recordings

Artifacts should be addressable by references/URIs/ids, not only by live in-flight transfer.

Recommended rule:

- the artifact reference itself should resolve to metadata, not just a pretty filename
- minimum metadata should include `session_id`, `request_id` or `job_id`, `kind`, `target`, and creation time
- human-readable names can be derived from that metadata, but retrieval should not depend on ad hoc filenames alone

## Consumer Surfaces

## 1. Main web and Android runtime

These should consume:

- discovery
- capabilities
- live state
- commands
- measurement streams
- artifact references

They should not consume firmware internals directly.

## 2. Handheld controller

The handheld should be a focused consumer of the same contract:

- identity and health
- a narrow set of live controls
- live preview signal motion
- limited configuration
- selected quick actions

No local translator is required for the current Ohmic-native path.

## 3. Shared-core mini apps

Later mini apps should be thin shells over the same shared core.

Examples:

- wiring / ohm-load calculator
- box volume / port helper
- gain / voltage / power helper
- RTA-lite
- setup/commissioning tools

These are not separate contract families. They are smaller consumers of the same model.

## AmpLab As The Pilot

AmpLab should be used as the learning project for this contract.

That means:

- keep the working AmpLab behavior
- normalize it around this contract shape
- remove AmpLab-specific quirks from the public boundary where possible
- do not let temporary implementation details become permanent platform rules

AmpLab-specific device-web APIs can exist, but they should still obey the same broad principles:

- discoverable
- capability-driven
- explicit state vs stream
- deterministic command behavior
- artifact/reference support where needed

## Initial Minimum Scope

The first cross-surface working contract should include:

- `sys.info`
- `sys.capabilities`
- `dsp.state.live`
- `dsp.state.staged`
- `dsp.param.stage`
- `dsp.apply`
- `measure.fft.frame`
- one measurement job creation path such as `measure.job.create`
- stable device-web status/config routes where the product already depends on them

## Out of Scope For The First Pass

Do not require these before the first contract is considered real:

- full PEQ editor semantics
- full crossover editor semantics
- full generator matrix
- third-party DSP translation
- every transport family at once

Those are later layers.

## Review Questions

1. Are discovery, capability, state, command, and artifact layers the right top-level split?
2. Should stream subscription semantics be explicit in the transport contract, or implied by topic type?
3. Which device-web routes should be formalized as canonical now versus left family-specific?
4. What artifact reference shape should be preferred for SD-backed captures?
5. Which parts of the current AmpLab behavior are worth preserving as platform-wide patterns?
