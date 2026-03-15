Status: strategy note
Date: 2026-03-14

# Ohmic Loudspeaker Image Acquisition And Attribution

## Purpose

Define a realistic image strategy for future loudspeaker pages before any image pull or page generation begins.

## Current Reality

The preserved loudspeaker data includes source-hosted product image URLs such as:

- `https://loudspeakerdatabase.com/images/...`

That means the current lane has:

- references to product images
- no owned image library
- no established attribution policy

## Recommendation

Do not treat source-hosted image URLs as immediately safe product assets.

Use a staged approach:

### Stage 1: Track Image References

Keep fields for:

- `source_image_url`
- `source_url`
- `image_source_name`

This preserves provenance without pretending the image policy is solved.

### Stage 2: Define Allowed Image Modes

Future pages should support three image modes:

1. `source-linked image`
2. `stored local image with provenance`
3. `generated diagram / no-photo fallback`

### Stage 3: Prefer Diagrams When Product Photos Are Weak

Use generated diagrams or neutral visual placeholders when:

- image rights are unclear
- image quality is poor
- the image is too small or inconsistent
- the image adds less value than a technical diagram

## Attribution Rule

Every non-generated image should be able to answer:

- where did this image come from
- what page or source was it associated with
- what usage basis are we relying on

If those questions do not have answers, the image should not be treated as durable product content.

## Recommended Future Image Fields

Suggested image fields in the normalized data shape:

- `source_image_url`
- `local_image_path`
- `image_source_name`
- `image_source_url`
- `image_mode`
- `image_attribution_text`
- `image_license_note`
- `image_last_verified_at`

## Good Default Behavior

Until the policy is stronger:

- keep source image URLs as references only
- do not assume long-term hotlinking is acceptable
- prefer no image over legally or operationally murky image use
- allow page generation without a product photo when the technical data is strong enough

## Recommended Visual Fallbacks

When no approved product image is available, use:

- branded neutral speaker silhouette
- technical parameter card
- category icon or diagram

That is better than a broken, low-quality, or dubious image.

## Summary

The image lane should prioritize:

1. provenance
2. durability
3. consistency

before trying to maximize photo count.
