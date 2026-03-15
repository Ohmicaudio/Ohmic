# Ohmic Post-Link Live Path Parity Wave

Date: 2026-03-15
Project: ohmic-audio-labs

## Purpose

Define the next honest parity wave after the recent live-link fixes so browser,
phone, shell, and linked-device behavior are treated as one coherent execution
lane instead of as generic network debugging.

## Current Proven State

What is already true:

- the desktop/browser live path can load the app shell and reach the live
  AmpLab endpoint
- the phone/tablet browser can load the same app shell and join the shared sync
  session
- the live AmpLab endpoint itself was reachable during the phone rerun
- shell copy already moved away from generic `unit` wording in the touched
  browser-shell surfaces

## Current Mismatch

What is still not true:

- the handset browser never surfaced the real live device candidate
  `192.168.1.113`
- the handset remained stuck on local-host fallback candidates even after a
  cache-clearing retry
- this means browser vs phone behavior is not yet at parity even when session
  presence and endpoint reachability are both real

This is now the main parity gap.

## Wave Scope

This wave should stay focused on four linked concerns:

1. discovery propagation parity
2. linked/current-device presentation parity
3. shell and deck readiness parity
4. live-path verification parity

## 1. Discovery Propagation Parity

Goal:

- make the handset/browser session receive the same usable live-device
  candidates the desktop/browser path can work with

Concrete concern:

- candidate discovery is still failing to propagate a usable live AmpLab IP to
  the handset shell even when the session is present

Immediate packet inside this area:

- trace the path from peer discovery state into handset-visible device
  candidates
- make sure a real discovered endpoint can survive the browser shell and appear
  in the selectable device list

## 2. Linked And Current-Device Presentation Parity

Goal:

- once a live device is linked, the shell should present the same linked/current
  state across desktop and handset surfaces

Concrete concern:

- the current deck language and state model still mix:
  - fallback candidate lists
  - current linked device state
  - AmpLab-specific readiness

Immediate packet inside this area:

- make linked/current-device presentation explicit in both shell and deck
- ensure the linked device does not reappear as a discovery candidate in the
  normal success path

## 3. Shell And Deck Readiness Parity

Goal:

- align what the shell says, what the deck says, and what the transport state
  actually proves

Concrete concern:

- the AmpLab deck still carries too much generic device-link responsibility,
  which makes parity failures look instrument-specific even when they are not

Immediate packet inside this area:

- keep generic device-link state separate from AmpLab-specific readiness
- make the shell clearly distinguish:
  - session/peer available
  - device candidate discovered
  - live device linked
  - AmpLab-specific telemetry/control ready

## 4. Live-Path Verification Parity

Goal:

- verify the same end-to-end expectations on both desktop and handset, not just
  one side of the path

Verification expectations for this wave:

- desktop/browser:
  - refresh sees the live device candidate
  - link succeeds
  - linked/current device state is clear
- handset/browser:
  - refresh sees the same live device candidate
  - link succeeds
  - linked/current device state is clear
- shared:
  - local-host fallback candidates do not mask the real live endpoint when it is
    available

## Out Of Scope

Keep these out of this parity wave:

- full device-link-plane extraction
- broad transport rewrites
- unrelated backend packaging
- OSM or design-sandbox regrouping

Those are adjacent lanes, not this wave.

## Next Execution Packet

The next execution packet should be narrower than "debug networking."

It should be:

- `handset live-device candidate propagation plus linked/current-device parity`

That packet should travel with:

- one real handset rerun
- one desktop/browser rerun
- targeted shell/deck regression coverage for linked/current state

## Relationship To The Browser Regression Wave

This parity wave defines the behavioral target.

The separate browser-shell regression wave should then package the tests,
smokes, and deck-readiness checks that enforce it.

In short:

- this document defines what parity means
- the regression wave defines how we keep it from drifting
