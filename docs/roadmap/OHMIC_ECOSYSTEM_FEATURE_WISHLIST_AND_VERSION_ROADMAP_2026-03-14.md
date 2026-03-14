scope: ecosystem
status: proposal_for_review
updated: 2026-03-14
horizon: future_versions

# Ohmic Ecosystem Feature Wishlist And Version Roadmap

## Purpose

Capture the dream horizon without confusing it with the approved next two days.

This document is intentionally ambitious.

It should answer:

- what the ecosystem could become
- what version waves could logically add
- how software, firmware, handheld, content, and hardware fit into one version
  story

## Planning Rule

This is a future roadmap and feature bank.

It is not a promise that every feature ships in year one.

Current software completion still outranks this document.

## Product Thesis

The Ohmic ecosystem should become:

- the practical software center for car audio design, tuning, measurement, and
  control
- the control layer for future smart DSP and amplifier hardware
- the content and education engine that creates category trust
- the community and field-intelligence network that competitors usually ignore

## Naming Clarification

Use these names consistently:

- `OSM` (`Ohmic System Management`) = the system planner and project-graph lane
- `BassBuilder` = the enclosure and subwoofer design lane

`OSM` (`Ohmic System Management`) should be treated as the build, topology,
planning, and project-state surface.

`BassBuilder` should be treated as one specialized design tool family that can
feed into `OSM`, not as the entire planner.

## North-Star Experience

The long-term experience should feel like one platform that can do all of this:

- plan a full system in `OSM` (`Ohmic System Management`)
- model enclosure and subwoofer details in `BassBuilder`
- model and save projects
- learn from guided content
- measure and tune with real tools
- control DSP and hardware safely
- stream listening audio over the local network when desired
- share builds, presets, and findings
- discover local shops, builders, and bass-meet activity
- graduate into purpose-built Ohmic hardware

## Versioning Model

Use overall ecosystem version waves.

Each version can include work from different surfaces:

- app/runtime
- static content and tools
- firmware
- handheld controller
- hardware modules
- community and commercial surfaces

That is better than pretending each repo evolves in isolation.

## Ecosystem Version Roadmap

## `v0.1` Foundation Already In Motion

### Goal

Separate the ecosystem into sane lanes and prove the first real software stack.

### Core characteristics

- runtime app exists
- static-content repo exists
- firmware repos are split
- hardware planning repo exists
- schema family exists
- coordination system exists and is improving

### What this version means

The ecosystem has shape, but not yet full polish or central contract ownership.

## `v0.2` Software Completion And Trust Surface

### Goal

Finish the current software/content wave cleanly enough that the platform feels
deliberate.

### Expected additions

- stronger static graphics and page quality
- cleaner premium boundaries and packaging
- cleaner route and asset behavior
- schema governance rule in place
- stronger app/static separation

### User-visible result

Ohmic stops feeling like a promising pile and starts feeling like a serious
software product family.

## `v0.3` Pro Workflow Stack

### Goal

Make the software worth paying for even before custom hardware exists.

### Possible additions

- `OSM` (`Ohmic System Management`) saved projects and richer workspace state
- `OSM` topology graph for full-system planning
- `BassBuilder` round-trip into saved project state
- measurement session save/export/review
- premium design and tuning workflow bundles
- preset libraries and compare/diff flows
- guided advanced tool workflows
- report export and customer-facing output surfaces

### Revenue role

This is where software starts clearly paying for hardware.

## `v0.4` Proof, Sharing, And Early Community Layer

### Goal

Add the first lightweight trust and sharing layer around the software.

### Possible additions

- builder profile pages
- local system and build journals
- build showcase feeds
- social sharing hooks for measurements, projects, and results
- preset and project proof sharing

### Why it matters

This creates trust and repeat attention before heavier discovery or moderation
surfaces exist.

## `v0.5` Device Fabric And Control Maturity

### Goal

Turn the ecosystem into a true multi-device control platform.

### Possible additions

- stronger device registry and device-role graph
- multi-device control sessions
- safe staged apply and rollback everywhere
- lane-level telemetry and identity
- handheld controller feature maturity
- remote session ownership and approval flows
- automation macros and scene switching

### Device result

Phones, browsers, handhelds, DSPs, measurement accessories, and future nodes
start behaving like one family.

## `v0.6` Source Routing And Media Groundwork

### Goal

Prepare for listening-media features without polluting the control plane too
early.

### Possible additions

- source priority management
- source quality comparison and routing guidance
- audio source capability inventory
- wired USB audio and analog input routing support
- Bluetooth audio sink groundwork where hardware allows
- session and device UX for source selection

### Important architecture rule

This must stay a media-plane feature.

It should not be treated as an extension of the DSP control WebSocket API.

This wave should prepare the lane, not overbuild it.

## `v0.7` Measurement And Competition Suite

### Goal

Push from useful tools into serious measurement and competition utility.

### Possible additions

- multi-mic measurement support
- chirp timing and transfer-function maturity
- SPL sensor integration
- impedance and electrical measurement helpers
- measurement-driven DSP suggestions
- `OSM` attachment of measurement runs to real project objects
- competition scorecards and preparation workflows
- lane history, overlays, and comparison views

## `v0.8` Installer, Discovery, And Field Operations Layer

### Goal

Become usable not only by enthusiasts but by installers and repeat operators.

### Possible additions

- customer job folders
- install templates and runbooks
- common vehicle or system presets
- fleet-style device management
- diagnostics dashboards
- install QA checklists
- service logs and revisit notes
- local bass meet and event map
- installer and shop discovery surfaces
- local recommendation and trusted-vendor layer
- moderated local ecosystem and referral surfaces
- full Wi-Fi listening-only audio receiver path on compatible hardware
- network handoff or casting-style local playback where strategically useful

## `v0.9` Hardware-Linked Software Platform

### Goal

Make the software unmistakably point toward Ohmic hardware.

### Possible additions

- AmpLab power-master integration
- headless node integration
- DSP wireless controller integration
- RTA/SPL meter integration
- factory audio interface integration
- high-power contactor/controller integration
- hardware-aware presets and measurement workflows

### Strategic result

Software demand and trust begin pulling hardware into the market instead of
hardware trying to create trust from zero.

## `v1.0` Market-Leader Platform

### Goal

Be recognized as the platform that connects learning, design, measurement,
control, and hardware better than the fragmented competition.

### Possible characteristics

- polished free and pro software stack
- category-defining content moat
- healthy community and local network layer
- serious device registry and control plane
- real media-plane listening features
- hardware program with believable product gravity

## Beyond `v1.0`

These are horizon ideas, not promises:

- Ohmic intelligent amplifier family with AmpMaster as the brain
- smart subs and speakers with embedded sensing
- temperature-aware coils and protection intelligence
- high-g accelerometer telemetry for enclosure and driver analysis
- RGB or volumetric display surfaces integrated into speaker or dust-cap
  concepts
- rich automation scenes tied to measurement, safety, and show modes

These should stay inspirational until the software base earns the right to take
them seriously.

## Feature Bank By Category

## 1. App And Runtime Platform

### Design and planning

- `OSM` full-system planner and project graph
- `OSM` hardware, signal, and topology modeling
- advanced enclosure and port calculators
- wiring and load-planning tools
- project BOM and cost estimation
- build planning and checklist flows
- saved design templates
- `BassBuilder` enclosure design, TS workflows, and box iteration

### Measurement and analysis

- RTA, chirp, transfer-function, and impedance workflows
- session overlays and compare tools
- recommendation engine for likely fixes
- report export and customer-facing summary views

### Control and orchestration

- preset diff and compare
- staged apply and rollback
- macro scenes
- safe multi-device ownership
- telemetry dashboards

## 2. Static Content And Tool Surface

- category-leading educational pages
- calculator landing pages
- richer diagrams and visual explainers
- conversion-aware upgrade prompts
- static mini-tools that lead into pro workflows

## 3. Firmware And Device Layer

- cleaner transport and capability model
- stronger telemetry
- job-based measurement and generator execution
- audio routing and media-plane support
- fleet-safe provisioning and recovery
- fault and protection reporting

## 4. Handheld And Remote Surface

- richer control pages
- measurement status views
- preset and scene control
- quick source routing
- install-friendly field utility surfaces
- emergency or recovery workflows

## 5. Hardware Program

- `amplab-power-master`
- `amplab-headless-node`
- `dsp-wireless-controller`
- `rta-spl-meter`
- `factory-audio-interface`
- `high-power-contactor-controller`

### Future hardware qualities

- safe power management
- strong field diagnostics
- measurement-first integration
- modular lane-aware identity
- good onboarding and recovery

## 6. Community, Social, And Commercial Layer

- local bass meet and event map
- creator and builder profiles
- local build journals and meet recap posts
- local shop and installer discovery
- shared build galleries
- preset sharing and public proof artifacts
- challenge boards, scoreboards, or seasonal events
- support/community hybrid surfaces

## What Should Happen First

The order should stay:

1. current software completion
2. pro software value
3. content and acquisition moat
4. community and device maturity
5. hardware-linked expansion
6. moonshot hardware ideas

## Recommendation

Use this as the future-horizon feature bank and version scaffold.

Use the year-one roadmap for near-horizon direction.

Do not confuse the two.
