Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T234955Z-74d96e7b

# Classify Ohmic Audio Labs Nonproduct Dirty Domains

## Goal

Turn the large `public`, `docs`, `archive`, and `android` dirt in
`ohmic-audio-labs` into one clear freeze/classification decision instead of
letting those domains keep absorbing ambient edits.

## Focus

- `public/*`
- `docs/*`
- `archive/*`
- `android/*`

## Acceptance

- each domain is classified as freeze, normalize, or active lane
- the next safe grouped task for each domain is obvious
- product execution lanes stop competing with broad nonproduct churn

## Result

- recorded the domain classification in
  `docs/roadmap/OHMIC_AUDIO_LABS_NONPRODUCT_DIRTY_DOMAIN_CLASSIFICATION_2026-03-15.md`
- classified `public` and `docs` as normalization lanes, and `archive` and
  `android` as frozen until explicitly reopened
- made `public/*` the first nonproduct normalization priority because the
  current deletion wave is the largest collision source in the repo
