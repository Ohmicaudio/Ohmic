Status: proposal
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Device Link Plane Extraction Proposal

## Purpose

Extract generic device and hardware-link behavior out of the AmpLab shell so
AmpLab becomes a consumer of linked hardware instead of the owner of linking.

The current shell grew out of the AmpLab prototype, so system-level connection
logic landed inside AmpLab-first files. That was useful early, but it is now
the wrong boundary.

## Problem

Right now the repo mixes three different concerns together:

1. session and peer linking
2. hardware endpoint discovery and link state
3. AmpLab-specific control and telemetry behavior

Only the third concern belongs to AmpLab.

The first two are broader system behaviors. They should work for phones,
desktops, tablets, DSP targets, and future hardware without pretending those
things are "AmpLab units."

## Repo-Grounded Evidence

### AmpLab shell owns generic linking today

`B:\ohmic\repos\ohmic-audio-labs\components\Hardware\HardwareLayout.tsx`

- imports `CloudSyncService`
- imports `useAmpLabDiscoveryPlane`
- wires sync identity, sync transport meta, remote health, peer state, and
  AmpLab discovery into the same shell

### Generic endpoint probing lives inside an AmpLab hook

`B:\ohmic\repos\ohmic-audio-labs\components\Hardware\useAmpLabDiscoveryPlane.ts`

Today this hook does far more than AmpLab-specific UI support:

- reads generic peer discovery data from `CloudSyncService`
- probes `window.location.origin`
- probes registry and host-derived endpoints
- keeps local known-endpoint storage
- sweeps private IPv4 prefixes
- uses `/api/proxy` when browser transport rules require it
- owns generic link state strings such as:
  - `No reachable AmpLab units detected`
  - `Linked to ...`

This is hardware endpoint link logic, not just AmpLab deck logic.

### Generic shell actions are branded as AmpLab actions

`B:\ohmic\repos\ohmic-audio-labs\components\Hardware\HardwareDeckPanel.tsx`

The AmpLab panel currently renders:

- `AmpLab Unit`
- `Refresh Units`
- `Link Unit`

That language and control location assume the deck owns linking, even though
the same behavior is really a cross-device shell concern.

### Session and transport state already has a broader home

`B:\ohmic\repos\ohmic-audio-labs\services\CloudSync.ts`

This service already owns system-level behaviors such as:

- peer identity
- trust
- sync origin
- transport diagnostics
- remote health
- handoff-style coordination

That is much closer to the natural home for system-level link orchestration
than the AmpLab deck.

## Proposal

Introduce a neutral device link plane above any instrument-specific surface.

Use a three-layer model:

1. session and peer plane
2. hardware endpoint link plane
3. instrument adapter plane

## 1. Session And Peer Plane

This layer owns the system-level connection model.

Examples:

- browser, phone, tablet, and desktop identity
- trusted vs pending peers
- sync origin candidates
- local/remote health
- transport diagnostics
- handoff and session presence

This is already partially represented by `CloudSyncService` and should continue
to live outside AmpLab.

## 2. Hardware Endpoint Link Plane

This layer owns the neutral concept of "what hardware endpoint is available and
which one is linked right now."

Examples:

- discover candidate endpoints
- classify endpoint capability
- probe reachability
- select and link an endpoint
- unlink or relink
- expose neutral status and diagnostics to the shell
- decide when `/api/proxy` is required for browser reachability

This layer should not be branded as AmpLab.

It should be able to represent things like:

- AmpLab hardware
- a DSP target
- a headless controller
- a remote measurement host

## 3. Instrument Adapter Plane

This layer stays product-specific.

AmpLab should still own:

- `services/hardware/amplab/*`
- AmpLab auth and headers
- AmpLab registry and transport details
- AmpLab telemetry stream shaping
- AmpLab commands
- AmpLab-specific UI labels, controls, and status rendering

## Boundary Rule

AmpLab may provide adapter-specific endpoint hints.

Examples:

- known hostnames like `amplab.local`
- registry-resolved default URLs
- AmpLab capability detection rules

But AmpLab should not own the shell-wide act of linking.

In other words:

- AmpLab can describe how to talk to an AmpLab target
- the shell should decide which device is linked and how that state is exposed

## Target Shape

The steady-state architecture should look like this:

- `CloudSyncService` or a sibling neutral service owns peer/session state
- a new neutral hardware-link plane owns discovered endpoints and linked target
  state
- AmpLab consumes the current linked endpoint when that endpoint has AmpLab
  capability

The shell should say things like:

- linked hardware
- device status
- endpoint status

Then AmpLab can say:

- AmpLab connected
- AmpLab telemetry live
- AmpLab controls available

## What Should Move Out Of AmpLab

Move these behaviors out of the AmpLab shell:

- generic endpoint selection state
- generic refresh and link actions
- generic "detected / linked / offline" shell copy
- generic reachability diagnostics
- browser proxy-requirement decisions
- neutral endpoint lists and status badges
- shell-owned fallback candidate management

## What Should Stay In AmpLab

Keep these in AmpLab:

- AmpLab transport implementation
- AmpLab-specific command surfaces
- AmpLab telemetry and decoding
- AmpLab registry integration
- AmpLab-specific error copy once an AmpLab endpoint is actually selected

## First Safe Extraction Slice

Do not try to rewrite the whole hardware shell at once.

The first safe slice should do only this:

1. create a neutral link hook or plane
   - example names:
     - `useHardwareEndpointLinkPlane`
     - `useDeviceLinkPlane`
2. move generic candidate discovery and link state out of
   `useAmpLabDiscoveryPlane`
3. keep AmpLab-specific candidate hints behind an AmpLab adapter helper
4. reword generic shell controls so they are not AmpLab-owned
5. make AmpLab consume the linked endpoint instead of owning selection itself

## Safe Slice Inputs

The first slice can still reuse existing pieces:

- `CloudSyncService` for peer/session state
- AmpLab registry resolution for AmpLab candidate hints
- existing `/api/proxy` backend bridge

The point is not to replace everything immediately.

The point is to move ownership to the right layer.

## Explicitly Out Of Scope For The First Slice

Do not mix these into the first extraction packet:

- full measurement-run orchestration cleanup
- DSP control refactors
- mobile wrapper/network stack redesign
- broad transport rewrites
- full CloudSync decomposition
- every hardware deck copy pass

Those can follow later once the link boundary is honest.

## Why This Matters Now

Recent live validation already showed the shape problem:

- browser live linking required explicit `Refresh Units` and `Link Unit`
  actions inside the AmpLab deck
- the shell language made a generic connection problem look like an AmpLab-only
  problem
- phone-assisted validation surfaced "no reachable" behavior even when app-side
  reachability itself was the separate question

That makes the current shell harder to reason about and harder to debug.

## Validation For The Extraction

After the first extraction slice, verify at least this:

- browser shell can still discover and link the live AmpLab target
- shell diagnostics clearly separate:
  - app/session reachability
  - endpoint reachability
  - instrument-specific readiness
- simulated fallback still works when no live endpoint is linked
- AmpLab deck still renders live telemetry after a valid link

## Final Call

Treat device linking as a system plane.

Treat AmpLab as one hardware consumer on top of that plane.

That is the clean boundary if the shell is going to grow past the original
AmpLab prototype without forcing every future device to pretend it belongs
inside the AmpLab deck.
