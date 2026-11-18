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

## Cycle 5 — 2026-11-16 (Edward's new strict rules + review-free core)
**Goal:** apply four of Edward's rules: peaceful and usable by everyone; most of the game needs no scholar review; no female characters (strict); the world only exists 08:00–11:00 (strict). **Effort:** high (hard-rule work).

- **Review-free core:** the three masjid-courtyard scenes became a public square with a drinking fountain ("water is for everyone"); prayer lines replaced by universal ones (the sun, "knowledge is light"). Every line is auto-labelled universal / cultural / sacred; sacred content may only live in optional scenes; `docs/SCHOLAR_REVIEW.md` is regenerated each cycle (80% of text universal, 18 everyday phrases to review, 0 sacred scenes).
- **Universal first:** the one lesson that used "اللّٰهُ أَكْبَرُ" as its example now uses "Faisal is bigger than Majid" and two apples; new checks for lesson examples and religious share (7.8%).
- **No female characters, strict:** Suite R now blocks any word for a female person in Arabic or English anywhere (self-tested with planted cases; a first version over-matched السلام → fixed, lesson recorded).
- **08:00–11:00, strict:** day 7's night scenes rewritten as morning (sky, cloud, bird, air; "water and air are for everyone"); night words retired; every scene has a clock; morning light only; lanterns unlit; HUD clock; "until tomorrow" at 11:00. Suite R `world-time-08-11`.
- **Bug found by the lab:** the typed-answer checker accepted هوء for هَوَاءٌ (dropped long vowel) because two lenient rules interacted; fixed by comparing with and without the final-alif rule; regression tests added.
- **Scores:** overall **95.0** (best ever); R 100%; V 100% (100/100 play-throughs); P 100%; checker 100% of 2,596 slips.
- **Still weak:** 80/150 lemmas; "on the roof" scenes still shown at street level; Muqīm-only slow learners at 1.05 frustration/day (borderline).

## Cycle 6 — 2026-11-16/17 (visual rebuild from the art bible)
**Goal:** Edward: "the game looks very bad visually". Apply the visuals playbook, the story bible's art direction, the cinematic skill and Edward's realism list (ART_BIBLE.md), which had been read but not applied. **Effort:** high.

- **Built:** procedural textures (lime plaster, coral-stone courses, teak grain, lattice, warm paving, striped cloth, contact blob); a seeded Hijazi quarter (3–6 storeys, stone ground floor + plaster, teak timber bands, rawasheen bays with lattice, doors/shopfronts, parapets, water tanks, grime at wall bases, uneven building line) merged into 5 draw calls; minaret landmark; physical sky + image-based light from it + AgX once + soft shadows + warm bounce + haze; low raking morning sun; gentle grade; eye-level camera looking down the lane with parallax drift and view-offset framing for portrait phones; thobe/sleeves/hands/ghutra characters with breathing and head turns; contact shadows; background men at work (also checked by Suite R); stalls, café tables, fountain, foreground posts and crates (orientation-aware).
- **Caught by the play-through and fixed:** foreground post hiding single characters; speakers cut off at the frame edge in 1-, 2- and 3-person scenes; iPad landscape occlusion.
- **Scores:** overall 95.0; R 100%; V 100/100; P 100% (max 78 draw calls, 59–60 fps).
- **Still weak (next):** surfaces still too clean (wear, streaks, wind, clutter); no rooftop set; characters don't walk or gesture yet. 7 full transcript readers paused at the account spend limit.

## Cycle 7 (18 Nov 2026): visual rebuild Stage 1, on branch wip/visual-rebuild
- **Changes:**
  - The sun follows the scene clock: elevation 20° at 08:00 rising to 45° by 11:00, azimuth 10°, so it rakes along the lane instead of sitting behind the camera.
  - Sun colour warms toward 08:00.
  - Hemisphere fill #bfd8ff/#c89a6a at 0.3. Sky light 0.45.
  - Haze thinned from 0.011 to 0.006, and to 0.0045 by 11:00.
  - About 200 dust motes in 1 draw call.
  - Narrower lens: portrait 68° → 54°, landscape 50° → 44°. The camera steps back along the lane.
  - Handheld sway of about 0.15°, turned off when the system asks for reduced motion.
  - Foreground pole moved to the frame edge, after it hid Nabil in the café (caught by the visibility probe).
  - Metal props use metalness 1.
- **Lab:** 100/100 play-throughs, 0 visibility or flow problems. Suite R 100%. Frame rate ≥59 fps, p95 ≤19 ms.
- **Draw calls:** at most 112, up from 72. The longer view down the lane shows more stalls and people. Still under the 150 budget; watch it.
- **Overall score:** 94.7, down from 95.0. The extra failures are learner-simulation retention at 62–63/80 against an 80% bar (64 last cycle). They also fail on main without any visual change, so they are not caused by this stage. The cause is not yet found.
- **Honest look:** shadows and depth are better, and the floor has sun pools. The walls are still evenly lit and clean, and the characters still look like plastic. That is Stages 2–3.

## Cycle 8 (18 Nov 2026): visual Stage 2 (wall wear and lattice light)
- **Changes:**
  - World-space wall shader (`wallShader.ts`) on stone, plaster and teak:
    - grime and damp band at the wall base, 0.1–0.9 m, with an uneven top edge
    - macro colour variation of about ±16–18%
    - weathering streaks
    - gandal timber courses every 1.1 m, showing only where the plaster is worn
    - roughness varying ±0.1
  - Rawasheen lattice now casts patterned sun onto the walls and onto people.
  - The old vertex grime (a smooth gradient over a whole storey) is removed.
- **Lab:** 100/100 play-throughs, 0 problems, Suite R 100%. Overall 95.0, with 2 failures (lemma target, plus one learner check).
- **Learner checks:** the extra learner-retention failures from cycle 7 did not repeat with no learner change, so that check is flaky. Investigate.
- **Performance:** fps ≥59. p95 at most 26 ms in one iPad case (café), 21 ms in one other iPad case, and ≤19 ms everywhere else. Draw calls at most 111.
- **Honest look:** dappled lattice light and dirty wall bases are visible. The plaster is still quite flat, and the characters still look like plastic.
