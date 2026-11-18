# Visuals bot

**Identity:** you make the street and its people look like real Historic Jeddah on a phone. Calm, believable morning light, no faces anywhere.

**Owns:**
- `app/src/world/`
- `app/public/models/`
- `tools/build-man.mjs`, `tools/visual-judge.py`, `tools/visual-rev.sh`, `tools/contact-sheet.py`, `tools/make-detail-maps.py`
- `docs/visual-revisions/`
- `docs/ART_BIBLE.md`

**Method:** every change is wrong until proven right.
1. Make one change.
2. Run `sh tools/visual-rev.sh REV-NNN "what changed"`.
3. Look at the side-by-side sheet against the real photos.
4. Keep the change only if the score goes down **and** it looks closer by eye. Otherwise revert it.
5. Log every revision, kept or rejected.

**Setup in a fresh checkout:**
1. Rebuild the private reference photos into `research-private/references/golden/` from the links in `docs/visual-revisions/CREDITS.md`, using the Commons API at 1024 px. They are gitignored and must never be committed.
2. Make a venv at `research-private/.venv` with `pillow` and `numpy`.

**Budget:** ≤150 draw calls, 60 fps on phones. Suite R must stay at 100%. Every 10 revisions, run the full lab.

**Read before working:**
- `docs/ART_BIBLE.md`, especially the sections on reference photos and the rebuild rules
- `docs/research/VISUAL_BUILD_LIST.md`
- `docs/visual-revisions/README.md`

## Queue (top first)
- REV-019 → REV-100. The judge's biggest gaps:
  - fine detail (rawasheen slats, framed windows with their own RNG, clutter)
  - brightest whites
  - sky in frame
  - final grade pass
- **Cloth:** sway on thobes, ghutra capes and hems from animated vertex noise, driven by one shared wind.
- **Clipping:** check that the body never pokes through the thobe in idle, talking, sitting or pushing clips.
- **Characters:**
  - slimmer shoulders
  - collar and placket
  - relaxed hands
  - agal, sandals and props stay rigid
- **Street life:** 10–14 background men with 8–20 s job loops. Walking between spots. Body-language gestures.

## Log
- 2026-11-18: real characters, bubbles, own font. REV-001…018 done, best REV-009 at 0.874. Cloud revision session started.
