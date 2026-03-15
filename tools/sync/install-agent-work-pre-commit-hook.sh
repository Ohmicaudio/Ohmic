#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-/mnt/b/ohmic}"
HOOK_DIR="$ROOT_DIR/.git/hooks"
HOOK_PATH="$HOOK_DIR/pre-commit"

mkdir -p "$HOOK_DIR"

cat >"$HOOK_PATH" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="/mnt/b/ohmic"
REFRESH_SCRIPT="$ROOT_DIR/tools/sync/refresh-agent-work-snapshot.sh"

if [[ ! -x "$REFRESH_SCRIPT" ]]; then
  exit 0
fi

changed="$(git -C "$ROOT_DIR" diff --cached --name-only)"

if [[ -z "$changed" ]]; then
  exit 0
fi

if printf '%s\n' "$changed" | rg -q '^(agent-system/|docs/systems/|docs/roadmap/)'; then
  "$REFRESH_SCRIPT" >/dev/null
  git -C "$ROOT_DIR" add generated/agent-work/current-state.json generated/agent-work/active-claims.json generated/agent-work/idle-ready-work.json 2>/dev/null || true
fi
EOF

chmod +x "$HOOK_PATH"
echo "Installed pre-commit hook at $HOOK_PATH"
