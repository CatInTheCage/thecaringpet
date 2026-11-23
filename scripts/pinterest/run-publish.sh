#!/bin/zsh
# launchd 定时入口 — 自动解析 nvm node 并发布队列中的 Pin
# 日志: content-ideas/pinterest-publish.log (在 plist 里重定向)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh" --no-use >/dev/null 2>&1
NODE_BIN="$NVM_DIR/versions/node/$(cat "$NVM_DIR/alias/default" 2>/dev/null || echo v22.22.2)/bin/node"
[ -x "$NODE_BIN" ] || NODE_BIN="$(command -v node)"
cd "$(dirname "$0")/../.." || exit 1
echo "=== run at $(date '+%F %T') ===" >&2
exec "$NODE_BIN" scripts/pinterest/publish-pins.mjs
