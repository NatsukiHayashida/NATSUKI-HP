#!/usr/bin/env bash
# GPT受信箱のポーリング監視。
# Monitor に多行スクリプトを直接渡すと改行が潰れて壊れるため、必ずファイルにして実行する。
# /mnt/c は inotify が効かないのでポーリングする。
# 名前ではなく mtime で見るので、同じ名前で上書き保存されても検知できる。
set -u
INBOX="/mnt/c/Users/林田夏樹/Downloads/gpt"
MARK="${TMPDIR:-/tmp}/.gpt-inbox-mark"

touch "$MARK"
while true; do
  sleep 5
  [ -d "$INBOX" ] || continue
  # マーカーより新しいファイルを列挙してから、マーカーを進める
  found=$(find "$INBOX" -maxdepth 1 -type f -newer "$MARK" -printf '%f\t%s\n' 2>/dev/null)
  touch "$MARK"
  [ -z "$found" ] && continue
  while IFS=$'\t' read -r name size; do
    [ -n "$name" ] && echo "新着: $name (${size} bytes)"
  done <<< "$found"
done
