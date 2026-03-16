# Ohmic Master Administrator Filesystem Watch Intake Adapter

Date: 2026-03-16
Project: ohmic

## Purpose

Define the watched-folder intake adapter that turns newly arrived files into
administrator intake envelopes without pretending the source is a provider API.

## Adapter Role

This adapter owns:

- watch root configuration
- file arrival detection
- duplicate detection hints
- file staging references
- native format classification
- envelope emission

## Watch Root Model

Recommended root shape:

- one configured local folder per watch source
- optional source identity metadata attached to that root

The adapter should not assume all files in the root have the same final routing
destination.

## Arrival Semantics

A file should be treated as arrived only when:

- write activity has stabilized
- file size no longer changes
- checksum or timestamp snapshot can be taken safely

This avoids partial reads of still-copying files.

## Duplicate Detection Hints

Use:

- checksum
- filename
- byte length
- first-seen timestamp
- source watch root

Duplicate detection should warn, not silently drop, unless policy explicitly
says otherwise.

## File-To-Envelope Mapping

Recommended values:

- `source_type`: `filesystem`
- `native_format_kind`: derived from file type
- `raw_receipt_ref`: staged file ref
- `title`: filename or folder-provided label
- `attachment_refs[]`: usually one primary file attachment ref

## Staging Rule

The file should first move or copy into a controlled staging location before
normalization continues.

The watch root itself is not durable system storage.

## Warning Cases

Emit warnings when:

- file type is unknown
- file is incomplete or locked
- duplicate signals are strong
- root metadata is missing

## Outcome

Watched-folder intake becomes a first-class non-API adapter instead of an
informal import hack.
