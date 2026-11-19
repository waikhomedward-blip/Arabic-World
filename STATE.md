# STATE

**Cycle:** 6 complete (2026-11-17) · **Overall:** 95.0 · **Best ever:** 95.0
**Playable:** https://claude.ai/artifact/X3NMijD1w7mAmm6eFwL5xk (private to Edward) · **Suite R:** 100%

## Release gates
- [ ] Scholar review (release gate)
- [ ] Native-speaker read of every line
- [ ] Licensed adhan recording
- [ ] Commissioned reciter (Quran station stays text-only until then)

## What exists
- Playable web game (`npm run dev`): Hijazi-style street in morning light (08:00–11:00), faceless all-male cast, 10 in-game days / 20 scenes / 78 lemmas.
- Arabic captions with full tashkeel, tap for English; reply modes Musāfir (tap/act), Ṭālib (tiles, hinted typing), Muqīm (in-game Arabic keyboard).
- Word ladder, Lexical Director (reply type by weakest word), typed-answer checker, on-device progress + export/import, days-in-the-city, word-of-the-day copy, morning check of yesterday's words.
- Lab: Suites R, C, G, L, V, P (≈5,000 cases incl. 100 real play-throughs on 5 devices). S (speech) not built. Scoreboard in `lab/scoreboard.json`.

## Where things are
- Project folder: `/Volumes/EdwardWaikhom/arabic-world` (external drive). GitHub: https://github.com/waikhomedward-blip/Arabic-World (public).
- Tanzil Quran text imported verbatim (`tools/data/quran-uthmani.txt`); lemma-level Quran meter still to build.

## Visual revisions (branch `wip/visual-rebuild`, 19 Nov)
- REV-019 to REV-100 done in the cloud: judge score 1.22 → 0.39. Summary: `docs/visual-revisions/SUMMARY.md`; full log: `docs/visual-revisions/README.md`.

## Running in the background
- Story research: transcripts of 4 YouTube channels → `research-private/` (gitignored, never published). `build_digest.py` makes digests + STORY_LEADS.txt.

## Waiting on Edward
- Missing research files (see `docs/RESEARCH_DIGEST.md`).

## Later (confirmed)
- Optional Madinah chapter after the main game: chosen by the player, never required; no depiction of Masjid an-Nabawi, prophets or Companions; scholar review first.

## Next actions (cycles 2–10: foundations)
1. Content: add a second scene layer per day (and review scenes) toward ~150 lemmas and ~10 encounters per word.
2. Rooftop set for the 'on the roof' morning scenes (sky, birds, clouds visible).
2b. Muqīm-only slow learners: frustration 1.00/day (borderline) → gentler hints in free typing.
4. Speech port into `app/speech/` behind a flag (needs Edward's speech-test files) and start Suite S.
5. Suite V next step: visual rubric score per place + MediaPipe face check on renders.
6. Adhan schedule + mute UI (no audio until licensed).
7. Own morphology/lemma layer over the Tanzil text → lemma staircase + Quran meter.

## 18 Nov 2026: study complete
- **Transcripts read:** 64 of 77 parts. Edward stopped Rahmaniyyah after part 1, and Al-Andalusi's non-method videos after part 1. The private notes are in `research-private/channel-readers/` and `research-private/synthesis/`.
- **Outputs:**
  - `docs/research/GAME_STUDY.md`: method, hero story, world.
  - `docs/research/BUILD_WORKFLOW_STUDY.md`: Matt Pocock and AI Engineer, kept separate.
  - `docs/research/VISUAL_BUILD_LIST.md`: 12 ranked items.
  - `docs/research/FEASIBILITY.md`.
  - Art bible: new "Rebuild rules" section.
- **Next:** visual rebuild items 1 to 3 (sun rig, lens, wear and gandal bands), each with screenshots and a lab cycle.
