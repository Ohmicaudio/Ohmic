scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: follow-up
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Audit static-content `reference` quality bucket

## Requested Outcome

- audit the `reference/*` static pages for quality issues after parity closure
- identify concrete graphics, metadata, and styling debt without reopening parity

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference`

## Completion

- `reference/*` is a graphics-heavy quality bucket, not a parity bucket
- placeholder markers remain in `50` pages
- `31` pages leak placeholder text into the HTML metadata layer via `<meta name="description" ...>`
- `1` page still carries a page-local `<style>` block: `reference/index.html`
- no new encoding defects were found in this bucket during the pass
- no page-by-page copy rewrite was required to close the audit

## Quality Findings

- placeholder concentration by subsection:
  - `reference/visual/*`: `34` pages
  - `reference/math-measurement/*`: `10` pages
  - `reference/troubleshooting/*`: `6` pages
- metadata leak concentration:
  - `reference/visual/*`: `31` pages
- local style concentration:
  - `reference/index.html`: `1` page

## Placeholder Themes

- amplifier setup and gain-setting quick cards
- enclosure blueprint and box-design cards
- electrical-system overview and battery configuration visuals
- crossover, filter-slope, phase, and impedance reference charts
- fuse and grounding reference cards
- troubleshooting cards and diagnostic quick visuals
- measurement and enclosure math support diagrams

## Recommended Follow-up

- replace the placeholder graphics in the `50` flagged pages, prioritizing the `visual/*` library first
- remove placeholder tokens from metadata fields in the `31` affected `visual/*` pages so SEO text stops surfacing missing art
- normalize `reference/index.html` off its local `<style>` block and onto the shared site styling system
- keep this bucket on the quality track only; parity is already resolved

## Notes

- representative pages showing the current pattern:
  - `reference/index.html`
  - `reference/visual/index.html`
  - `reference/visual/amplifier-setup-card/index.html`
  - `reference/math-measurement/ohms-law-and-power/index.html`
  - `reference/math-measurement/bandpass-enclosure/index.html`
