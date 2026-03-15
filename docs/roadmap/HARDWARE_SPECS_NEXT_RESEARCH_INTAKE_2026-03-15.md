Status: intake sort
Date: 2026-03-15

# Hardware Specs Next Research Intake

## Purpose

Define which hardware module packets should receive the next research intake
while hardware stays in the warm lane behind software completion.

## Intake Order

## 1. Amplab Power Master

Why first:

- closest to the eventual hardware control/power backbone
- likely to influence the rest of the system most strongly
- power architecture decisions ripple across multiple downstream modules

Best research inputs next:

- power-entry architecture references
- contactor and high-current switching patterns
- vehicle electrical protection patterns
- rail strategy and sequencing examples
- current sensing / voltage sensing reference designs

## 2. DSP Wireless Controller

Why second:

- closest to the software/control ecosystem already being built
- likely to bridge DSP, wireless control, and future handheld behavior

Best research inputs next:

- DSP + controller partitioning references
- Wi-Fi control-plane architecture notes
- codec / ADC / DAC selection notes
- clocking and reset patterns
- audio-path isolation and grounding references

## 3. RTA SPL Meter

Why third:

- measurement hardware is strategically important
- likely to share architecture decisions with DSP/control products

Best research inputs next:

- microphone front-end references
- measurement ADC references
- calibration flow ideas
- display/UI interactions for handheld measurement
- enclosure and connector constraints

## 4. Handheld Mainboard

Why fourth:

- already partially grounded by current CYD work
- useful, but lower urgency than the upstream power/control modules

Best research inputs next:

- battery/power management patterns
- display/touch path options
- encoder/button/UI control hardware
- storage and connectivity options
- charging and protection references

## 5. Amplab Headless Node

Why fifth:

- meaningful, but should follow after the more central power/controller lanes

Best research inputs next:

- node-role partitioning
- CAN and local bus decisions
- reduced-I/O board patterns
- deployment/bring-up considerations

## 6. Factory Audio Interface

Why later:

- real lane, but not the first design packet to harden

Best research inputs next:

- OEM signal capture patterns
- high-level input-conditioning references
- isolation and noise considerations

## 7. High-Power Contactor Controller

Why later:

- useful support module
- should follow after broader power-master direction is clearer

Best research inputs next:

- contactor driver references
- precharge and sequencing references
- high-current safety patterns

## Intake Rule

When collecting research next, prefer:

- vendor reference designs
- application notes
- block diagrams
- proven architectural patterns

Prefer not to collect yet:

- random schematic inspiration with no context
- deep part-level shopping before requirements settle
- layout-level detail before block diagrams and power trees are stronger

## What To Do With New Research

Each new research drop should go into the matching `research-intake.md` file for
the module packet.

Do not dump mixed hardware notes into one shared scratch file.

## Summary

Next hardware research should flow in this order:

1. `amplab-power-master`
2. `dsp-wireless-controller`
3. `rta-spl-meter`
4. `handheld-mainboard`
5. `amplab-headless-node`
6. `factory-audio-interface`
7. `high-power-contactor-controller`
