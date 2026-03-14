# Ohmic Ecosystem Version Roadmap Review

Date: 2026-03-14
Review target: `OHMIC_ECOSYSTEM_FEATURE_WISHLIST_AND_VERSION_ROADMAP_2026-03-14.md`

## Overall Judgment

The version-wave sequence from `v0.2` through `v1.0` is mostly coherent.

The strongest parts of the sequence are:

- `v0.2` software completion and trust surface
- `v0.3` pro workflow value before custom hardware
- `v0.5` device fabric and control maturity
- `v0.7` serious measurement and competition utility
- `v0.9` hardware-linked software platform

Those waves read like a believable progression from useful software into a real
ecosystem.

## Finding 1: `OSM` And `BassBuilder` Are Clear Enough

Current naming clarity is good enough to proceed.

What works:

- `OSM` is described as the planning, topology, and project-state surface
- `BassBuilder` is described as a specialized enclosure-design lane
- the docs do not collapse `BassBuilder` into the whole planning surface

Small watchout:

- `OSM` is still abstract enough that it should keep being paired with phrases
  like `planner`, `project graph`, or `system management` in future docs

## Finding 2: `v0.4` Is Mixing Two Different Things

`v0.4` currently bundles:

- proof and sharing surfaces
- local-network or real-world discovery surfaces

Those do not have the same readiness requirement.

What feels right in `v0.4`:

- build showcase feeds
- project or preset sharing
- journals and public proof surfaces

What feels premature in `v0.4`:

- local bass meet and event map
- installer and shop discovery
- trusted-vendor or recommendation layers

Reason:

Sharing and proof can grow from the existing software and content base. Local
discovery features need enough real density and moderation trust to avoid
feeling empty or fake.

## Finding 3: `v0.6` Media Plane Feels Late For Prep, Early For Full Scope

The current `v0.6` media-plane wave is conceptually valid but too broad.

My read:

- simple source-routing and input-priority groundwork could appear earlier as
  part of device/control maturity
- full Wi-Fi listening audio, casting-style playback, and richer media-plane
  behaviors should likely land later than the current `v0.6` wording suggests

Reason:

- listening playback introduces architecture and UX risk that does not directly
  strengthen the current design, measurement, and control trust surface
- the current roadmap still wins more by deepening utility and device maturity
  than by adding a bigger listening stack too early

## Recommended Sequencing Adjustment

Keep the overall structure, but split or shift two areas:

### Keep as-is

- `v0.2` through `v0.3`
- `v0.5`
- `v0.7`
- `v0.9`
- `v1.0`

### Adjust

- keep `v0.4` for proof, sharing, and light community surfaces
- move local-network discovery features closer to `v0.7` or `v0.8`
- narrow `v0.6` to source-routing groundwork if it stays there
- move full listening-media ambitions later unless they become strategically
  necessary for hardware control differentiation

## Community And Local-Network Placement Note

Community belongs in the roadmap.

Local-network discovery belongs later than lightweight sharing.

That distinction matters because `community` is not one thing:

- proof and sharing help trust early
- real-world discovery and recommendation layers need density, moderation, and
  enough ecosystem gravity to avoid becoming dead surfaces

## Media-Plane Timing Note

If forced to choose `earlier` or `later` for the current `v0.6` media-plane
wave, the answer is: later.

More precise answer:

- source selection and routing guidance can stay nearer the control plane
- full listening-audio experiences should wait until device and measurement
  maturity are less fragile

## Recommended Follow-On

Do not rewrite the ecosystem roadmap immediately in the middle of software
completion pressure.

Instead, use this review as the change note for the next roadmap-edit pass:

- split `v0.4` into early proof/community vs later local-network discovery
- tighten the wording of `v0.6` so it reads as a narrower preparation wave or a
  later wave entirely
- keep `OSM` and `BassBuilder` framing as currently written, with continued
  glossary reinforcement
