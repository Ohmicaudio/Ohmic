scope: system
status: proposal_for_review
updated: 2026-03-14
horizon: year_one

# Ohmic Year One Roadmap Proposal

## Objective

Move from `name and idea` to a defensible software-led platform with enough
revenue, visibility, and product credibility to fund serious hardware
development.

## North Star

Build the strongest practical audio design, measurement, and control ecosystem
in the category by using software and content to earn trust first, then using
that trust and revenue to accelerate hardware.

## Strategic Thesis

Software pays for hardware.

That means year one should optimize for:

- useful tools
- trust-building content
- measurable traffic and lead capture
- subscriptions, premium workflows, and support revenue
- contract-clean hardware integration paths

not for prematurely betting everything on shipping custom hardware first.

## Current Starting Position

Ohmic already has meaningful assets:

- a runtime app with auth, gating, hardware, and measurement surfaces
- a static content repo with SEO and tool pages
- a hardware planning repo
- firmware repos separated from app and content concerns
- a growing queue and coordination system that is finally getting usable

## Proposal Structure

Everything after the next 2 days is a proposal for review, not approved
execution.

Supporting future-horizon documents:

- `OHMIC_SCHEMA_CENTRALIZATION_PROPOSAL_2026-03-14.md`
- `OHMIC_ECOSYSTEM_FEATURE_WISHLIST_AND_VERSION_ROADMAP_2026-03-14.md`

## Week 1 Proposal

### Goal

Turn the current system into a coherent outward-facing software program.

### Proposed focus

- finish the active graphics and static quality wave
- verify static/runtime boundaries and route health
- define the first software packaging ladder
- document the first marketing and social cadence
- begin structured hardware intake for the top three modules

### Expected outcome

- cleaner static acquisition surfaces
- clearer packaging language
- a visible plan that can be critiqued instead of guessed

## Month 1 Proposal

### Goal

Ship the first coherent software-commercial surface.

### Proposed software priorities

- stabilize the three-tier web surface
- tighten `OSM` (`Ohmic System Management`), `BassBuilder`, and measurement
  tool entry points
- expose clearer value boundaries between free and paid
- ship at least one polished premium workflow bundle

### Proposed commercial priorities

- formalize offer ladder:
  - `free`
  - `pro`
  - `hardware-linked`
- add lead capture and clearer upgrade prompts across static and app surfaces
- align billing and gated route behavior with the offer ladder

### Proposed marketing priorities

- search capture through static tools and education pages
- social clips from real tools, measurements, and build flows
- public build logs showing hardware planning maturity
- community/help entry surfaces that create trust and retention

### Proposed output

- a public-facing software offer that can start producing revenue and signal

## Quarter 1 Proposal

### Goal

Become known for the software stack, not just the promise of hardware.

### Proposed product moves

- harden premium design and measurement workflows
- improve project save/share/export flows
- promote community and request-help paths into a usable support moat
- keep the firmware contract and control plane moving toward a cleaner unified
  platform

### Proposed mini-app direction

Do not build six disconnected apps.

Instead, start identifying shared-core mini-app candidates:

- `OSM` (`Ohmic System Management`) system planner and saved project graph
- wiring and ohm-load calculator
- box and port calculator
- gain, voltage, and power helper
- impedance and measurement helper
- RTA-lite or signal utility

These should be thin packages over the same shared logic, not separate stacks.

### Proposed business outcome

- software revenue begins paying for deeper hardware R and D
- Ohmic becomes a practical tools brand instead of an aspirational concept only

## Six Month Proposal

### Goal

Turn product breadth into ecosystem leverage.

### Proposed moves

- mature the shared-core software architecture
- make Android/mobile and web feel like one family
- deepen measurement workflows and collaboration surfaces
- run early hardware-facing beta programs around the cleanest module candidates

### Proposed market position

- strong educational moat
- strong utility moat
- growing support and community moat
- early hardware credibility without overcommitting manufacturing

## Twelve Month Proposal

### Goal

Arrive at the edge of true hardware scale-up with software already carrying real
weight.

### Proposed outcomes

- recognized software platform for audio design, tuning, and measurement
- durable SEO footprint and social content engine
- premium software or support revenue funding hardware development
- hardware program mature enough for serious pilot boards and controlled field
  programs

### Proposed hardware state by year end

- `amplab-power-master`: requirements, architecture, and early board program
- `dsp-wireless-controller`: defined as the control and DSP brain lane
- `rta-spl-meter`: clear measurement accessory path
- support modules (`factory-audio-interface`, `high-power-contactor-controller`)
  either promoted or deferred based on real requirements

### Transition beyond year one

If the software base is strong enough, the next major step becomes:

- own amps with AmpMaster as the system brain
- tighter integrated DSP and measurement hardware
- smarter speaker and subwoofer concepts with richer sensing and display ideas

That should be treated as the next horizon, not assumed shipped in year one.

## Proposed Workstreams

### 1. Product and Software

- `OSM` (`Ohmic System Management`) planning workflows
- `BassBuilder` enclosure-design workflows
- measurement workflows
- control and device workflows
- shared-core packaging for later mini apps

### 2. Acquisition and Content

- SEO landing pages
- educational suites
- calculator and tool entry pages
- high-trust technical content

### 3. Monetization

- free to pro ladder
- premium workflows
- paid support and community leverage
- hardware-linked premium surfaces when hardware is ready

### 4. Marketing and Social

- short-form demos
- build logs
- technical breakdowns
- customer success and proof surfaces

### 5. Hardware Program

- requirements
- architecture
- interface definition
- power planning
- bring-up planning

## Review Questions

- which paid surface should be first: design, measurement, support, or control
- which audience should anchor year one: builders, installers, competitors, or
  measurement-first power users
- how much energy should go into mini apps in year one versus keeping everything
  inside the main surface
- which hardware module deserves the first deep requirements pass

## Recommendation

Approve the next 2 days as an execution packet, then use this year-one roadmap
as the review scaffold for week, month, quarter, and year planning rather than
trying to invent direction from scratch in every session.
