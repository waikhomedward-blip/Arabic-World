#!/bin/sh
# One visual revision: capture every scene's opening frame on iPhone, then judge it against the real photos.
# Usage: sh tools/visual-rev.sh REV-NNN "what changed"
set -e
cd "$(dirname "$0")/.."
AW_SHOTS=1 npx playwright test tests/e2e/verify.spec.ts --project=iphone-webkit --workers=2 > /tmp/aw-visual-rev.log 2>&1 || { tail -20 /tmp/aw-visual-rev.log; echo "PLAYTHROUGH FAILED"; exit 1; }
research-private/.venv/bin/python tools/visual-judge.py "$@"
