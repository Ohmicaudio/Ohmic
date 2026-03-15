scope: system
status: working_plan_for_approval
updated: 2026-03-15
horizon: 7_days

# Ohmic Next 7 Days Working Plan

## Objective

Use the next 7 days to turn the current rescued software state into a cleaner,
more reusable product foundation while keeping the next loudspeaker/content lane
defined but secondary.

## Why This Week Matters

- the migration and coordination layer is finally stable enough that planning
  will stick
- the toolbox lane is now real product code instead of incubator residue
- the shared math pattern is working and should be extended while the context is
  fresh
- the loudspeaker database lane is now preserved and shaped enough to progress
  without polluting active repos

## Execution Priority Rule

Current software completion stays on top.

That means this week should prioritize:

- shared math and calculator reuse
- current app-surface decisions
- code and doc durability
- small, clear product-surface advances

before:

- hardware planning expansion
- crawler redesign
- broad business-ops follow-ons
- homepage or brand-surface rewrites

## Scope In

- advance the `ohmic-toolbox` lane from imported app to stronger reusable tool
  family
- lock the distinction between generic electrical tools and
  speaker-specific/intelligence tools
- turn the loudspeaker database lane into one or two concrete sample artifacts
- keep queue, claim, and planning surfaces truthful

## Scope Out

- OSM UI expansion
- full loudspeaker page generation
- full image ingestion pipeline
- large firmware implementation pushes
- hardware schematic capture
- broad marketing or socials expansion unless directly supporting software

## Working Lanes

### Lane A: Toolbox And Shared Math

Repos:

- `B:\ohmic\repos\ohmic-audio-labs`

Focus:

- expose more tested shared calculator logic
- decide where second-wave tools should live
- keep formulas canonical across surfaces

### Lane B: Smarter Speaker Tooling

Repos:

- `B:\ohmic\repos\ohmic-audio-labs`
- planning docs in `B:\ohmic`

Focus:

- define the smarter `Wiring Lab` / speaker-match lane
- keep it separate from generic `Ohm's Law`
- prepare it for later implementation without rushing the engine now

### Lane C: Loudspeaker Data And Static Pages

Locations:

- `B:\junk`
- planning/docs in `B:\ohmic`
- future static surface in `B:\ohmic\repos\ohmic-audio-static-content`

Focus:

- prove one sample normalization path
- define page and image policy
- avoid raw scrape-to-page shortcuts

## Day-By-Day Breakdown

## Day 1

### 1. Expose `Acoustic Gain` in the toolbox UI

Why:

- the shared math exists and is tested
- turning one finished math slice into visible product surface is a better next
  step than opening another planning packet

Output:

- `Acoustic Gain` visible inside `apps\ohmic-toolbox`

Exit criteria:

- UI uses shared math only
- toolbox tests still pass

### 2. Refresh queue truth after the `Acoustic Gain` UI slice

Why:

- follow-through must stay immediate or the board drifts again

Output:

- updated request status
- updated next-pick board if needed

## Day 2

### 3. Decide second-wave toolbox surface strategy

Question:

- should `Ohm's Law`, `Cone Area`, and `Acoustic Gain` live in the toolbox app,
  as separate public mini-tool pages, or as a mixed model

Output:

- one decision note, not more drift

Exit criteria:

- future second-wave tools have a chosen surface strategy

### 4. If the surface decision is clear, expose one second-wave tool path

Preferred candidate:

- `Ohm's Law`

Why:

- strongest search-entry fit
- already in shared math

## Day 3

### 5. Build one sample loudspeaker normalization map

Why:

- this turns the loudspeaker lane from abstract planning into one concrete proof

Output:

- one worked row mapping from raw CSV to normalized fields

Exit criteria:

- raw column names and normalized names are both visible
- ambiguities are documented instead of hidden

### 6. Use the sample map to refine the static page template if needed

Why:

- one sample will expose unrealistic assumptions fast

## Day 4

### 7. Lock the smarter `Wiring Lab` implementation boundary

Why:

- this is the highest-value speaker-specific tool lane
- it needs a stable implementation boundary before people start improvising

Output:

- implementation-facing follow-on packet for:
  - target loads
  - match categories
  - explanation templates
  - recommendation logic

Exit criteria:

- future implementation can start from a defined packet, not from chat memory

## Day 5

### 8. Decide `Time Alignment` first consumption surface

Pick one as the first real home:

- tuning helper
- handheld helper
- hardware-linked setup flow

Why:

- this keeps it from being repeatedly mis-slotted into the public utility lane

Output:

- one concrete first-consumer decision

### 9. If safe, connect that decision to an existing surface

Only if low-risk.

No full expansion required.

## Day 6

### 10. Review toolbox and loudspeaker lanes for shared-core opportunities

Focus:

- identify what should become canonical logic
- identify what must stay presentation-only

Why:

- week-two implementation should build on shared-core discipline, not branch
  drift

Output:

- short reuse map for next-wave implementation

## Day 7

### 11. Week review and next packet

Why:

- every 7-day plan should end with a real review and a next packet, not a fade
  into chat

Output:

- completed vs slipped tasks
- reasons for slips
- next 7-day packet draft

Exit criteria:

- queue reflects the new week state
- no important truth remains only in chat

## Recommended Order Of Attack

1. `implement-acoustic-gain-in-toolbox-ui`
2. `decide-second-wave-toolbox-surface-strategy`
3. `build-one-sample-loudspeaker-normalization-map`
4. smart `Wiring Lab` implementation packet
5. `Time Alignment` first-consumer decision

## Do-Not-Do List This Week

- do not start broad loudspeaker page generation
- do not start image scraping bursts
- do not reopen OSM surface expansion
- do not jump to hardware schematics
- do not widen into all remaining toolbox calculators at once
- do not let queue hygiene slip while implementation is moving

## Definition Of Success

At the end of 7 days, we should be able to say:

- the toolbox lane is materially more product-like
- second-wave tool direction is chosen, not guessed
- loudspeaker data is proven workable on at least one real sample
- smarter `Wiring Lab` work can begin from a defined boundary
- next-week planning is easier because this week ended in durable state
