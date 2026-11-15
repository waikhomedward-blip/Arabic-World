# Arabic World — rules for every session

Full spec: `docs/research/CLAUDE_CODE_MASTER_PROMPT.md` (section 0A overrides older text in it). Owner: Edward (not a programmer, reads on phone). Budget: $0.

## Start of every session
1. Read this file, `STATE.md`, and the last entries of `docs/CYCLE_LOG.md`.
2. Continue the next cycle. Never restart from scratch.
3. Before a session ends: finish the step, commit, update `STATE.md`.

## Hard rules (override everything; Suite R checks them every cycle)
1. **No faces.** No eyes, nose or mouth on any character; heads are smooth. No faces in textures, posters, icons, UI art, reports.
2. **Modest dress** for everyone (thobes, loose clothing).
3. **No female characters** anywhere: NPCs, voices, TTS, crowds, names in messages. All-male cast.
4. **No music.** Only Quran recitation and the adhan as melodic audio. Allowed: speech, ambient, plain non-melodic clicks. Unsure → it's music, leave it out.
- Quran text/audio only in `sanctuary` scenes; never cut a verse; never in failure/reward/menu/loading; never on floors.
- Everything mutes during the adhan.
- No depiction of prophets or Companions. No ads. No loot boxes/gacha. No XP, coins, streaks, leaderboards.
- No AI-generated Quran recitation. Never alter Quran text (Tanzil, verbatim, credited).
- No QAC data shipped. No unclear-licence media committed. No secrets committed.
- Release gate: **scholar review** (unchecked).

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
- `npm run lab` — full lab cycle + scoreboard
- `npm run validate` — content validator

## Ask Edward only for
Irreversible public decisions, anything costing money, his accounts/credentials, hard-rule conflicts. One plain sentence, then keep working.
