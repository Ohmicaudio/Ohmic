scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: follow-up
priority: soon
blocking: no
depends_on:
handoff_from: 2026-03-14-scan-static-pages-for-remaining-encoding-defects.md
claim_id:
topic: requested-task

# Split second-wave `subwoofer-enclosures` placeholder graphics from encoding scan

## Requested Outcome

- break the remaining `subwoofer-enclosures` placeholder markers exposed during the encoding scan into small graphics microtasks
- keep the next graphics wave scoped to the actual remaining placeholder families, not the whole bucket

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\beginner-level-how-ports-work\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\beginner-level-getting-sealed-right\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\beginner-level-choosing-the-right-subwoofer\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\beginner-level-when-to-use-specialty-enclosures\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\installer-level-design-and-tuning\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\installer-level-port-design-and-construction\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\installer-level-ts-parameter-based-selection\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\installer-level-advanced-construction\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\engineer-level-transmission-line-and-passive-radiator-theory\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\engineer-level-modal-analysis-and-loss-mechanisms\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\sections\10-1-driver-selection-for-enclosure-type\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\sections\10-2-advanced-sealed-enclosure-design\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\sections\10-3-ported-enclosure-advanced-design\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\sections\10-4-bandpass-and-specialty-enclosures\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\sections\10-5-enclosure-construction-techniques\index.html`

## Findings From Scan

- no broad mojibake or replacement-character problem was found across `public`
- three installer pages had placeholder strings leaking into:
  - `<meta name="description">`
  - `og:description`
  - JSON-LD `description`
- those metadata leaks were fixed in `ohmic-audio-static-content` commit `2265e3f`
- the real remaining problem is graphics backlog, not byte-corruption debt

## Remaining Placeholder Families Seen

- `Enclosure Bracing Diagram`
- `Bandpass Response Curves`
- `TS Parameter Design Flowchart`
- `Ported Enclosure Diagram`
- `Sealed Box Blueprint 12inch`
- `Qts Enclosure Matching Chart`
- `Sealed Enclosure Diagram`
- `4th Order Bandpass Diagram`
- `Slot Port Detail`
- `Competition Sub Comparison Chart`
- `Passive Radiator System`
- `Constrained Layer Damping Cross Section`
- `Sealed Box Panel Layout`

## Instructions

- do not reopen the finished encoding scan itself
- split the remaining families into microtasks of one family at a time
- prefer repeated family pairs first, especially where a beginner page and section page share the same placeholder
- if a family already exists in `assets/engineering-diagrams`, reuse/refine it instead of creating a competing name

## Ready When

- one or more small ready tasks exist for the remaining subwoofer-enclosures placeholder families
- the next graphics wave can proceed by family instead of by bucket
