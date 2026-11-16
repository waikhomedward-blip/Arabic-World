# Cycle log

## Cycle 1 — 2026-11-16 (foundations)
**Goal:** a repo where nothing that breaks the hard rules can enter, plus a first playable slice.
**Effort:** medium for building; high for Suite R, checker and ladder verification.

- **Built:** CLAUDE.md, docs, content pipeline (tashkeel validator, coverage, Tanzil importer with verbatim checks), scene engine, ladder, director, checker, R3F world, reply UI, lab suites R/C/G/L, scoreboard.
- **Scores:** overall 76.2; R 100%; C 99.6%; G 100% (0 crashes over 192 bot/fuzz runs); checker 100% of 1,125 slip items, zero root-changing accepts; learners median 21/35 retained.
- **Honest review:** the score flatters the build. C passes because content is small; P/S/V are 0 and unbuilt. Only 20% of lemmas reach ~10 encounters.
- **Top problems:** (1) only 3 of 10 days; (2) retention 60% < 80% target; (3) slow learners frustrated in typing-only modes; (4) no audio or voices; (5) no performance data.
- **Fixed during cycle:** camera stood inside a building on phone screens; correct-answer confirmation was skipped; tashkeel rule for the lam of ٱللّٰه.
- **Research:** none needed this cycle.

## Cycle 2 — 2026-11-16 (content: days 4–10)
**Goal:** finish the 10-day arc of the vertical slice. **Effort:** medium to write, high for the validation pass.

- **Built:** 14 new scenes (days 4–10): good morning, bread errand, directions, after the prayer, tea and sugar, Majid small/Faisal big, night sky on the roof, the night souq, counting and paying a dirham, the teacher, the pen, tomorrow / if Allah wills, goodbye. +43 lemmas (35 → 78). Root twists: ق ه و (coffee → café), ك ب ر (big → Allah is the Greatest), ب ع د (after / far), ع ل م (knowledge → teacher), س ل م (peace → goodbye).
- **Scores:** overall 77.7 (+1.5, best ever); R 100%; C 99.9% (only "150 lemmas" fails); G 100% over 4,083 cases; checker 100% of 2,404 slips; learners retain 53/78 (68%, up from 60%); slow-learner frustration now ≤ 1/day in every mode (Muqīm 1.62 → 0.93).
- **Fixed:** souq stall stood between the camera and Saeed; stalls, water cooler and benches moved behind the characters.
- **Still weak:** 78 of 150 lemmas; only 24% of lemmas reach ~10 encounters; day 7 "night" scenes still render at dusk; no voices; P/S/V suites unbuilt.
- **Note:** the in-app preview tool still reads the old session folder's settings; the game was checked by running Vite from the drive on port 5180.
- **Research:** none needed.

## Cycle 3 — 2026-11-16 (morning re-test + night)
**Goal:** spec §9 step 6, "tomorrow, yesterday's new words return for a quick re-test" (sleep consolidation, Dumay & Gaskell 2007). **Effort:** medium build; high for the A/B check.

- **Built:** morning check before each day (up to 6 words: yesterday's first, then any due), 3-option recognition at home "before breakfast". Distractors come from words already met. A wrong pick shows the meaning gently, with no red X; the word comes back soon (ladder demote + short reschedule). Night lighting for night scenes.
- **A/B in the lab:** same 120 learners, with vs without the morning check: median retained **64 vs 54 of 78** (+10 words, 69% → 82%).
- **Scores:** overall **80.0** (+2.3, best ever); R 100%; G 100% (+5 morning-check cases); learners' retained fraction 0.82 (meets the 0.8 target).
- **Still weak:** slow learners in Muqīm-only mode sit at exactly 1.00 frustration/day (borderline fail); 78/150 lemmas; moon/stars not visible from street level (needs a rooftop set); no voices; P/S/V unbuilt.
- **Caveat:** the learner model is a toy; the gain is an estimate, not proof.
- **Research:** none needed (evidence already in the research digest).
