# hardware-specs

Project overlay for the Ohmic hardware planning and schematic repo.

## Scope

Use this repo for:

- hardware program planning
- electrical architecture
- board/module planning packets
- schematic and PCB source
- manufacturing and bring-up records
- revision history for hardware releases

Do not use this repo for:

- app/runtime implementation
- firmware feature work
- static site content
- vague chat-only hardware truth

## Current Working Direction

The current planned hardware module set is:

- `amplab-power-master`
- `amplab-headless-node`
- `dsp-wireless-controller`
- `rta-spl-meter`
- `factory-audio-interface`
- `high-power-contactor-controller`

Reference:

- `B:\ohmic\docs\architecture\HARDWARE_PROGRAM_MODULE_MAP_2026-03-14.md`

## Startup Truth

Start with:

1. repo-local `AGENTS.md`
2. `README.md`
3. `docs/architecture/README.md`
4. `docs/architecture/HARDWARE_PROGRAM_MODULE_MAP_2026-03-14.md`
5. the active module folder under `projects/`

## Planning Rule

Do not jump straight into a giant schematic.

For each board or module, establish:

- requirements
- block diagram
- power tree
- interface matrix
- connectors
- bring-up plan
- risks

before large capture/layout work.

## Current Bias

- prefer explicit named modules over vague “main board” ideas
- prefer Rev A learning boards over overpromised first spins
- freeze connectors, rails, and pin budgets earlier than feels natural
- store incoming research in repo files, not only in chat

