#!/usr/bin/env python3
"""
Stage a clean repo surface from an import manifest into a destination folder.

This is intentionally local-first and additive:
- source repos are never modified
- destination can be previewed with --dry-run
- manifests under manifests/import-surfaces/ stay the source of truth

Supported manifest shapes:
1. firmware/import style:
   version: 1
   source_repo_path: ...
   include:
     top_level: [...]
     include: [...]
     dirs: [...]
     files: [...]
   exclude:
     dirs: [...]
     files: [...]

2. preserve-history cleanup style:
   source_repo: ...
   keep: [...]
   exclude: [...]
"""

from __future__ import annotations

import argparse
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import yaml


@dataclass(frozen=True)
class NormalizedManifest:
    source_root: Path
    includes: tuple[str, ...]
    excludes: tuple[str, ...]


def normalize_rel(path: str) -> str:
    path = path.replace("\\", "/").strip()
    while path.startswith("./"):
        path = path[2:]
    return path.rstrip("/")


def load_manifest(path: Path) -> NormalizedManifest:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"Manifest is not an object: {path}")

    if "source_repo_path" in data:
        source_root = Path(data["source_repo_path"])
        include = data.get("include", {}) or {}
        exclude = data.get("exclude", {}) or {}
        includes = []
        for key in ("top_level", "include", "dirs", "files"):
            for entry in include.get(key, []) or []:
                includes.append(normalize_rel(entry))
        excludes = []
        for key in ("dirs", "files"):
            for entry in exclude.get(key, []) or []:
                excludes.append(normalize_rel(entry))
    elif "source_repo" in data and "keep" in data:
        source_root = Path(data["source_repo"])
        includes = [normalize_rel(entry) for entry in data.get("keep", []) or []]
        excludes = [normalize_rel(entry) for entry in data.get("exclude", []) or []]
    else:
        raise ValueError(f"Unsupported manifest shape: {path}")

    return NormalizedManifest(
        source_root=source_root,
        includes=tuple(dict.fromkeys(includes)),
        excludes=tuple(dict.fromkeys(excludes)),
    )


def is_excluded(rel_path: str, excludes: Iterable[str]) -> bool:
    for raw in excludes:
        entry = normalize_rel(raw)
        if not entry:
            continue
        if rel_path == entry or rel_path.startswith(entry + "/"):
            return True
    return False


def iter_source_files(manifest: NormalizedManifest) -> Iterable[tuple[Path, str]]:
    seen: set[str] = set()
    for raw_entry in manifest.includes:
        entry = normalize_rel(raw_entry)
        src = manifest.source_root / entry

        if not src.exists():
            raise FileNotFoundError(f"Included path does not exist: {src}")

        if src.is_file():
            if not is_excluded(entry, manifest.excludes) and entry not in seen:
                seen.add(entry)
                yield src, entry
            continue

        if src.is_dir():
            for path in sorted(src.rglob("*")):
                if path.is_dir():
                    continue
                rel_path = path.relative_to(manifest.source_root).as_posix()
                if is_excluded(rel_path, manifest.excludes):
                    continue
                if rel_path in seen:
                    continue
                seen.add(rel_path)
                yield path, rel_path
            continue

        raise ValueError(f"Unsupported path type: {src}")


def stage_manifest(manifest: NormalizedManifest, dest_root: Path, dry_run: bool, clean_dest: bool) -> int:
    if not manifest.source_root.exists():
        raise FileNotFoundError(f"Source root does not exist: {manifest.source_root}")

    if clean_dest and dest_root.exists():
        if not dry_run:
            shutil.rmtree(dest_root)

    copied = 0
    for src, rel_path in iter_source_files(manifest):
        copied += 1
        dst = dest_root / rel_path
        print(f"{'COPY' if not dry_run else 'PLAN'} {rel_path}")
        if dry_run:
            continue
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)

    return copied


def main() -> int:
    parser = argparse.ArgumentParser(description="Stage a clean repo surface from a manifest")
    parser.add_argument("manifest", type=Path, help="Path to import-surface YAML manifest")
    parser.add_argument("dest", type=Path, help="Destination directory to materialize")
    parser.add_argument("--dry-run", action="store_true", help="Print planned copies without writing files")
    parser.add_argument("--clean-dest", action="store_true", help="Remove destination first")
    args = parser.parse_args()

    manifest = load_manifest(args.manifest)
    copied = stage_manifest(manifest, args.dest, dry_run=args.dry_run, clean_dest=args.clean_dest)
    print(f"{'Planned' if args.dry_run else 'Copied'} {copied} file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
