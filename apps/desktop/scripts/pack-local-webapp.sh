#!/usr/bin/env bash
# Pack the LOCALLY BUILT webapp (apps/web/webapp) into apps/desktop/webapp.asar,
# instead of downloading Element's published release tarball (scripts/fetch-package.ts).
#
# - Only the bundle currently referenced by index.html is included (repeated dev
#   builds leave stale hashed bundle dirs in apps/web/webapp/bundles/).
# - The desktop config (cchat/config.json by default) replaces the web config.json
#   inside the asar; it intentionally has no update_base_url (auto-update disabled).
#
# Usage: scripts/pack-local-webapp.sh [config.json path]
set -euo pipefail

DESKTOP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_DIR="$DESKTOP_DIR/../web/webapp"
CONFIG="${1:-$DESKTOP_DIR/cchat/config.json}"
STAGE="$(mktemp -d)/webapp"
trap 'rm -rf "$(dirname "$STAGE")"' EXIT

if [ ! -f "$WEB_DIR/index.html" ]; then
    echo "No built webapp at $WEB_DIR — run the apps/web build first (pnpm --filter element-web build)" >&2
    exit 1
fi

BUNDLE="$(grep -o 'bundles/[a-z0-9]*' "$WEB_DIR/index.html" | sort -u | head -1 | cut -d/ -f2)"
if [ -z "$BUNDLE" ]; then
    echo "Could not determine active bundle from $WEB_DIR/index.html" >&2
    exit 1
fi
echo "Active bundle: $BUNDLE"

mkdir -p "$STAGE"
rsync -a --exclude bundles "$WEB_DIR/" "$STAGE/"
mkdir -p "$STAGE/bundles"
rsync -a "$WEB_DIR/bundles/$BUNDLE/" "$STAGE/bundles/$BUNDLE/"
cp "$CONFIG" "$STAGE/config.json"

cd "$DESKTOP_DIR"
rm -f webapp.asar
pnpm exec asar p "$STAGE" webapp.asar
echo "Packed $(du -h webapp.asar | cut -f1) webapp.asar (config: $CONFIG)"
