# Arabic World — rules for every session

Full spec: `docs/research/CLAUDE_CODE_MASTER_PROMPT.md` (section 0A overrides older text in it). Owner: Edward (not a programmer, reads on phone). Budget: $0.

## Start of every session
1. Read this file, `LESSONS.md`, `STATE.md`, and the last entries of `docs/CYCLE_LOG.md`.
2. Continue the next cycle. Never restart from scratch.
3. Before a session ends: finish the step, commit, update `STATE.md`.

## Hard rules (override everything; Suite R checks them every cycle)
1. **No faces.** No eyes, nose or mouth on any character; heads are smooth. No faces in textures, posters, icons, UI art, reports.
2. **Modest dress** for everyone (thobes, loose clothing).
3. **No female characters** anywhere — **strict** (Edward, 16 Nov): no NPCs, voices, TTS, crowds, names, texts, photos or illustrations, and not even a passing mention of a female person in Arabic or English (mother, sister, wife, girl, she…). All-male cast. Suite R `no-female-person-word-*` blocks it.
4. **No music.** Only Quran recitation and the adhan as melodic audio. Allowed: speech, ambient, plain non-melodic clicks. Unsure → it's music, leave it out.
5. **The game world only exists from 08:00 to 11:00 in the morning** — **strict** (Edward, 16 Nov). Every scene has a `clock` in that window; no night, evening or sunset scenes; morning light only. Suite R `world-time-08-11` blocks anything else.
- Quran text/audio only in `sanctuary` scenes; never cut a verse; never in failure/reward/menu/loading; never on floors.
- Everything mutes during the adhan.
- No depiction of prophets or Companions. No ads. No loot boxes/gacha. No XP, coins, streaks, leaderboards.
- No AI-generated Quran recitation. Never alter Quran text (Tanzil, verbatim, credited).
- No QAC data shipped. No unclear-licence media committed. No secrets committed.
- Release gate: **scholar review** (unchecked).

## Review-free core (Edward, 16 Nov)
Most of the game must need **no scholar review**: build on self-evident everyday life (we need water, food and air; there is day and night; the sun is in the sky; people greet neighbours). An imaginary city is fine. Every line is auto-labelled universal / cultural / sacred (`app/src/core/review.ts`). Sacred content (worship, scripture) lives only in optional scenes; ≥80% of text is universal; `docs/SCHOLAR_REVIEW.md` is regenerated every cycle as the complete, short review list.

## Universal first (Edward, 16 Nov 2026 — "very important")
In Edward's words: **"I am a Muslim and I just want the game to be peaceful and usable by everyone."** The game is made with Muslim care and values (the hard rules, respect for the Quran) and is calm, kind and open to every player.
The game must welcome **everyone, Muslim or not**. Build on what every human agrees on: water, food, air, home, family, friends, weather, numbers, work, kindness, hospitality, helping a neighbour.
- **Lessons use universal examples.** Every teaching moment (root noticing, new word, grammar nudge) uses everyday life, never a religious phrase (Suite C `universal-teaching-example`).
- **Religion is part of the city, not the subject.** Characters may speak their faith naturally (as-salāmu ʿalaykum, in shā' Allāh, al-ḥamdu lillāh) as Arabic speakers of all backgrounds do; the masjid is a landmark and a calm place. Keep it a small share of all text (Suite C `universal:religious-share` ≤ 12%; now 7.8%).
- **The player is never required to say or affirm anything religious:** every such prompt has a neutral correct reply (Suite C `neutral-option`).
- **No preaching, no debate, no claims about other faiths.** Explanations are cultural or linguistic facts.
- **Provisional choices (DECISIONS.md, 16 Nov):** a Hijazi port-city old quarter open to everyone (not near the Haram); **a Madinah chapter is kept as a later, optional chapter** (confirmed by Edward, 16 Nov) that a player chooses to enter, never required for progress, with no depiction of Masjid an-Nabawi, prophets or Companions; a traveller hero whose faith is never stated; the Quran meter and station as an optional track.
- The hard rules still apply in full.

## Other languages later
Edward may build this game for other languages. Keep language-specific code (script, normaliser, checker rules, keyboard, direction, morphology, Quran layer) in a language pack; keep engine, ladder, director, lab and world language-neutral.

## Sourcing rule
Prefer Muslim sources; non-Muslim only when no Muslim source covers the point, labelled. Never guess anyone's religion ("affiliation unconfirmed"). Log every source in `docs/SOURCES.md`.

## The cycle (repeat; ≥100 cycles)
1. **TEST** — `npm run lab` runs all suites, writes `lab/results/cycle-NNN/` and `lab/scoreboard.json`.
2. **REVIEW** — compare with previous/best; top 3–5 problems; honest entry in `docs/CYCLE_LOG.md`.
3. **IMPROVE** — small changes; keep only if score improves (or bug fixed) and Suite R = 100%.
4. **RESEARCH** — targeted; sources → `SOURCES.md`, takeaways → `DECISIONS.md`.
5. **COMMIT** + update `STATE.md`.
Every 10 cycles: deep review + `docs/reports/milestone-NN.html` (phone-friendly, ≤2 screens).

## Commands
- `npm run dev` — game in browser (Vite, root `app/`)
- `npm test` — unit tests (Vitest)
- `npm run lab` — full lab cycle: Playwright play-through on 5 devices, then all suites + scoreboard
- `npm run lab:fast` — suites without the browser run (uses the last e2e results)
- `npm run validate` — content validator

## Definition of done (any change)
Checks pass, phone screenshots look right (look at them), committed and pushed, and the report says honestly what was and wasn't verified. When a mistake happens twice: add a test, rule or script, and a line in `LESSONS.md`.

## Ask Edward only for
Irreversible public decisions, anything costing money, his accounts/credentials, hard-rule conflicts. One plain sentence, then keep working.
