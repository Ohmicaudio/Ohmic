Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content

# Clean AI Index Placeholder Descriptions

## Goal

Replace raw `[VISUAL PLACEHOLDER: ...]` description strings in
`public/ai-index.json` with neutral reference wording so surfaced metadata does
not leak internal staging language.

## Focus

- `public/ai-index.json`
- description fields only

## Acceptance

- raw visual-placeholder tokens are removed or neutralized
- the replacement wording stays honest about reference assets
- no unrelated index reshaping is required

