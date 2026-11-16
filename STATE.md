# STATE

**Cycle:** 3 complete (2026-11-16) · **Overall:** 80.0 · **Best ever:** 80.0 (cycle 3) · **Suite R:** 100%

## Release gates
- [ ] Scholar review (release gate)
- [ ] Native-speaker read of every line
- [ ] Licensed adhan recording
- [ ] Commissioned reciter (Quran station stays text-only until then)

## What exists
- Playable web game (`npm run dev`): Hijazi-style street at dusk, faceless all-male cast, 10 in-game days / 20 scenes / 78 lemmas.
- Arabic captions with full tashkeel, tap for English; reply modes Musāfir (tap/act), Ṭālib (tiles, hinted typing), Muqīm (in-game Arabic keyboard).
- Word ladder, Lexical Director (reply type by weakest word), typed-answer checker, on-device progress + export/import, days-in-the-city, word-of-the-day copy, morning check of yesterday's words.
- Lab: Suites R, C, G, L (4,083 cases). S, P, V not built. Scoreboard in `lab/scoreboard.json`.

## Where things are
- Project folder: `/Volumes/EdwardWaikhom/arabic-world` (external drive). GitHub: https://github.com/waikhomedward-blip/Arabic-World (public).
- Tanzil Quran text imported verbatim (`tools/data/quran-uthmani.txt`); lemma-level Quran meter still to build.

## Waiting on Edward
- Missing research files (see `docs/RESEARCH_DIGEST.md`).

## Next actions (cycles 2–10: foundations)
1. Content: add a second scene layer per day (and review scenes) toward ~150 lemmas and ~10 encounters per word.
2. Rooftop set so the night-sky scenes show the moon and stars.
2b. Muqīm-only slow learners: frustration 1.00/day (borderline) → gentler hints in free typing.
3. Suite P: `npx playwright install chromium webkit`, fps/heap/load metrics in iPhone + Pixel profiles.
4. Speech port into `app/speech/` behind a flag (needs Edward's speech-test files) and start Suite S.
5. Suite V: fixed-camera screenshots + rubric; MediaPipe face check on renders.
6. Adhan schedule + mute UI (no audio until licensed).
7. Own morphology/lemma layer over the Tanzil text → lemma staircase + Quran meter.
