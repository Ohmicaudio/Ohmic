# Hardware Program Module Map

Date: 2026-03-14
Status: active working draft

This is the current normalized hardware program shape based on the live planning
direction.

## Primary Planned Modules

### 1. AmpLab Power Master

Primary powered control and processing unit.

Likely concerns:

- main power entry
- regulation and protection
- control MCU
- DSP / audio path
- comms and orchestration
- external system interfaces

### 2. AmpLab Headless Node

Variant or companion unit without the full local UI/display burden.

Likely concerns:

- shared core with the power master where possible
- reduced local UI
- remote-first control
- deployment where minimal human interface is preferred

### 3. DSP Unit With Wireless Controller

Combined DSP/control hardware path with wireless user interaction built in.

Likely concerns:

- DSP path
- MCU/control path
- wireless transport
- compact UI/control surface
- clean contract-facing behavior

### 4. RTA / SPL Meter

Dedicated measurement hardware.

Likely concerns:

- capture front end
- ADC / sampling path
- timing and calibration
- display or minimal UI
- data export / session capture

## Secondary / Candidate Modules

### 5. Factory Audio Interface

Vehicle-integration or OEM interface module.

Likely concerns:

- signal adaptation
- factory integration constraints
- level shifting / isolation
- vehicle-specific connector strategy

### 6. High-Power Contactor / Controller

Power switching / control module for high-current systems.

Likely concerns:

- contactor drive and protection
- safety / fault behavior
- current handling
- control isolation

## Current Planning Rule

Treat the first four as active hardware-program tracks.

Treat the last two as real but still candidate / conditional until requirements
say they deserve Rev A time.

## Repo Mapping

These tracks now live under:

- `B:\ohmic\repos\hardware-specs\projects\amplab-power-master`
- `B:\ohmic\repos\hardware-specs\projects\amplab-headless-node`
- `B:\ohmic\repos\hardware-specs\projects\dsp-wireless-controller`
- `B:\ohmic\repos\hardware-specs\projects\rta-spl-meter`
- `B:\ohmic\repos\hardware-specs\projects\factory-audio-interface`
- `B:\ohmic\repos\hardware-specs\projects\high-power-contactor-controller`

## Next Planning Move

For each active track, fill these before deep schematic work:

1. `requirements.md`
2. `block-diagram.md`
3. `power-tree.md`
4. `interface-matrix.md`
5. `connectors.md`
6. `bringup-plan.md`
7. `risks.md`

