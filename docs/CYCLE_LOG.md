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

## Cycle 4 — 2026-11-16 (verification: the agent gets eyes)
**Goal:** see the game the way a player does, automatically (from the agent-workflow talk and the "Building a product with AI agents" playbook). **Effort:** high.

- **Built:** a Playwright play-through of all 20 scenes on 5 devices (iPhone 13, iPhone SE, iPad, Pixel 7, budget Android): visibility probe (is each character seen by the camera, above the UI panel, in frame), off-screen buttons, axe accessibility scan, tap targets and text size, fps / p95 frame time (+4× CPU throttling on Chromium), draw calls. Screenshots per scene (intro, dialogue, prompt, keyboard). Suites V and P now score. LESSONS.md, `tools/author.ts`, `run-cycle` and `verify` skills, PNG home-screen icons, pinch-zoom allowed.
- **Bugs the new checks found and fixed:** (1) Abu Faisal's headscarf left a partial head opening that could read as a face → full enclosure + Suite R rule; (2) third character cut off on narrow phones → centred cast; (3) Arabic keyboard rows overflowed the iPhone SE → shrinkable keys; (4) on the SE a two-line question pushed the ✓ key off screen → compact typing layout; (5) **answer leak:** the right answer was always shown first (54/54) and was the longest 95% of the time → shuffled display + rebalanced distractors + "no" answers (bias checks in Suite C); (6) the game froze on WebGL context loss → calm "tap to continue" recovery.
- **Universal first** (Edward): neutral correct reply added wherever the correct reply was a religious formula; Suite C `neutral-option`.
- **Scores:** overall **94.9** (best ever; V and P now counted). R 100%; P 100% (59–60 fps median on all 5 devices, p95 18–19 ms, ≤41 draw calls, ≤11k triangles); V 99/100 runs clean (the one failure was the test rig under load, re-run alone → pass); 2,540 tap targets between 24 and 44 px (mostly keyboard keys, like the system keyboard).
- **Honest limits:** fps is the M1's GPU, not a phone's; the only real-device numbers will come from HUMAN_CHECKS. Retention estimate dipped 64 → 62/78 (seed noise after content edits; morning-check A/B still +10).
